import React from 'react';
import { useStore } from '../store/useStore';
import { Star, Calendar, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Matches() {
  const matches = useStore((state) => state.getMatches());
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((therapist) => (
          <div key={therapist.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={therapist.avatar}
                alt={therapist.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{therapist.rating}</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                <p className="text-gray-600">{therapist.specialties.join(', ')}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {therapist.experience} years
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Languages:</span> {therapist.languages.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Therapy Types:</span> {therapist.therapyTypes.join(', ')}
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => navigate('/appointments')}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule</span>
                </button>
                <button
                  onClick={() => navigate('/messages')}
                  className="flex-1 bg-white text-indigo-600 px-4 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;