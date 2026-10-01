import { messages } from './messages.js';

export const SUPPORTED_LANGS = ['ru', 'en', 'ar'];
export const DEFAULT_LANG = 'ru';

// Explicit X-Lang header from the frontend wins; otherwise use the first supported Accept-Language entry.
export function resolveLang(req) {
  const explicit = String(req.get('X-Lang') || '').toLowerCase();
  if (SUPPORTED_LANGS.includes(explicit)) return explicit;

  const accepted = String(req.get('Accept-Language') || '')
    .split(',')
    .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase());
  return accepted.find((l) => SUPPORTED_LANGS.includes(l)) || DEFAULT_LANG;
}

export function t(lang, key, params = {}) {
  const template = messages[lang]?.[key] ?? messages[DEFAULT_LANG][key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => {
    const value = params[name];
    if (value === undefined) return `{${name}}`;
    return name === 'field' ? t(lang, `fields.${value}`) : String(value);
  });
}

export const langMiddleware = (req, res, next) => {
  req.lang = resolveLang(req);
  res.set('Content-Language', req.lang);
  next();
};
