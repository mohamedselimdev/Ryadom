import express from 'express';
import { bookSession, listMySessions, cancelSession } from '../controllers/sessionController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody, rules as r } from '../middleware/validate.js';
import { asyncHandler } from '../utils/httpError.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', asyncHandler(listMySessions));

router.post(
  '/',
  validateBody({
    psychologistId: [r.required(), r.positiveInt()],
    startsAt: [r.required(), r.date()],
    format: [r.oneOf(['video', 'audio', 'chat'])],
    note: [r.string({ max: 500 })],
  }),
  asyncHandler(bookSession)
);

router.patch('/:id/cancel', asyncHandler(cancelSession));

export default router;
