import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';

function Home() {
  const user = useStore((state) => state.user);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Find Your Perfect Therapy Match",
      subtitle: "Connect with licensed therapists who understand your needs",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-indigo-600 to-purple-600",
      cta: "Get Started",
      ctaLink: "/signup",
      secondaryCta: "Learn More",
      secondaryCtaLink: "/profile"
    },
    {
      title: "Personalized Matching",
      subtitle: "Our AI-powered system matches you with therapists who align with your needs",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-purple-600 to-emerald-500",
      cta: "Create Profile",
      ctaLink: "/signup",
      secondaryCta: "How It Works",
      secondaryCtaLink: "/how-it-works"
    },
    {
      title: "Secure & Confidential",
      subtitle: "Your privacy and security are our top priorities",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      gradient: "from-emerald-500 to-teal-500",
      cta: "Learn About Security",
      ctaLink: "/security",
      secondaryCta: "View Privacy Policy",
      secondaryCtaLink: "/privacy"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const currentSection = Math.floor(scrollPosition / sectionHeight);
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Full-screen sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${section.image})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-90`} />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              {section.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              {section.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={section.ctaLink}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
              >
                {section.cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to={section.secondaryCtaLink}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300"
              >
                {section.secondaryCta}
              </Link>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          {index < sections.length - 1 && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <ArrowDown className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </section>
      ))}

      {/* Final CTA section */}
      <section className="relative py-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Ready to Start Your Journey?
        </h2>
            <p className="text-base text-white/90 mb-4 max-w-2xl mx-auto">
              Create your profile and find your perfect therapy match today
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;