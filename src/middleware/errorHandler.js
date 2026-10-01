import { config } from '../config/env.js';
import { t } from '../i18n/index.js';

export const notFound = (req, res) => {
  res.status(404).json({ message: t(req.lang, 'errors.notFound') });
};

function translateDetails(lang, details) {
  if (!details) return undefined;
  return Object.fromEntries(Object.entries(details).map(([field, d]) => [field, t(lang, d.key, d.params)]));
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const lang = req.lang;

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: t(lang, 'errors.invalidJson') });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: t(lang, 'errors.conflict') });
  }
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ message: t(lang, 'errors.validation') });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 || !err.key ? t(lang, 'errors.internal') : t(lang, err.key),
    ...(err.details && { errors: translateDetails(lang, err.details) }),
    ...(status >= 500 && !config.isProduction && { debug: err.message }),
  });
};
