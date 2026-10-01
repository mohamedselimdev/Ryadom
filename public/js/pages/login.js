import { showFieldErrors, showFormMessage, setBusy } from '../layout.js';
import { api, auth } from '../api.js';

const form = document.getElementById('login-form');
const message = document.getElementById('form-message');

if (auth.isLoggedIn) window.location.replace('/booking');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showFormMessage(message, '');
  showFieldErrors(form);
  const button = form.querySelector('button[type="submit"]');
  setBusy(button, true, 'login.submitting');

  try {
    const data = await api('/auth/login', {
      method: 'POST',
      body: { email: form.elements.email.value, password: form.elements.password.value },
    });
    auth.save(data);
    const next = new URLSearchParams(window.location.search).get('next');
    // Only allow same-site relative redirects.
    window.location.href = next && next.startsWith('/') && !next.startsWith('//') ? next : '/booking';
  } catch (err) {
    showFieldErrors(form, err.errors);
    showFormMessage(message, err.message);
    setBusy(button, false);
  }
});
