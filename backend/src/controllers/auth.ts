import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import mongoose from 'mongoose';

// Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with role-specific fields
    const userData: Partial<IUser> = {
      email,
      password,
      name,
      role,
    };

    // Add role-specific empty structures
    if (role === 'helper') {
      userData.helperProfile = {
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
    } else {
      userData.seekerPreferences = {
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

    const user = await User.create(userData);

    if (user) {
      const userId = user._id as mongoose.Types.ObjectId;
      res.status(201).json({
        _id: userId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        ...(user.role === 'helper' ? { helperProfile: user.helperProfile } : { seekerPreferences: user.seekerPreferences }),
        token: generateToken(userId.toString()),
      });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user._id as mongoose.Types.ObjectId;
    res.json({
      _id: userId.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.role === 'helper' ? { helperProfile: user.helperProfile } : { seekerPreferences: user.seekerPreferences }),
      token: generateToken(userId.toString()),
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 