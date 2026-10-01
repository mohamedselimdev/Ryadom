import { showFormMessage } from '../layout.js';
import { t } from '../i18n.js';

const PLANS = ['safety', 'hope', 'satisfaction'];

const form = document.getElementById('payment-form');
const message = document.getElementById('form-message');
const planSelect = form.elements.plan;
const summary = document.getElementById('plan-summary');

const requested = new URLSearchParams(window.location.search).get('plan');
const initialPlan = PLANS.includes(requested) ? requested : 'hope';
planSelect.value = initialPlan;

const renderSummary = () => {
  const plan = planSelect.value;
  summary.textContent = `${t(`plans.${plan}.price`)} — ${t(`plans.${plan}.period`)}`;
};
planSelect.addEventListener('change', renderSummary);
document.addEventListener('langchange', renderSummary);
renderSummary();

form.elements.cardNumber.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 19);
  e.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
});

form.elements.expiry.addEventListener('input', (e) => {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
  e.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
});

form.elements.cvv.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// Demo checkout: card data never leaves the browser and is cleared right away.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
  planSelect.value = initialPlan;
  renderSummary();
  showFormMessage(message, t('payment.done'), 'success');
});
