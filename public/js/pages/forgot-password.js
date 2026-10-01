import { showFieldErrors, showFormMessage, setBusy } from '../layout.js';
import { api } from '../api.js';

const form = document.getElementById('forgot-form');
const message = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showFieldErrors(form);
  const button = form.querySelector('button[type="submit"]');
  setBusy(button, true, 'forgot.submitting');

  try {
    const data = await api('/auth/forgot-password', { method: 'POST', body: { email: form.elements.email.value } });
    showFormMessage(message, data.message, 'success');
    form.reset();
  } catch (err) {
    showFieldErrors(form, err.errors);
    showFormMessage(message, err.message);
  } finally {
    setBusy(button, false);
  }
});
