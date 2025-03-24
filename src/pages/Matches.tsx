import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Heart, X, MessageCircle, Star } from 'lucide-react';

function Matches() {
  const user = useStore((state) => state.user);
  const therapists = useStore((state) => state.therapists);
  const addAppointment = useStore((state) => state.addAppointment);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedTherapist, setMatchedTherapist] = useState<any>(null);

  const filteredTherapists = therapists.filter(therapist => {
    if (!user?.preferences) return true;
    
    const specialtyMatch = !user.preferences.specialties?.length || 
      therapist.specialties.some(s => user.preferences.specialties.includes(s));
    const languageMatch = !user.preferences.languages?.length || 
      therapist.languages.some(l => user.preferences.languages.includes(l));
    const therapyTypeMatch = !user.preferences.therapyType?.length || 
      therapist.therapyTypes.some(t => user.preferences.therapyType.includes(t));
    const genderMatch = !user.preferences.gender || 
      therapist.gender === user.preferences.gender;
    const ageMatch = !user.preferences.ageRange || 
      (therapist.age >= user.preferences.ageRange[0] && 
       therapist.age <= user.preferences.ageRange[1]);
      
    return specialtyMatch && languageMatch && 
      therapyTypeMatch && genderMatch && ageMatch;
  });

  const currentTherapist = filteredTherapists[currentIndex];

  const handleLike = () => {
    if (!currentTherapist) return;
    
    // Simulate matching logic
    if (Math.random() > 0.5) {
      setMatchedTherapist(currentTherapist);
      setShowMatchAnimation(true);
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const handleDislike = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleMessage = () => {
    // Navigate to messages with the matched therapist
    // This would be implemented when we add messaging functionality
  };

  if (!currentTherapist) {
  return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No More Profiles</h2>
          <p className="text-gray-600">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Image */}
          <div className="relative h-96">
            <img
              src={currentTherapist.avatar}
              alt={currentTherapist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h2 className="text-2xl font-bold text-white">
                {currentTherapist.name}, {currentTherapist.age}
              </h2>
              <p className="text-white/90">{currentTherapist.specialties.join(', ')}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">{currentTherapist.rating.toFixed(1)}</span>
              <span className="text-gray-500">({currentTherapist.reviews.length} reviews)</span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600">{currentTherapist.bio}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {currentTherapist.specialties.map((specialty: string) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

              <div>
              <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {currentTherapist.languages.map((language: string) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
              </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
              <p className="text-gray-600">
                {currentTherapist.experience} years of experience
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t flex justify-center space-x-4">
            <button
              onClick={handleDislike}
              className="p-4 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <X className="h-8 w-8 text-gray-500" />
            </button>
            <button
              onClick={handleLike}
              className="p-4 rounded-full bg-white border-2 border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <Heart className="h-8 w-8 text-indigo-500" />
            </button>
          </div>
        </div>
              </div>

      {/* Match Animation */}
      {showMatchAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <h2 className="text-3xl font-bold text-indigo-600 mb-4">It's a Match!</h2>
            <div className="flex justify-center space-x-4 mb-6">
              <img
                src={user?.avatar}
                alt="Your avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
              <img
                src={matchedTherapist.avatar}
                alt={matchedTherapist.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <p className="text-gray-600 mb-6">
              You matched with {matchedTherapist.name}! Start a conversation to learn more.
            </p>
            <div className="flex justify-center space-x-4">
                <button
                onClick={() => setShowMatchAnimation(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                Keep Browsing
                </button>
                <button
                onClick={handleMessage}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                >
                <MessageCircle className="h-5 w-5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default Matches;