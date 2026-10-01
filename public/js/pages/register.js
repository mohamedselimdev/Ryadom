import { showFieldErrors, showFormMessage, setBusy } from '../layout.js';
import { api, auth } from '../api.js';
import { t } from '../i18n.js';

const form = document.getElementById('register-form');
const message = document.getElementById('form-message');

form.elements.birthDate.max = new Date().toISOString().slice(0, 10);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showFormMessage(message, '');
  const f = form.elements;

  if (f.password.value !== f.confirmPassword.value) {
    showFieldErrors(form, { confirmPassword: t('register.mismatch') });
    return;
  }
  showFieldErrors(form);

  const button = form.querySelector('button[type="submit"]');
  setBusy(button, true, 'register.submitting');

  try {
    const data = await api('/auth/register', {
      method: 'POST',
      body: {
        name: f.name.value,
        email: f.email.value,
        phone: f.phone.value,
        gender: f.gender.value,
        birthDate: f.birthDate.value,
        password: f.password.value,
      },
    });
    auth.save(data);
    window.location.href = '/booking';
  } catch (err) {
    showFieldErrors(form, err.errors);
    showFormMessage(message, err.message);
    setBusy(button, false);
  }
});
