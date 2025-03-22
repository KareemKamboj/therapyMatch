import React, { createContext, useContext } from 'react';
import { useStore } from '../store/useStore';
import { Theme, getTheme } from '../theme';

interface ThemeContextType {
  theme: Theme;
  role: 'seeking_help' | 'providing_help';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  const role = user?.preferences?.role || 'seeking_help';
  const theme = getTheme(role);

  return (
    <ThemeContext.Provider value={{ theme, role }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 