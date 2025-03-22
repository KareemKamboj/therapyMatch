import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface Topic {
  name: string;
  description: string;
}

function SeekerPreferences() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<User>>({
    preferences: {
      specialties: user?.preferences?.specialties || [],
      gender: user?.preferences?.gender,
      ageRange: user?.preferences?.ageRange || [25, 65],
      languages: user?.preferences?.languages || [],
      therapyType: user?.preferences?.therapyType || [],
      region: user?.preferences?.region || '',
      currentIssues: user?.preferences?.currentIssues || [],
      availability: {
        preferredDays: user?.preferences?.availability?.preferredDays || [],
        preferredTimes: user?.preferences?.availability?.preferredTimes || [],
        timezone: user?.preferences?.availability?.timezone || ''
      }
    }
  });

  const specialtiesList: Topic[] = [
    {
      name: 'Anxiety',
      description: 'Managing excessive worry, panic attacks, or social anxiety.'
    },
    {
      name: 'Depression',
      description: 'Coping with persistent sadness, lack of motivation, or suicidal thoughts.'
    },
    {
      name: 'Stress Management',
      description: 'Handling work, school, or life stress effectively.'
    },
    {
      name: 'Relationship Issues',
      description: 'Navigating conflicts with partners, family, or friends.'
    },
    {
      name: 'Trauma & PTSD',
      description: 'Processing past abuse, accidents, or distressing events.'
    },
    {
      name: 'Grief & Loss',
      description: 'Coping with the death of a loved one or other major losses.'
    },
    {
      name: 'Self-Esteem & Confidence',
      description: 'Building self-worth and a positive self-image.'
    },
    {
      name: 'Anger Management',
      description: 'Learning to control and express anger in healthy ways.'
    },
    {
      name: 'Life Transitions',
      description: 'Adjusting to major changes like a new job, moving, or retirement.'
    },
    {
      name: 'Family Issues',
      description: 'Resolving conflicts, setting boundaries, or healing from childhood wounds.'
    },
    {
      name: 'Identity & Self-Discovery',
      description: 'Exploring personal values, gender identity, or cultural background.'
    },
    {
      name: 'Addiction & Substance Abuse',
      description: 'Overcoming dependencies on alcohol, drugs, or other behaviors.'
    },
    {
      name: 'OCD & Compulsive Behaviors',
      description: 'Managing obsessive thoughts or repetitive behaviors.'
    },
    {
      name: 'Parenting Challenges',
      description: 'Navigating difficulties in raising children.'
    },
    {
      name: 'Career & Work Stress',
      description: 'Handling burnout, job dissatisfaction, or workplace issues.'
    },
    {
      name: 'Loneliness & Social Isolation',
      description: 'Building connections and improving social skills.'
    },
    {
      name: 'Chronic Illness & Pain',
      description: 'Coping with the emotional toll of long-term health conditions.'
    },
    {
      name: 'Sleep Problems',
      description: 'Addressing insomnia, nightmares, or poor sleep quality.'
    },
    {
      name: 'Phobias & Fears',
      description: 'Overcoming specific fears or phobias.'
    },
    {
      name: 'Other',
      description: 'Specify your specific concern or topic.'
    }
  ];

  const languagesList = [
    'English', 'Spanish', 'French', 'German',
    'Mandarin', 'Japanese', 'Arabic', 'Hindi'
  ];

  const therapyTypesList = [
    { value: 'individual', label: 'Individual Therapy' },
    { value: 'group', label: 'Group Therapy' },
    { value: 'family', label: 'Family Therapy' },
    { value: 'couples', label: 'Couples Therapy (Marriage/Couples Counseling)' },
    { value: 'cbt', label: 'Cognitive Behavioral Therapy (CBT)' },
    { value: 'dbt', label: 'Dialectical Behavior Therapy (DBT)' },
    { value: 'psychodynamic', label: 'Psychodynamic Therapy' },
    { value: 'humanistic', label: 'Humanistic Therapy' },
    { value: 'trauma', label: 'Trauma Therapy (EMDR, CPT, TF-CBT)' },
    { value: 'exposure', label: 'Exposure Therapy' },
    { value: 'mindfulness', label: 'Mindfulness-Based Therapy (MBCT & ACT)' },
    { value: 'play', label: 'Play Therapy' },
    { value: 'art_music', label: 'Art & Music Therapy' },
    { value: 'hypnotherapy', label: 'Hypnotherapy' },
    { value: 'ipt', label: 'Interpersonal Therapy (IPT)' },
    { value: 'open_to_explore', label: 'Open to Explore' }
  ];

  const regionsList = [
    'North America', 'Europe', 'Asia', 'South America',
    'Africa', 'Oceania', 'Middle East'
  ];

  const daysList = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
  ];

  const timeSlots = [
    'Morning (6am-12pm)', 'Afternoon (12pm-5pm)',
    'Evening (5pm-10pm)', 'Night (10pm-6am)'
  ];

  const updatePreferences = (updates: Partial<User['preferences']>) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        ...updates,
        specialties: formData.preferences?.specialties || [],
        ageRange: formData.preferences?.ageRange || [25, 65],
        languages: formData.preferences?.languages || [],
        therapyType: formData.preferences?.therapyType || [],
        availability: {
          preferredDays: formData.preferences?.availability?.preferredDays || [],
          preferredTimes: formData.preferences?.availability?.preferredTimes || [],
          timezone: formData.preferences?.availability?.timezone || ''
        },
        ...updates
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      ...formData,
    } as User);
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/profile')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Profile
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Preferences</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Therapy Type Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Preferred Therapy Types</h2>
          <div className="grid grid-cols-1 gap-2">
            {therapyTypesList.map((type) => (
              <label key={type.value} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferences?.therapyType?.includes(type.value) || false}
                  onChange={(e) => {
                    const therapyTypes = e.target.checked
                      ? [...(formData.preferences?.therapyType || []), type.value]
                      : (formData.preferences?.therapyType || []).filter(t => t !== type.value);
                    updatePreferences({ therapyType: therapyTypes });
                  }}
                  value={type.value}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Topics of Concern */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Topics of Concern</h2>
          <div className="grid grid-cols-2 gap-2">
            {specialtiesList.map((topic) => (
              <div key={topic.name} className="relative group">
                <label className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.specialties?.includes(topic.name) || false}
                    onChange={(e) => {
                      const specialties = e.target.checked
                        ? [...(formData.preferences?.specialties || []), topic.name]
                        : (formData.preferences?.specialties || []).filter(s => s !== topic.name);
                      updatePreferences({ specialties });
                    }}
                  />
                  <span>{topic.name}</span>
                </label>
                <div className="absolute z-10 invisible group-hover:visible bg-white p-2 rounded-lg shadow-lg border text-sm w-64 left-0 mt-1">
                  {topic.description}
                </div>
              </div>
            ))}
          </div>
          {formData.preferences?.specialties?.includes('Other') && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Please specify your topic..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={formData.preferences?.otherTopic || ''}
                onChange={(e) => {
                  updatePreferences({ otherTopic: e.target.value });
                }}
              />
            </div>
          )}
        </div>

        {/* Basic Preferences */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Basic Preferences</h2>

          {/* Gender Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Gender</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'only_male', label: 'Only Male' },
                { value: 'mostly_male', label: 'Mostly Male' },
                { value: 'only_female', label: 'Only Female' },
                { value: 'mostly_female', label: 'Mostly Female' },
                { value: 'not_applicable', label: 'Not Applicable' },
                { value: 'other', label: 'Other' }
              ].map((gender) => (
                <label key={gender.value} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.preferences?.gender === gender.value}
                    onChange={(e) => {
                      updatePreferences({
                        gender: e.target.value as 'only_male' | 'mostly_male' | 'only_female' | 'mostly_female' | 'not_applicable' | 'other'
                      });
                    }}
                    value={gender.value}
                  />
                  <span>{gender.label}</span>
                </label>
              ))}
            </div>
            {formData.preferences?.gender === 'other' && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Please specify your gender preference..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={formData.preferences?.otherGender || ''}
                  onChange={(e) => {
                    updatePreferences({ otherGender: e.target.value });
                  }}
                />
              </div>
            )}
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="18"
                max="100"
                value={formData.preferences?.ageRange?.[0] || 25}
                onChange={(e) => {
                  updatePreferences({
                    ageRange: [parseInt(e.target.value), formData.preferences?.ageRange?.[1] || 65]
                  });
                }}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span>to</span>
              <input
                type="number"
                min="18"
                max="100"
                value={formData.preferences?.ageRange?.[1] || 65}
                onChange={(e) => {
                  updatePreferences({
                    ageRange: [formData.preferences?.ageRange?.[0] || 25, parseInt(e.target.value)]
                  });
                }}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
            <div className="grid grid-cols-2 gap-2">
              {languagesList.map((language) => (
                <label key={language} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.languages?.includes(language) || false}
                    onChange={(e) => {
                      const languages = e.target.checked
                        ? [...(formData.preferences?.languages || []), language]
                        : (formData.preferences?.languages || []).filter(l => l !== language);
                      updatePreferences({ languages });
                    }}
                  />
                  <span>{language}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Region</label>
            <select
              value={formData.preferences?.region || ''}
              onChange={(e) => {
                updatePreferences({ region: e.target.value });
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a region</option>
              {regionsList.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Availability</h2>

          {/* Preferred Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Days</label>
            <div className="grid grid-cols-2 gap-2">
              {daysList.map((day) => (
                <label key={day} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.availability?.preferredDays?.includes(day) || false}
                    onChange={(e) => {
                      const preferredDays = e.target.checked
                        ? [...(formData.preferences?.availability?.preferredDays || []), day]
                        : (formData.preferences?.availability?.preferredDays || []).filter(d => d !== day);
                      updatePreferences({
                        availability: {
                          preferredDays,
                          preferredTimes: formData.preferences?.availability?.preferredTimes || [],
                          timezone: formData.preferences?.availability?.timezone || ''
                        }
                      });
                    }}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Times */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Times</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <label key={time} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.preferences?.availability?.preferredTimes?.includes(time) || false}
                    onChange={(e) => {
                      const preferredTimes = e.target.checked
                        ? [...(formData.preferences?.availability?.preferredTimes || []), time]
                        : (formData.preferences?.availability?.preferredTimes || []).filter(t => t !== time);
                      updatePreferences({
                        availability: {
                          preferredDays: formData.preferences?.availability?.preferredDays || [],
                          preferredTimes,
                          timezone: formData.preferences?.availability?.timezone || ''
                        }
                      });
                    }}
                  />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Timezone</label>
            <select
              value={formData.preferences?.availability?.timezone || ''}
              onChange={(e) => {
                updatePreferences({
                  availability: {
                    preferredDays: formData.preferences?.availability?.preferredDays || [],
                    preferredTimes: formData.preferences?.availability?.preferredTimes || [],
                    timezone: e.target.value
                  }
                });
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select your timezone</option>
              <option value="UTC-12">UTC-12</option>
              <option value="UTC-11">UTC-11</option>
              <option value="UTC-10">UTC-10</option>
              <option value="UTC-9">UTC-9</option>
              <option value="UTC-8">UTC-8</option>
              <option value="UTC-7">UTC-7</option>
              <option value="UTC-6">UTC-6</option>
              <option value="UTC-5">UTC-5</option>
              <option value="UTC-4">UTC-4</option>
              <option value="UTC-3">UTC-3</option>
              <option value="UTC-2">UTC-2</option>
              <option value="UTC-1">UTC-1</option>
              <option value="UTC">UTC</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3</option>
              <option value="UTC+4">UTC+4</option>
              <option value="UTC+5">UTC+5</option>
              <option value="UTC+6">UTC+6</option>
              <option value="UTC+7">UTC+7</option>
              <option value="UTC+8">UTC+8</option>
              <option value="UTC+9">UTC+9</option>
              <option value="UTC+10">UTC+10</option>
              <option value="UTC+11">UTC+11</option>
              <option value="UTC+12">UTC+12</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default SeekerPreferences; 