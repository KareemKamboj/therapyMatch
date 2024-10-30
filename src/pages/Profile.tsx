import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User } from '../types';

function Profile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
    preferences: {
      specialties: user?.preferences?.specialties || [],
      gender: user?.preferences?.gender,
      ageRange: user?.preferences?.ageRange || [25, 65],
      languages: user?.preferences?.languages || [],
      therapyType: user?.preferences?.therapyType || []
    }
  });

  const specialtiesList = [
    'Anxiety', 'Depression', 'Trauma', 'Relationships',
    'Addiction', 'Grief', 'LGBTQ+', 'Career'
  ];

  const languagesList = [
    'English', 'Spanish', 'French', 'German',
    'Mandarin', 'Japanese', 'Arabic', 'Hindi'
  ];

  const therapyTypesList = [
    'CBT', 'Psychodynamic', 'Humanistic',
    'Mindfulness', 'Art Therapy', 'Group Therapy'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      ...formData,
      id: user?.id || Math.random().toString(),
      avatar: user?.avatar || `https://source.unsplash.com/random/200x200/?portrait`,
      matches: user?.matches || []
    } as User);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>

          <div className="space-y-2">
            <span className="text-gray-700">Preferred Specialties</span>
            <div className="grid grid-cols-2 gap-2">
              {specialtiesList.map((specialty) => (
                <label key={specialty} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.specialties.includes(specialty)}
                    onChange={(e) => {
                      const specialties = e.target.checked
                        ? [...(formData.preferences?.specialties || []), specialty]
                        : formData.preferences?.specialties.filter(s => s !== specialty);
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, specialties }
                      });
                    }}
                  />
                  <span>{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-gray-700">Preferred Languages</span>
            <div className="grid grid-cols-2 gap-2">
              {languagesList.map((language) => (
                <label key={language} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.languages.includes(language)}
                    onChange={(e) => {
                      const languages = e.target.checked
                        ? [...(formData.preferences?.languages || []), language]
                        : formData.preferences?.languages.filter(l => l !== language);
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, languages }
                      });
                    }}
                  />
                  <span>{language}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-gray-700">Preferred Therapy Types</span>
            <div className="grid grid-cols-2 gap-2">
              {therapyTypesList.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.therapyType.includes(type)}
                    onChange={(e) => {
                      const therapyType = e.target.checked
                        ? [...(formData.preferences?.therapyType || []), type]
                        : formData.preferences?.therapyType.filter(t => t !== type);
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, therapyType }
                      });
                    }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;