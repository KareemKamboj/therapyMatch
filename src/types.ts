export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    specialties: string[];
    gender?: 'only_male' | 'mostly_male' | 'only_female' | 'mostly_female' | 'not_applicable' | 'other';
    otherGender?: string;
    ageRange: [number, number];
    languages: string[];
    therapyType: string[];
    otherTherapyType?: string;
    region?: string;
    role?: 'seeking_help' | 'providing_help';
    currentIssues?: string[];
    otherTopic?: string;
    availability?: {
      preferredDays: string[];
      preferredTimes: string[];
      timezone: string;
    };
  };
  matches: string[];
} 