import express from 'express';
import { langMiddleware } from '../i18n/index.js';
import authRoutes from './authRoutes.js';
import psychologistRoutes from './psychologistRoutes.js';
import sessionRoutes from './sessionRoutes.js';
import chatRoutes from './chatRoutes.js';

const router = express.Router();

router.use(langMiddleware);
router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/psychologists', psychologistRoutes);
router.use('/sessions', sessionRoutes);
router.use('/chat', chatRoutes);

export default router;
