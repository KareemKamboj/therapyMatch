/**
 * @fileoverview Centralized type definitions for the TherapyMatch API
 * Contains interfaces and types used across the application
 */

import { Request } from 'express';
import mongoose from 'mongoose';

/**
 * Available user roles in the system
 */
export type UserRole = 'seeker' | 'helper' | 'admin';

/**
 * Available therapy types offered by helpers
 */
export type TherapyType = 
  | 'cognitive-behavioral'
  | 'psychodynamic'
  | 'humanistic'
  | 'integrative'
  | 'group'
  | 'couples'
  | 'family';

/**
 * Days of the week for availability scheduling
 */
export type DayOfWeek = 
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

/**
 * Time slots for availability scheduling
 */
export type TimeSlot = 
  | 'morning'
  | 'afternoon'
  | 'evening';

/**
 * Interface for user availability preferences
 */
export interface Availability {
  availableDays: DayOfWeek[];
  availableTimes: TimeSlot[];
}

/**
 * Interface for seeker preferences
 */
export interface SeekerPreferences {
  languages: string[];
  therapyType: TherapyType[];
  specialties: string[];
  availability: {
    preferredDays: DayOfWeek[];
    preferredTimes: TimeSlot[];
  };
  maxPrice?: number;
  preferredGender?: 'male' | 'female' | 'any';
}

/**
 * Interface for helper profile
 */
export interface HelperProfile {
  languages: string[];
  therapyTypes: TherapyType[];
  specialties: string[];
  availability: Availability;
  education: string[];
  certifications: string[];
  experience: number;
  hourlyRate: number;
  isVerified: boolean;
  rating?: number;
  totalSessions?: number;
}

/**
 * Extended Express Request interface with authenticated user
 */
export interface AuthRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
    email: string;
    role: UserRole;
  };
}

/**
 * Interface for match results
 */
export interface MatchResult {
  helper: mongoose.Types.ObjectId;
  score: number;
  matchedCriteria: {
    languages: number;
    therapyTypes: number;
    specialties: number;
    availability: number;
  };
}

/**
 * Interface for API error responses
 */
export interface ApiError {
  message: string;
  errors?: string[];
  stack?: string;
}

/**
 * Interface for pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Interface for search/filter parameters
 */
export interface SearchParams {
  query?: string;
  therapyTypes?: TherapyType[];
  specialties?: string[];
  languages?: string[];
  maxPrice?: number;
  availability?: {
    days?: DayOfWeek[];
    times?: TimeSlot[];
  };
  rating?: number;
} 