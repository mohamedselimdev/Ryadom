import { localized, t, yearsLabel } from './i18n.js';

// DOM builder: el('div', { class: 'x' }, child1, 'text'). Text is always set via textContent, never innerHTML.
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

export function doctorCard(p, { onBook } = {}) {
  const name = localized(p, 'name');
  const schedule = localized(p, 'schedule');
  return el(
    'article',
    { class: 'doctor-card' },
    el('img', { src: p.photo || 'images/placeholder.jpg', alt: name, loading: 'lazy', width: 110, height: 110 }),
    el('h3', {}, name),
    el('p', { class: 'doctor-spec' }, localized(p, 'specialization')),
    el('p', { class: 'doctor-meta' }, t('doctor.experience', { years: yearsLabel(p.experienceYears) })),
    schedule && el('p', { class: 'doctor-meta' }, schedule),
    onBook
      ? el('button', { type: 'button', class: 'btn btn-primary btn-sm', onclick: () => onBook(p) }, t('doctor.book'))
      : el('a', { class: 'btn btn-primary btn-sm', href: `/booking?psychologist=${encodeURIComponent(p.id)}` }, t('doctor.book'))
  );
}

export const emptyState = (text) => el('p', { class: 'empty-state' }, text);
