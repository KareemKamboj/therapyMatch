import express from 'express';
import { register, login, getMe } from '../controllers/auth';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes - ensure protect middleware is applied first
router.get('/me', protect, getMe);

export default router; 