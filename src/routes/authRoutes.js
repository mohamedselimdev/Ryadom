import express from 'express';
import { register, login, me, forgotPassword } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { validateBody, rules as r } from '../middleware/validate.js';
import { asyncHandler } from '../utils/httpError.js';

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  validateBody({
    name: [r.required(), r.string({ min: 2, max: 100 })],
    email: [r.required(), r.string({ max: 254 }), r.email()],
    phone: [r.string({ max: 20 }), r.phone()],
    gender: [r.oneOf(['male', 'female'])],
    birthDate: [r.date()],
    password: [r.required(), r.string({ min: 8, max: 128 })],
  }),
  asyncHandler(register)
);

router.post(
  '/login',
  authLimiter,
  validateBody({
    email: [r.required(), r.string({ max: 254 })],
    password: [r.required(), r.string({ max: 128 })],
  }),
  asyncHandler(login)
);

router.post(
  '/forgot-password',
  authLimiter,
  validateBody({ email: [r.required(), r.string({ max: 254 }), r.email()] }),
  asyncHandler(forgotPassword)
);

router.get('/me', requireAuth, asyncHandler(me));

export default router;
