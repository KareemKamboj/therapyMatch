import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTheme } from './ThemeProvider';
import { Users, Heart, MessageSquare, Calendar, User, LogOut } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const { theme, role } = useTheme();

  const handleLogout = () => {
    setUser(null);
  };

  const links = user ? [
    { to: '/matches', icon: Heart, label: 'Matches' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/profile', icon: User, label: 'Profile' },
  ] : [];

  const isHelperDashboard = location.pathname === '/therapist-profile';

  return (
    <nav className="bg-white shadow-sm" style={{ borderBottom: `1px solid ${theme.border}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Users className="h-8 w-8" style={{ color: theme.primary }} />
              <span className="ml-2 text-xl font-bold" style={{ color: theme.text }}>
                TherapyMatch
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <>
                {!isHelperDashboard && (
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {links.map((link) => {
                      const Icon = link.icon;
                      const isActive = location.pathname === link.to;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                            isActive
                              ? `border-b-2`
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          }`}
                          style={{
                            borderColor: isActive ? theme.primary : 'transparent',
                            color: isActive ? theme.primary : theme.textSecondary,
                          }}
                        >
                          <Icon className="h-5 w-5 mr-1" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-opacity"
                style={{
                  background: theme.gradient,
                }}
              >
                Sign up/Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;