import { create } from 'zustand';
import type { User, Therapist, Appointment, Message } from '../types';

interface Store {
  user: User | null;
  therapists: Therapist[];
  appointments: Appointment[];
  messages: Message[];
  setUser: (user: User | null) => void;
  addAppointment: (appointment: Appointment) => void;
  addMessage: (message: Message) => void;
  getMatches: () => Therapist[];
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  therapists: [],
  appointments: [],
  messages: [],
  
  setUser: (user) => set({ user }),
  
  addAppointment: (appointment) => 
    set((state) => ({ 
      appointments: [...state.appointments, appointment] 
    })),
  
  addMessage: (message) =>
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
  
  getMatches: () => {
    const { user, therapists } = get();
    if (!user) return [];
    
    return therapists.filter(therapist => {
      const specialtyMatch = therapist.specialties.some(s => 
        user.preferences.specialties.includes(s));
      const languageMatch = therapist.languages.some(l => 
        user.preferences.languages.includes(l));
      const therapyTypeMatch = therapist.therapyTypes.some(t => 
        user.preferences.therapyType.includes(t));
      const genderMatch = !user.preferences.gender || 
        therapist.gender === user.preferences.gender;
      const ageMatch = therapist.age >= user.preferences.ageRange[0] && 
        therapist.age <= user.preferences.ageRange[1];
        
      return specialtyMatch && languageMatch && 
        therapyTypeMatch && genderMatch && ageMatch;
    }).sort((a, b) => b.rating - a.rating);
  },
}));