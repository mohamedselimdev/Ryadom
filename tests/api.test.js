import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.DB_DIALECT = 'sqlite';
process.env.DB_STORAGE = ':memory:';
process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-the-config-check';

const { sequelize, Psychologist } = await import('../src/models/index.js');
const { createApp } = await import('../src/app.js');

let server;
let base;

before(async () => {
  await sequelize.sync({ force: true });
  await Psychologist.create({
    name: 'Тест Тестов',
    specialization: 'Психолог',
    experienceYears: 5,
    translations: { en: { name: 'Test Testov' } },
  });
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api`;
});

after(async () => {
  server.close();
  await sequelize.close();
});

const call = async (path, { method = 'GET', body, token, lang } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (lang) headers['X-Lang'] = lang;
  const res = await fetch(base + path, { method, headers, body: body && JSON.stringify(body) });
  return { status: res.status, body: await res.json() };
};

const user = { name: 'Ivan', email: 'Ivan@Example.com', password: 'strongpass1' };
let token;

test('register hashes password and never returns it', async () => {
  const res = await call('/auth/register', { method: 'POST', body: user });
  assert.equal(res.status, 201);
  assert.ok(res.body.token);
  assert.equal(res.body.user.email, 'ivan@example.com');
  assert.equal(res.body.user.password, undefined);
  token = res.body.token;
});

test('duplicate email is rejected', async () => {
  const res = await call('/auth/register', { method: 'POST', body: user });
  assert.equal(res.status, 409);
});

test('validation errors are translated', async () => {
  const en = await call('/auth/register', { method: 'POST', body: { email: 'bad' }, lang: 'en' });
  assert.equal(en.status, 400);
  assert.equal(en.body.errors.email, 'Email: invalid format');
  const ar = await call('/auth/register', { method: 'POST', body: { email: 'bad' }, lang: 'ar' });
  assert.equal(ar.body.message, 'يرجى التحقق من البيانات المدخلة');
});

test('login works with correct password only', async () => {
  const ok = await call('/auth/login', { method: 'POST', body: { email: user.email, password: user.password } });
  assert.equal(ok.status, 200);
  const bad = await call('/auth/login', { method: 'POST', body: { email: user.email, password: 'wrong-pass' } });
  assert.equal(bad.status, 401);
});

test('sessions require auth', async () => {
  const res = await call('/sessions');
  assert.equal(res.status, 401);
});

test('booking: create, list, clash, cancel', async () => {
  const startsAt = new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString();
  const created = await call('/sessions', { method: 'POST', token, body: { psychologistId: 1, startsAt, format: 'video' } });
  assert.equal(created.status, 201);

  const clash = await call('/sessions', { method: 'POST', token, body: { psychologistId: 1, startsAt } });
  assert.equal(clash.status, 409);

  const past = await call('/sessions', { method: 'POST', token, body: { psychologistId: 1, startsAt: '2020-01-01T10:00:00Z' } });
  assert.equal(past.status, 400);

  const list = await call('/sessions', { token });
  assert.equal(list.body.sessions.length, 1);
  assert.equal(list.body.sessions[0].Psychologist.translations.en.name, 'Test Testov');

  const cancelled = await call(`/sessions/${created.body.session.id}/cancel`, { method: 'PATCH', token });
  assert.equal(cancelled.body.session.status, 'cancelled');
});

test('non-admin cannot create psychologists', async () => {
  const res = await call('/psychologists', { method: 'POST', token, body: { name: 'X Y', specialization: 'Z' } });
  assert.equal(res.status, 403);
});

test('chat replies in the requested language and handles crisis messages', async () => {
  const en = await call('/chat', { method: 'POST', body: { message: 'I feel so lonely' }, lang: 'en' });
  assert.match(en.body.reply, /Loneliness/);
  const ar = await call('/chat', { method: 'POST', body: { message: 'أنا قلق جدا' }, lang: 'ar' });
  assert.match(ar.body.reply, /القلق/);
  const crisis = await call('/chat', { method: 'POST', body: { message: 'не хочу жить' }, lang: 'ru' });
  assert.match(crisis.body.reply, /8-800-2000-122/);
});
