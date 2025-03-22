import express, { Request, Response } from 'express';
import { protect } from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';
import { User } from '../models/User';

const router = express.Router();

// Apply middleware
router.all('*', protect, requireRole('helper'));

// Helper-specific routes will go here
router.get('/profile', (req: Request, res: Response) => {
  res.json(req.user.helperProfile);
});

// Update helper profile
router.put('/profile', async (req: Request, res: Response) => {
  const { title, bio, specialties, therapyTypes, languages, education, certifications, experience, availability, hourlyRate } = req.body;
  
  try {
    const user = req.user;
    if (!user.helperProfile) {
      user.helperProfile = {
        title: '',
        bio: '',
        specialties: [],
        therapyTypes: [],
        languages: [],
        education: [],
        certifications: [],
        experience: 0,
        availability: {
          availableDays: [],
          availableTimes: [],
          timezone: '',
        },
        hourlyRate: 0,
        isVerified: false,
      };
    }

    // Update the helper profile
    Object.assign(user.helperProfile, {
      title,
      bio,
      specialties,
      therapyTypes,
      languages,
      education,
      certifications,
      experience,
      availability,
      hourlyRate,
    });

    // Save the updated user
    await user.save();
    res.json(user.helperProfile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get pending matches
router.get('/pending-matches', async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user.helperProfile) {
      return res.status(400).json({ message: 'Please complete your profile first' });
    }

    // Find seekers that match the helper's expertise
    const matches = await User.find({
      role: 'seeker',
      'seekerPreferences.therapyType': { $in: user.helperProfile.therapyTypes },
      'seekerPreferences.specialties': { $in: user.helperProfile.specialties },
      'seekerPreferences.languages': { $in: user.helperProfile.languages },
    }).select('-password');

    res.json(matches);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 