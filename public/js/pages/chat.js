import '../layout.js';
import { api } from '../api.js';
import { t } from '../i18n.js';
import { el } from '../components.js';

const messages = document.getElementById('chat-messages');
const form = document.getElementById('chat-form');
const input = form.elements.message;
const sendButton = form.querySelector('button[type="submit"]');

function addMessage(text, sender, extraClass = '') {
  const node = el(
    'div',
    { class: `message ${sender} ${extraClass}`.trim() },
    sender === 'bot' && el('img', { src: 'images/icon.png', alt: '' }),
    el('p', { dir: 'auto' }, text)
  );
  messages.append(node);
  messages.scrollTop = messages.scrollHeight;
  return node;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';
  sendButton.disabled = true;
  const typing = addMessage(t('chat.typing'), 'bot', 'is-typing');

  try {
    const { reply } = await api('/chat', { method: 'POST', body: { message: text } });
    typing.remove();
    addMessage(reply, 'bot');
  } catch (err) {
    typing.remove();
    addMessage(t('chat.error', { error: err.message }), 'bot');
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
});
