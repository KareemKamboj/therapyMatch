import express, { Request, Response } from 'express';
import { protect } from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';
import { User } from '../models/User';
import { validate } from '../middleware/validate';
import { findMatches } from '../services/matching';
import { query } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

// Apply middleware to all routes
router.all('*', protect, requireRole('seeker'));

interface TypedRequest extends Request {
  user: {
    _id: mongoose.Types.ObjectId;
    role: string;
    seekerPreferences?: {
      therapyType: string[];
      specialties: string[];
      languages: string[];
      availability: {
        preferredDays: string[];
        preferredTimes: string[];
        timezone: string;
      };
    };
  };
}

interface QueryParams {
  limit?: string;
}

// Get seeker preferences
router.get('/preferences', (req: Request, res: Response) => {
  res.json(req.user.seekerPreferences);
});

// Update seeker preferences
router.put('/preferences', async (req: Request, res: Response) => {
  const { therapyType, specialties, gender, ageRange, languages, availability } = req.body;
  
  try {
    const user = req.user;
    if (!user.seekerPreferences) {
      user.seekerPreferences = {
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
    Object.assign(user.seekerPreferences, {
      therapyType,
      specialties,
      gender,
      ageRange,
      languages,
      availability,
    });

    // Save the updated user
    await user.save();
    res.json(user.seekerPreferences);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Controller functions
const getMatches = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const matches = await findMatches(req.user._id, limit);
    res.json(matches);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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