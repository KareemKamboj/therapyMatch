export interface Theme {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  accentHover: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  gradient: string;
}

export const seekerTheme: Theme = {
  primary: '#6366F1', // Indigo
  primaryHover: '#4F46E5',
  secondary: '#8B5CF6', // Purple
  secondaryHover: '#7C3AED',
  accent: '#EC4899', // Pink
  accentHover: '#DB2777',
  background: '#F8FAFC', // Slate 50
  text: '#1E293B', // Slate 800
  textSecondary: '#64748B', // Slate 500
  border: '#E2E8F0', // Slate 200
  shadow: '0 4px 6px -1px rgba(99, 102, 241, 0.1), 0 2px 4px -1px rgba(99, 102, 241, 0.06)',
  gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
};

export const helperTheme: Theme = {
  primary: '#0EA5E9', // Sky
  primaryHover: '#0284C7',
  secondary: '#3B82F6', // Blue
  secondaryHover: '#2563EB',
  accent: '#10B981', // Emerald
  accentHover: '#059669',
  background: '#F1F5F9', // Slate 100
  text: '#0F172A', // Slate 900
  textSecondary: '#475569', // Slate 600
  border: '#CBD5E1', // Slate 300
  shadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
  gradient: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
};

export const getTheme = (role: 'seeking_help' | 'providing_help'): Theme => {
  return role === 'seeking_help' ? seekerTheme : helperTheme;
}; 