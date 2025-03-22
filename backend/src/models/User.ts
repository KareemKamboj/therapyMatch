import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface BaseUser {
  email: string;
  password: string;
  name: string;
  role: 'seeker' | 'helper';
}

interface SeekerPreferences {
  therapyType: string[];
  specialties: string[];
  gender?: string;
  ageRange?: number[];
  languages: string[];
  availability: {
    preferredDays: string[];
    preferredTimes: string[];
    timezone: string;
  };
}

interface HelperProfile {
  title: string;
  bio: string;
  specialties: string[];
  therapyTypes: string[];
  languages: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  certifications: {
    name: string;
    issuingBody: string;
    year: number;
  }[];
  experience: number; // years of experience
  availability: {
    availableDays: string[];
    availableTimes: string[];
    timezone: string;
  };
  hourlyRate: number;
  isVerified: boolean;
}

export interface IUser extends Document, BaseUser {
  helperProfile?: HelperProfile;
  seekerPreferences?: SeekerPreferences;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['seeker', 'helper'],
  },
  helperProfile: {
    title: String,
    bio: String,
    specialties: [String],
    therapyTypes: [String],
    languages: [String],
    education: [{
      degree: String,
      institution: String,
      year: Number,
    }],
    certifications: [{
      name: String,
      issuingBody: String,
      year: Number,
    }],
    experience: Number,
    availability: {
      availableDays: [String],
      availableTimes: [String],
      timezone: String,
    },
    hourlyRate: Number,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  seekerPreferences: {
    therapyType: [String],
    specialties: [String],
    gender: String,
    ageRange: [Number],
    languages: [String],
    availability: {
      preferredDays: [String],
      preferredTimes: [String],
      timezone: String,
    },
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 