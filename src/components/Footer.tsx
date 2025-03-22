import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Heart, Shield, Clock, Award, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white" style={{ borderTop: `1px solid ${theme.border}` }}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              TherapyMatch
            </h3>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Connecting people with the right mental health professionals for their journey to wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:underline" style={{ color: theme.textSecondary }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm hover:underline" style={{ color: theme.textSecondary }}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:underline" style={{ color: theme.textSecondary }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:underline" style={{ color: theme.textSecondary }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm" style={{ color: theme.textSecondary }}>
                <Heart className="h-4 w-4 mr-2" style={{ color: theme.primary }} />
                Personalized Matching
              </li>
              <li className="flex items-center text-sm" style={{ color: theme.textSecondary }}>
                <Shield className="h-4 w-4 mr-2" style={{ color: theme.primary }} />
                Secure & Confidential
              </li>
              <li className="flex items-center text-sm" style={{ color: theme.textSecondary }}>
                <Clock className="h-4 w-4 mr-2" style={{ color: theme.primary }} />
                Flexible Scheduling
              </li>
              <li className="flex items-center text-sm" style={{ color: theme.textSecondary }}>
                <Award className="h-4 w-4 mr-2" style={{ color: theme.primary }} />
                Licensed Professionals
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" style={{ color: theme.textSecondary }} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" style={{ color: theme.textSecondary }} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" style={{ color: theme.textSecondary }} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Linkedin className="h-5 w-5" style={{ color: theme.textSecondary }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t" style={{ borderColor: theme.border }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              © {currentYear} TherapyMatch. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm hover:underline" style={{ color: theme.textSecondary }}>
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:underline" style={{ color: theme.textSecondary }}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 