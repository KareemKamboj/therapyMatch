import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Users, Heart, MessageSquare, Calendar, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply scroll effects on homepage
      if (isHomePage) {
        // Show/hide navbar based on scroll direction
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        
        // Add background when scrolled
        setIsScrolled(currentScrollY > 20);
      } else {
        // Always show navbar with background on other pages
        setIsVisible(true);
        setIsScrolled(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage]);

  const handleLogout = () => {
    setUser(null);
  };

  const links = user ? [
    { to: '/matches', icon: Heart, label: 'Matches' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/profile', icon: User, label: 'Profile' },
  ] : [];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-sm' : isHomePage ? 'bg-transparent' : 'bg-white shadow-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-1" /> {/* Spacer */}
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <Users className={`h-8 w-8 ${isScrolled ? 'text-indigo-600' : isHomePage ? 'text-white' : 'text-indigo-600'}`} />
                  <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-indigo-600' : isHomePage ? 'text-white' : 'text-indigo-600'}`}>
                    TherapyMatch
                  </span>
                </Link>
              </div>
              <div className="flex-1 flex justify-end items-center">
                {user ? (
                  <>
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
                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }`}
                          >
                            <Icon className="h-5 w-5 mr-1" />
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                        isScrolled 
                          ? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100' 
                          : isHomePage
                          ? 'text-white bg-white/10 hover:bg-white/20'
                          : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                      } transition-colors`}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  isHomePage && (
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300"
                    >
                      Login
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled
                  ? 'text-gray-700 hover:text-indigo-600'
                  : isHomePage
                  ? 'text-white hover:text-white/80'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu panel */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden ${
              isScrolled ? 'bg-white' : isHomePage ? 'bg-transparent' : 'bg-white'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isScrolled
                            ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                            : isHomePage
                            ? 'text-white hover:text-white hover:bg-white/10'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-5 w-5 inline-block mr-2" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      isScrolled
                        ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        : isHomePage
                        ? 'text-white hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    <LogOut className="h-5 w-5 inline-block mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                isHomePage && (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Navbar;