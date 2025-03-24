import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import mongoose from 'mongoose';
import { AuthRequest, AuthRequestHandler } from '../middleware/auth';

// Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
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
export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found for email:', email);
      res.status(401).json({ 
        message: 'User not found. Please register first.',
        code: 'USER_NOT_FOUND'
      });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Invalid password for email:', email);
      res.status(401).json({ 
        message: 'Invalid password',
        code: 'INVALID_PASSWORD'
      });
      return;
    }

    console.log('Login successful for user:', { id: user._id, email: user.email, role: user.role });
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
    console.error('Login error:', error);
    res.status(400).json({ 
      message: 'An error occurred during login',
      code: 'LOGIN_ERROR'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};