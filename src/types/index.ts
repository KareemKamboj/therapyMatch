/**
 * @fileoverview Type definitions for the TherapyMatch application
 */

export type UserRole = 'seeker' | 'helper' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferences?: UserPreferences;
  matches?: Therapist[];
}

export interface UserPreferences {
  specialties: string[];
  gender: 'male' | 'female' | 'any' | 'not_applicable';
  ageRange: [number, number];
  languages: string[];
  therapyType: string[];
  region: string;
  currentIssues: string[];
  otherTopic?: string;
  availability: {
    preferredDays: string[];
    preferredTimes: string[];
    timezone: string;
  };
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialties: string[];
  languages: string[];
  therapyTypes: string[];
  gender: 'male' | 'female' | 'other';
  age: number;
  rating: number;
  experience: number;
  education: string[];
  certifications: string[];
  hourlyRate: number;
  availability: {
    availableDays: string[];
    availableTimes: string[];
    timezone: string;
  };
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Appointment {
  id: string;
  therapistId: string;
  seekerId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}