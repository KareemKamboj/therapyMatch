import express, { RequestHandler } from 'express';
import { protect } from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// Apply middleware
router.all('*', protect, requireRole('helper'));

// Helper-specific routes will go here
router.get('/profile', (req: AuthRequest, res) => {
  if (!req.user?.helperProfile) {
    res.status(404).json({ message: 'Profile not found' });
    return;
  }
  res.json(req.user.helperProfile);
});

// Update helper profile
router.put('/profile', async (req: AuthRequest, res) => {
  const { title, bio, specialties, therapyTypes, languages, education, certifications, experience, availability, hourlyRate } = req.body;
  
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    if (!req.user.helperProfile) {
      req.user.helperProfile = {
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
    Object.assign(req.user.helperProfile, {
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
    await req.user.save();
    res.json(req.user.helperProfile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get pending matches
router.get('/pending-matches', async (req: AuthRequest, res) => {
  try {
    if (!req.user?.helperProfile) {
      res.status(400).json({ message: 'Please complete your profile first' });
      return;
    }

    // Find seekers that match the helper's expertise
    const matches = await User.find({
      role: 'seeker',
      'seekerPreferences.therapyType': { $in: req.user.helperProfile.therapyTypes },
      'seekerPreferences.specialties': { $in: req.user.helperProfile.specialties },
      'seekerPreferences.languages': { $in: req.user.helperProfile.languages },
    }).select('-password');

    res.json(matches);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 