import express from 'express';
import { sendMessage } from '../controllers/chatController.js';
import { chatLimiter } from '../middleware/rateLimit.js';
import { validateBody, rules as r } from '../middleware/validate.js';
import { asyncHandler } from '../utils/httpError.js';

const router = express.Router();

router.post(
  '/',
  chatLimiter,
  validateBody({ message: [r.required(), r.string({ max: 1000 })] }),
  asyncHandler(sendMessage)
);

export default router;
