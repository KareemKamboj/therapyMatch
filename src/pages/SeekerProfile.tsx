import React from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Settings, Calendar, MessageCircle, Users } from 'lucide-react';
import QuoteOfTheDay from '../components/QuoteOfTheDay';

function SeekerProfile() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 mt-1">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                >
                  <Settings className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => navigate('/preferences')}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                >
                  <span>View Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quote of the Day */}
        <div className="mb-8">
          <QuoteOfTheDay />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/matches')}
              className="flex items-center space-x-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Find Matches</span>
            </button>
            <button
              onClick={() => navigate('/appointments')}
              className="flex items-center space-x-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span>View Appointments</span>
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="flex items-center space-x-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Pending Matches Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Pending Matches</h2>
              <button
                onClick={() => navigate('/matches')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">No pending matches.</p>
              {/* Add pending matches here */}
            </div>
          </div>

          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <button
                onClick={() => navigate('/appointments')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">No upcoming appointments.</p>
              {/* Add upcoming appointments here */}
            </div>
          </div>

          {/* Recent Messages Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Messages</h2>
              <button
                onClick={() => navigate('/messages')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">No recent messages.</p>
              {/* Add recent messages here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerProfile;