import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Globe,
  Droplets,
  Eye,
  MessageSquare,
  Award
} from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Active Users', value: '12,847', icon: Users },
    { label: 'Hazards Reported', value: '3,291', icon: AlertTriangle },
    { label: 'Communities Protected', value: '156', icon: Shield },
    { label: 'Response Time', value: '< 2hrs', icon: TrendingUp },
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Interactive Hazard Map',
      description: 'View real-time water hazards in your area with detailed information and severity levels.',
    },
    {
      icon: AlertTriangle,
      title: 'Quick Reporting',
      description: 'Report water hazards instantly with our simple form and emergency voice reporting feature.',
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with local volunteers and participate in water safety initiatives.',
    },
    {
      icon: Eye,
      title: 'AI Predictions',
      description: 'Advanced algorithms predict potential contamination events before they occur.',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Alerts',
      description: 'Get instant notifications about water hazards near your saved locations.',
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn badges and recognition for contributing to water safety in your community.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Droplets className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protecting Water Safety
              <span className="block text-teal-200">Together</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Join thousands of community members monitoring and reporting water hazards to keep our communities safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/report"
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🚨 Report Emergency
              </Link>
              <Link
                to="/map"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                View Hazard Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Water Safety Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with community engagement to create a safer water environment for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Global Water Safety Movement
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Be part of a worldwide community dedicated to protecting water resources and ensuring safe access to clean water for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              to="/education"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Community Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Chemical Spill Reported</h3>
              <p className="text-gray-600 text-sm">Industrial contamination detected near River Park. Authorities notified.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-500">5 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Cleanup Organized</h3>
              <p className="text-gray-600 text-sm">50 volunteers joined the Lake Shore cleanup initiative.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Water Quality Improved</h3>
              <p className="text-gray-600 text-sm">Downtown reservoir shows significant improvement after treatment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;