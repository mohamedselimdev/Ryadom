import { auth } from './api.js';
import { getLang, LANGS, setLang, t } from './i18n.js';

function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function initLangSwitch() {
  document.querySelectorAll('[data-lang-switch]').forEach((select) => {
    select.replaceChildren(
      ...LANGS.map(({ code, label }) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = label;
        return option;
      })
    );
    select.value = getLang();
    select.addEventListener('change', () => setLang(select.value));
  });
  document.addEventListener('langchange', () => {
    document.querySelectorAll('[data-lang-switch]').forEach((s) => (s.value = getLang()));
  });
}

export function renderAuthState() {
  const loggedIn = auth.isLoggedIn;
  document.querySelectorAll('[data-auth]').forEach((el) => (el.hidden = !loggedIn));
  document.querySelectorAll('[data-guest]').forEach((el) => (el.hidden = loggedIn));
}

function initLogout() {
  document.querySelectorAll('[data-logout]').forEach((btn) =>
    btn.addEventListener('click', () => {
      auth.clear();
      window.location.href = '/';
    })
  );
}

function markCurrentPage() {
  const path = window.location.pathname.replace(/\.html$/, '');
  document.querySelectorAll('#nav-menu a[href]').forEach((link) => {
    if (link.getAttribute('href') === path) link.setAttribute('aria-current', 'page');
  });
}

function setYear() {
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
}

// Shared form helpers used by the page scripts.
export function showFormMessage(el, text, type = 'error') {
  if (!el) return;
  el.textContent = text;
  el.className = `form-message is-${type}`;
  el.hidden = !text;
}

export function showFieldErrors(form, errors = {}) {
  form.querySelectorAll('[aria-invalid]').forEach((input) => input.removeAttribute('aria-invalid'));
  form.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));

  for (const [name, message] of Object.entries(errors)) {
    const input = form.elements[name];
    const target = input instanceof RadioNodeList ? input[0] : input;
    if (!target) continue;
    if (!(input instanceof RadioNodeList)) target.setAttribute('aria-invalid', 'true');
    const errorEl = target.closest('.field')?.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
  }
}

// busyKey is an i18n key shown while the request runs; the original label key comes from data-i18n.
export function setBusy(button, busy, busyKey) {
  if (!button) return;
  button.disabled = busy;
  button.textContent = busy ? t(busyKey) : t(button.dataset.i18n || '');
}

initNavToggle();
initLangSwitch();
initLogout();
renderAuthState();
markCurrentPage();
setYear();
