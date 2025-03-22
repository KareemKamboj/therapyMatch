import { create } from 'zustand';
import type { User, Therapist, Appointment, Message } from '../types';
import { seekerAPI, helperAPI } from '../services/api';

interface Store {
  user: User | null;
  therapists: Therapist[];
  appointments: Appointment[];
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  addAppointment: (appointment: Appointment) => void;
  addMessage: (message: Message) => void;
  getMatches: () => Promise<Therapist[]>;
  fetchUserProfile: () => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  therapists: [],
  appointments: [],
  messages: [],
  isLoading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  
  addAppointment: (appointment) => 
    set((state) => ({ 
      appointments: [...state.appointments, appointment] 
    })),
  
  addMessage: (message) =>
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
  
  getMatches: async () => {
    const { user } = get();
    if (!user) return [];

    set({ isLoading: true, error: null });
    try {
      const matches = await seekerAPI.getMatches();
      set({ therapists: matches });
      return matches;
    } catch (error: any) {
      set({ error: error.message });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserProfile: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const profile = user.role === 'helper' 
        ? await helperAPI.getProfile()
        : await seekerAPI.getProfile();
      set({ user: { ...user, ...profile } });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));