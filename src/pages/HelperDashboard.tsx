import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Calendar,
  Star,
  Users,
  TrendingUp,
  MessageSquare,
  Settings,
  FileText
} from 'lucide-react';

interface TherapistProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  specialties: string[];
  languages: string[];
  therapyTypes: string[];
  hourlyRate: string;
  availability: string;
  bio: string;
  license: string;
  yearsOfExperience: string;
}

function HelperDashboard() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [step, setStep] = useState<'setup' | 'view'>('setup');
  const [formData, setFormData] = useState<TherapistProfile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    specialties: [],
    languages: [],
    therapyTypes: [],
    hourlyRate: '',
    availability: '',
    bio: '',
    license: '',
    yearsOfExperience: '',
  });

  // Mock data for the dashboard
  const dashboardData = {
    upcomingAppointments: [
      { id: 1, client: 'John Doe', date: '2024-03-20', time: '10:00 AM', type: 'Individual Therapy' },
      { id: 2, client: 'Jane Smith', date: '2024-03-20', time: '2:00 PM', type: 'Couples Therapy' },
      { id: 3, client: 'Mike Johnson', date: '2024-03-21', time: '11:00 AM', type: 'Group Therapy' },
    ],
    earnings: {
      thisMonth: 2500,
      lastMonth: 2800,
      total: 15000,
    },
    stats: {
      totalClients: 45,
      activeClients: 28,
      averageRating: 4.8,
      totalSessions: 120,
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: '1',
      name: formData.name,
      email: formData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      preferences: {
        specialties: formData.specialties,
        gender: 'not_applicable',
        ageRange: [18, 100],
        languages: formData.languages,
        therapyType: [],
        region: formData.location,
        role: 'providing_help',
        currentIssues: [],
        otherTopic: '',
        availability: {
          preferredDays: [],
          preferredTimes: [],
          timezone: '',
        },
      },
      matches: [],
    });
    setStep('view');
  };

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Complete Your Therapist Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Help us understand your practice and connect you with the right clients
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8 divide-y divide-gray-200">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="pt-8 space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="education"
                    id="education"
                    required
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="license" className="block text-sm font-medium text-gray-700">
                  License number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="license"
                    id="license"
                    required
                    value={formData.license}
                    onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                  Years of experience
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    id="yearsOfExperience"
                    required
                    min="0"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                  Hourly rate ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="hourlyRate"
                    id="hourlyRate"
                    required
                    min="0"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="availability"
                    id="availability"
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Mon-Fri 9am-5pm"
                  />
                </div>
              </div>
            </div>

            {/* Professional Bio */}
            <div className="pt-8 space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Professional Bio</h3>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Tell us about your practice
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe your therapeutic approach, specialties, and what makes you unique..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep('view')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Set up later
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Complete Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-5 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <button
              onClick={() => setStep('setup')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
                    <dd className="text-lg font-semibold text-gray-900">{dashboardData.stats.activeClients}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">This Month's Earnings</dt>
                    <dd className="text-lg font-semibold text-gray-900">${dashboardData.earnings.thisMonth}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                    <dd className="text-lg font-semibold text-gray-900">{dashboardData.stats.averageRating}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Sessions</dt>
                    <dd className="text-lg font-semibold text-gray-900">{dashboardData.stats.totalSessions}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
              <div className="mt-4 space-y-4">
                {dashboardData.upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.client}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-900">New message from Sarah Johnson</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-900">New appointment scheduled with Mike Wilson</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-900">New review received from Emily Brown</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelperDashboard; 