import React, { useState } from 'react';
import { BookOpen, Play, Download, ExternalLink, CheckCircle, AlertTriangle, Droplets, Shield } from 'lucide-react';

const Education = () => {
  const [activeCategory, setActiveCategory] = useState('basics');

  const categories = [
    { id: 'basics', label: 'Water Safety Basics', icon: Droplets },
    { id: 'hazards', label: 'Hazard Identification', icon: AlertTriangle },
    { id: 'testing', label: 'Water Testing', icon: CheckCircle },
    { id: 'emergency', label: 'Emergency Response', icon: Shield },
  ];

  const resources = {
    basics: [
      {
        title: 'Understanding Water Quality',
        type: 'article',
        duration: '5 min read',
        description: 'Learn the fundamentals of water quality and why it matters for community health.',
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Water Contamination Sources',
        type: 'video',
        duration: '12 min',
        description: 'Visual guide to common sources of water contamination in urban and rural areas.',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Safe Water Practices Guide',
        type: 'pdf',
        duration: 'Download',
        description: 'Comprehensive guide to maintaining safe water practices at home and in the community.',
        image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    hazards: [
      {
        title: 'Chemical Contamination Signs',
        type: 'article',
        duration: '7 min read',
        description: 'How to identify chemical contamination in water sources and what actions to take.',
        image: 'https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Biological Hazards in Water',
        type: 'video',
        duration: '15 min',
        description: 'Understanding bacteria, viruses, and other biological contaminants in water systems.',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Physical Water Hazards',
        type: 'article',
        duration: '4 min read',
        description: 'Identifying physical hazards like debris, structural damage, and access issues.',
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    testing: [
      {
        title: 'Home Water Testing Kit Guide',
        type: 'video',
        duration: '10 min',
        description: 'Step-by-step instructions for using home water testing kits effectively.',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Understanding Test Results',
        type: 'article',
        duration: '6 min read',
        description: 'How to interpret water test results and understand what the numbers mean.',
        image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Professional Testing Services',
        type: 'pdf',
        duration: 'Download',
        description: 'Directory of certified water testing laboratories and services in your area.',
        image: 'https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
    emergency: [
      {
        title: 'Water Emergency Response Plan',
        type: 'pdf',
        duration: 'Download',
        description: 'Complete emergency response plan template for water-related incidents.',
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'First Aid for Water Contamination',
        type: 'video',
        duration: '8 min',
        description: 'Essential first aid procedures for exposure to contaminated water.',
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        title: 'Emergency Contact Directory',
        type: 'article',
        duration: '3 min read',
        description: 'Important contact information for water emergencies and who to call when.',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ],
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'pdf':
        return <Download className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'pdf':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Water Safety Education</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive resources to help you understand water safety, identify hazards, and protect your community.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-gray-600">Articles</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Play className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">28</div>
            <div className="text-gray-600">Videos</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Download className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-gray-600">Downloads</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-gray-600">External Links</div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeCategory === category.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources[activeCategory as keyof typeof resources].map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                    <span className="capitalize">{resource.type}</span>
                  </span>
                  <span className="text-sm text-gray-500">{resource.duration}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  {resource.type === 'pdf' ? (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </>
                  ) : resource.type === 'video' ? (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Watch</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4" />
                      <span>Read</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Water Safety Certification Program</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Complete our comprehensive water safety course and become a certified community water safety advocate. 
              Learn advanced techniques, earn recognition, and help protect your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Certification
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How often should I test my water?</h3>
              <p className="text-gray-600">
                For private wells, test annually for bacteria and every 3 years for other contaminants. 
                Municipal water users should test if they notice changes in taste, smell, or appearance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What should I do if I suspect contamination?</h3>
              <p className="text-gray-600">
                Stop using the water immediately, report it through our platform, contact local health authorities, 
                and use bottled water until the issue is resolved.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Are home water filters effective?</h3>
              <p className="text-gray-600">
                Quality varies significantly. Look for NSF-certified filters that target specific contaminants 
                in your water. Regular maintenance and filter replacement are crucial.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How can I get involved in community water safety?</h3>
              <p className="text-gray-600">
                Join our community forum, participate in local cleanup events, volunteer for water testing programs, 
                and help educate others about water safety practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;