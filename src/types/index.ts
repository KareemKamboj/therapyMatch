export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    specialties: string[];
    gender?: 'male' | 'female' | 'other';
    ageRange: [number, number];
    languages: string[];
    therapyType: string[];
  };
  matches: string[];
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
  avatar: string;
  specialties: string[];
  gender: 'male' | 'female' | 'other';
  age: number;
  languages: string[];
  therapyTypes: string[];
  education: string[];
  experience: number;
  bio: string;
  availability: TimeSlot[];
  rating: number;
  reviews: Review[];
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
  userId: string;
  therapistId: string;
  timeSlot: TimeSlot;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}