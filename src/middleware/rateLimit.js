import rateLimit from 'express-rate-limit';
import { t } from '../i18n/index.js';

const limiter = (windowMs, limit, messageKey) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req, res) => res.status(429).json({ message: t(req.lang, messageKey) }),
  });

export const authLimiter = limiter(15 * 60 * 1000, 20, 'errors.tooManyAttempts');
export const chatLimiter = limiter(60 * 1000, 30, 'errors.tooManyMessages');
