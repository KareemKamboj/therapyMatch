import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Mail, Lock, User, ArrowRight, Heart, Handshake, GraduationCap, Sparkles, Search, Compass } from 'lucide-react';
import { authAPI } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';

function Signup() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [step, setStep] = useState<'form' | 'role' | 'helper_type' | 'seeker_type'>('form');
  const [selectedRole, setSelectedRole] = useState<'seeking_help' | 'providing_help' | null>(null);
  const [helperType, setHelperType] = useState<'licensed' | 'non_traditional' | null>(null);
  const [seekerType, setSeekerType] = useState<'licensed' | 'non_traditional' | 'all' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setStep('role');
  };

  const handleRoleSelect = (role: 'seeking_help' | 'providing_help') => {
    setSelectedRole(role);
    if (role === 'providing_help') {
      setStep('helper_type');
    } else {
      setStep('seeker_type');
    }
  };

  const handleHelperTypeSelect = (type: 'licensed' | 'non_traditional') => {
    setHelperType(type);
    handleFinalSubmit();
  };

  const handleSeekerTypeSelect = (type: 'licensed' | 'non_traditional' | 'all') => {
    setSeekerType(type);
    handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting registration with data:', {
        name: formData.name,
        email: formData.email,
        role: selectedRole === 'providing_help' ? 'helper' : 'seeker',
        helperType: selectedRole === 'providing_help' ? helperType || undefined : undefined,
        seekerType: selectedRole === 'seeking_help' ? seekerType || undefined : undefined,
      });

      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole === 'providing_help' ? 'helper' : 'seeker',
        helperType: selectedRole === 'providing_help' ? helperType || undefined : undefined,
        seekerType: selectedRole === 'seeking_help' ? seekerType || undefined : undefined,
      });

      console.log('Registration response:', response);

      // Store the token
      localStorage.setItem('token', response.token);
      
      // Update the user state
      setUser(response.user);

      // Navigate based on role
      if (selectedRole === 'providing_help') {
        navigate('/therapist-profile');
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google signup failed');
      }

      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google signup failed');
    }
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join TherapyMatch to start your journey
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      setError('Google signup failed');
                    }}
                    useOneTap
                    theme="outline"
                    size="large"
                    width="100%"
                  />
                </div>
              </div>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose Your Role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select how you want to use TherapyMatch
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <button
                onClick={() => handleRoleSelect('seeking_help')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <Heart className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I'm Seeking Help</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I want to find a therapist or mental health professional to help me
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect('providing_help')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <Handshake className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I'm Offering Help</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I'm a licensed therapist or mental health professional looking to help others
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'helper_type') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Select Your Type
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose how you provide help
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <button
                onClick={() => handleHelperTypeSelect('licensed')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <GraduationCap className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I'm a licensed professional</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I have the proper degree or certification to provide therapy
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleHelperTypeSelect('non_traditional')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <Sparkles className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I provide non-traditional therapeutic methods</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I would like to offer my personal skills to help others in a nontraditional way
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'seeker_type') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            What Type of Help Are You Looking For?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select the type of support that best matches your needs
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <button
                onClick={() => handleSeekerTypeSelect('licensed')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <GraduationCap className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I am looking for a licensed professional</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I want to work with a certified therapist or mental health professional
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleSeekerTypeSelect('non_traditional')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <Sparkles className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I am looking for non-traditional methods of therapy</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I want to explore alternative approaches to mental health support
                  </p>
                  <Link to="/about-non-traditional" className="mt-2 text-sm text-indigo-600 hover:text-indigo-500">
                    Learn more about non-traditional methods →
                  </Link>
                </div>
              </button>

              <button
                onClick={() => handleSeekerTypeSelect('all')}
                className="w-full flex items-center justify-center p-6 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <div className="text-left">
                  <Compass className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">I am here to explore all methods of therapy</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    I want to keep my options open and find what works best for me
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {step === 'form' && (
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Continue'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    setError('Google signup failed');
                  }}
                  useOneTap
                  theme="outline"
                  size="large"
                  width="100%"
                />
              </div>
            </div>
          </form>
        )}

        {step === 'role' && (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('seeking_help')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                I'm Seeking Help
              </button>
              <button
                onClick={() => handleRoleSelect('providing_help')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                I'm Offering Help
              </button>
            </div>
          </div>
        )}

        {step === 'helper_type' && (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <button
                onClick={() => handleHelperTypeSelect('licensed')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                I'm a licensed professional
              </button>
              <button
                onClick={() => handleHelperTypeSelect('non_traditional')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                I provide non-traditional therapeutic methods
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup; 