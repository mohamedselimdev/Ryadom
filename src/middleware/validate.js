import { HttpError } from '../utils/httpError.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s()-]{7,20}$/;

const isEmpty = (v) => v === undefined || v === null || v === '';

// Each rule returns null when the value is valid, or { key, params } describing the error.
export const rules = {
  required: () => (v) => (isEmpty(v) || String(v).trim() === '' ? { key: 'validation.required' } : null),
  string: ({ min = 0, max = 255 } = {}) => (v) => {
    if (isEmpty(v)) return null;
    if (typeof v !== 'string') return { key: 'validation.string' };
    const len = v.trim().length;
    if (len < min) return { key: 'validation.min', params: { min } };
    if (len > max) return { key: 'validation.max', params: { max } };
    return null;
  },
  email: () => (v) => (!isEmpty(v) && !EMAIL_RE.test(String(v)) ? { key: 'validation.email' } : null),
  phone: () => (v) => (!isEmpty(v) && !PHONE_RE.test(String(v)) ? { key: 'validation.phone' } : null),
  oneOf: (values) => (v) => (!isEmpty(v) && !values.includes(v) ? { key: 'validation.oneOf' } : null),
  date: () => (v) => (!isEmpty(v) && Number.isNaN(Date.parse(v)) ? { key: 'validation.date' } : null),
  positiveInt: () => (v) => {
    if (isEmpty(v)) return null;
    return Number.isInteger(Number(v)) && Number(v) > 0 ? null : { key: 'validation.positiveInt' };
  },
  object: () => (v) => (!isEmpty(v) && (typeof v !== 'object' || Array.isArray(v)) ? { key: 'validation.object' } : null),
};

// schema: { field: [rule, ...] }. Unknown fields are dropped from req.body.
export const validateBody = (schema) => (req, res, next) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const errors = {};
  const clean = {};

  for (const [field, fieldRules] of Object.entries(schema)) {
    const value = typeof body[field] === 'string' ? body[field].trim() : body[field];
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = { key: error.key, params: { ...error.params, field } };
        break;
      }
    }
    if (!isEmpty(value)) clean[field] = value;
  }

  if (Object.keys(errors).length) {
    return next(new HttpError(400, 'errors.validation', errors));
  }
  req.body = clean;
  next();
};
