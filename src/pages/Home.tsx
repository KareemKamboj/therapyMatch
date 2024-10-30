import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Clock, Users } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: 'Personalized Matching',
      description: 'Our advanced algorithm finds the perfect therapist based on your unique needs and preferences.'
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your privacy is our top priority. All communications are encrypted and completely confidential.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book appointments at your convenience with our easy-to-use scheduling system.'
    },
    {
      icon: Users,
      title: 'Licensed Professionals',
      description: 'Connect with verified, experienced therapists specialized in various areas of mental health.'
    }
  ];

  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Find Your Perfect Therapeutic Match
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with licensed therapists who understand your unique needs and help you on your journey to better mental health.
        </p>
        <button
          onClick={() => navigate('/matches')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start Matching
        </button>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Icon className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </section>

      <section className="bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Take the first step towards better mental health today.
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Create Your Profile
        </button>
      </section>
    </div>
  );
}

export default Home;