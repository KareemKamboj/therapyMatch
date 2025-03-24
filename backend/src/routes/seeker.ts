import express, { RequestHandler } from 'express';
import { protect } from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';
import { User } from '../models/User';
import { validate } from '../middleware/validate';
import { findMatches } from '../services/matching';
import { query } from 'express-validator';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Apply middleware to all routes
router.all('*', protect, requireRole('seeker'));

// Get seeker preferences
router.get('/preferences', (req: AuthRequest, res) => {
  if (!req.user?.seekerPreferences) {
    res.status(404).json({ message: 'Preferences not found' });
    return;
  }
  res.json(req.user.seekerPreferences);
});

// Update seeker preferences
router.put('/preferences', async (req: AuthRequest, res) => {
  const { therapyType, specialties, gender, ageRange, languages, availability } = req.body;
  
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    if (!req.user.seekerPreferences) {
      req.user.seekerPreferences = {
        therapyType: [],
        specialties: [],
        languages: [],
        availability: {
          preferredDays: [],
          preferredTimes: [],
          timezone: '',
        },
      };
    }

    // Update the seeker preferences
    Object.assign(req.user.seekerPreferences, {
      therapyType,
      specialties,
      gender,
      ageRange,
      languages,
      availability,
    });

    // Save the updated user
    await req.user.save();
    res.json(req.user.seekerPreferences);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Controller functions
const getMatches: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const matches = await findMatches(req.user._id, limit);
    res.json(matches);
  } catch (error: any) {
    next(error);
  }
};

// Routes
router.get('/matches',
  validate([
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .toInt()
      .withMessage('Limit must be between 1 and 50'),
  ]),
  getMatches
);

export default router; 