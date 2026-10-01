import express from 'express';
import { listPsychologists, getPsychologist, createPsychologist } from '../controllers/psychologistController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody, rules as r } from '../middleware/validate.js';
import { asyncHandler } from '../utils/httpError.js';

const router = express.Router();

router.get('/', asyncHandler(listPsychologists));
router.get('/:id', asyncHandler(getPsychologist));

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  validateBody({
    name: [r.required(), r.string({ min: 2, max: 100 })],
    specialization: [r.required(), r.string({ max: 100 })],
    experienceYears: [r.positiveInt()],
    schedule: [r.string({ max: 100 })],
    photo: [r.string({ max: 255 })],
    bio: [r.string({ max: 2000 })],
    translations: [r.object()],
  }),
  asyncHandler(createPsychologist)
);

export default router;
