import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Users, Shield, Clock, Award } from 'lucide-react';

function Home() {
  const user = useStore((state) => state.user);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                Find Your Perfect Therapy Match
              </h1>
              <p className="mt-6 text-xl text-indigo-100">
                Connect with licensed therapists who understand your needs. Start your journey to better mental health today.
              </p>
              <div className="mt-10 flex space-x-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Get Started
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Group meditation"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Join Our Growing Community
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Over 10,000 clients have found their perfect match through TherapyMatch
            </p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Personalized Matching</h3>
              <p className="mt-2 text-sm text-gray-500">
                Find therapists who match your specific needs and preferences
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Secure & Confidential</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your privacy and security are our top priorities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Flexible Scheduling</h3>
              <p className="mt-2 text-sm text-gray-500">
                Book sessions at times that work best for you
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Licensed Professionals</h3>
              <p className="mt-2 text-sm text-gray-500">
                All therapists are verified and licensed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:px-12 sm:py-12">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to Start Your Journey?
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Create your profile and find your perfect therapy match today
                </p>
                <div className="mt-8">
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;