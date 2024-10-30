import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageCircle, Calendar, UserCircle } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/matches', icon: Users, label: 'Matches' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">TherapyMatch</span>
          </Link>
          
          <div className="flex space-x-4">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === to
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}