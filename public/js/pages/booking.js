import { renderAuthState, showFieldErrors, showFormMessage, setBusy } from '../layout.js';
import { api, auth } from '../api.js';
import { getLocale, localized, t } from '../i18n.js';
import { doctorCard, el, emptyState } from '../components.js';

const grid = document.getElementById('doctors-grid');
const dialog = document.getElementById('booking-dialog');
const form = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');
const sessionsBox = document.getElementById('sessions-list');
const pageMessage = document.getElementById('page-message');

const state = { psychologists: null, doctorsError: null, sessions: null, sessionsError: null, selected: null };

function toLocalInputValue(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function renderSelectedDoctor() {
  if (!state.selected) return;
  document.getElementById('booking-doctor').textContent =
    `${localized(state.selected, 'name')} — ${localized(state.selected, 'specialization')}`;
}

function openBooking(psychologist) {
  if (!auth.isLoggedIn) {
    const next = `/booking?psychologist=${psychologist.id}`;
    window.location.href = `/login?next=${encodeURIComponent(next)}`;
    return;
  }
  state.selected = psychologist;
  form.reset();
  showFieldErrors(form);
  showFormMessage(formMessage, '');
  form.elements.psychologistId.value = psychologist.id;
  renderSelectedDoctor();

  const min = new Date(Date.now() + 60 * 60 * 1000);
  min.setMinutes(0, 0, 0);
  form.elements.startsAt.min = toLocalInputValue(min);
  dialog.showModal();
}

function renderDoctors() {
  if (state.doctorsError) grid.replaceChildren(emptyState(t('specialists.loadError', { error: state.doctorsError.message })));
  else if (!state.psychologists) grid.replaceChildren(emptyState(t('specialists.loading')));
  else if (!state.psychologists.length) grid.replaceChildren(emptyState(t('specialists.empty')));
  else grid.replaceChildren(...state.psychologists.map((p) => doctorCard(p, { onBook: openBooking })));
}

async function loadDoctors() {
  renderDoctors();
  try {
    state.psychologists = (await api('/psychologists')).psychologists;
    const requested = Number(new URLSearchParams(window.location.search).get('psychologist'));
    const match = state.psychologists.find((p) => p.id === requested);
    if (match) openBooking(match);
  } catch (err) {
    state.doctorsError = err;
  }
  renderDoctors();
}

function sessionItem(s) {
  const active = s.status === 'pending' || s.status === 'confirmed';
  const when = new Intl.DateTimeFormat(getLocale(), { dateStyle: 'long', timeStyle: 'short' }).format(new Date(s.startsAt));
  return el(
    'div',
    { class: 'session-item' },
    el(
      'div',
      {},
      el('strong', {}, s.Psychologist ? localized(s.Psychologist, 'name') : t('nav.specialists')),
      el('span', {}, `${when} · ${t(`format.${s.format}`)}`)
    ),
    el(
      'div',
      { class: 'session-actions' },
      el('span', { class: `status status-${s.status}` }, t(`status.${s.status}`)),
      active &&
        el(
          'button',
          { type: 'button', class: 'btn btn-danger btn-sm', 'data-i18n': 'booking.cancel', onclick: (e) => cancelSession(s.id, e.currentTarget) },
          t('booking.cancel')
        )
    )
  );
}

function renderSessions() {
  if (!auth.isLoggedIn) return;
  if (state.sessionsError) sessionsBox.replaceChildren(emptyState(t('booking.loadError', { error: state.sessionsError.message })));
  else if (!state.sessions) sessionsBox.replaceChildren(emptyState(t('specialists.loading')));
  else if (!state.sessions.length) sessionsBox.replaceChildren(emptyState(t('booking.empty')));
  else sessionsBox.replaceChildren(...state.sessions.map(sessionItem));
}

async function loadSessions() {
  if (!auth.isLoggedIn) return;
  try {
    state.sessions = (await api('/sessions')).sessions;
    state.sessionsError = null;
  } catch (err) {
    if (err.status === 401) {
      renderAuthState();
      return;
    }
    state.sessionsError = err;
  }
  renderSessions();
}

async function cancelSession(id, button) {
  if (!window.confirm(t('booking.cancelConfirm'))) return;
  setBusy(button, true, 'booking.cancelling');
  try {
    await api(`/sessions/${id}/cancel`, { method: 'PATCH' });
    await loadSessions();
  } catch (err) {
    showFormMessage(pageMessage, err.message);
    setBusy(button, false);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showFieldErrors(form);
  showFormMessage(formMessage, '');

  const f = form.elements;
  const startsAt = f.startsAt.value ? new Date(f.startsAt.value) : null;
  if (!startsAt || Number.isNaN(startsAt.getTime())) {
    showFieldErrors(form, { startsAt: t('booking.startsAtRequired') });
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  setBusy(button, true, 'booking.submitting');
  try {
    await api('/sessions', {
      method: 'POST',
      body: {
        psychologistId: Number(f.psychologistId.value),
        startsAt: startsAt.toISOString(),
        format: f.format.value,
        note: f.note.value,
      },
    });
    dialog.close();
    showFormMessage(pageMessage, t('booking.created'), 'success');
    history.replaceState(null, '', '/booking');
    await loadSessions();
    document.getElementById('my-sessions').scrollIntoView();
  } catch (err) {
    if (err.status === 401) {
      dialog.close();
      window.location.href = '/login?next=%2Fbooking';
      return;
    }
    showFieldErrors(form, err.errors);
    showFormMessage(formMessage, err.message);
  } finally {
    setBusy(button, false);
  }
});

document.querySelectorAll('[data-close-dialog]').forEach((btn) => btn.addEventListener('click', () => dialog.close()));
document.addEventListener('langchange', () => {
  renderDoctors();
  renderSessions();
  renderSelectedDoctor();
});

loadDoctors();
renderSessions();
loadSessions();
