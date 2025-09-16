import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Settings,
  Bell,
  TrendingUp,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useHazards } from '../contexts/HazardContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { hazards } = useHazards();
  const [activeTab, setActiveTab] = useState('overview');

  const userReports = hazards.filter(hazard => hazard.reportedBy === user?.name);
  const recentReports = hazards.slice(0, 5);

  const stats = {
    totalReports: userReports.length,
    pendingReports: userReports.filter(h => h.status === 'pending').length,
    resolvedReports: userReports.filter(h => h.status === 'resolved').length,
    points: userReports.length * 50, // 50 points per report
  };

  const notifications = [
    {
      id: 1,
      type: 'update',
      title: 'Report Status Updated',
      message: 'Your chemical spill report has been marked as resolved.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'alert',
      title: 'New Hazard Near You',
      message: 'Water contamination reported 0.5 miles from your location.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'community',
      title: 'Community Event',
      message: 'Lake cleanup event scheduled for this weekend.',
      time: '1 day ago',
      read: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'investigating':
        return 'text-yellow-600 bg-yellow-100';
      case 'pending':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your water safety dashboard with recent activity and reports.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingReports}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedReports}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Points Earned</p>
                <p className="text-2xl font-bold text-gray-900">{stats.points}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'reports', label: 'My Reports', icon: AlertTriangle },
                    { id: 'activity', label: 'Recent Activity', icon: Eye },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <button className="bg-red-50 border border-red-200 p-4 rounded-lg text-left hover:bg-red-100 transition-colors">
                        <AlertTriangle className="h-6 w-6 text-red-600 mb-2" />
                        <h3 className="font-semibold text-red-900">Report New Hazard</h3>
                        <p className="text-sm text-red-700">Quickly report a water safety concern</p>
                      </button>
                      
                      <button className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left hover:bg-blue-100 transition-colors">
                        <MapPin className="h-6 w-6 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-blue-900">View Hazard Map</h3>
                        <p className="text-sm text-blue-700">Check hazards in your area</p>
                      </button>
                    </div>

                    {/* Recent Community Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Community Activity</h3>
                      <div className="space-y-4">
                        {recentReports.map((report) => (
                          <div key={report.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-orange-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {report.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {report.location} • {new Date(report.reportedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* My Reports Tab */}
                {activeTab === 'reports' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">My Reports</h2>
                    
                    {userReports.length === 0 ? (
                      <div className="text-center py-12">
                        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
                        <p className="text-gray-600 mb-4">You haven't submitted any water hazard reports.</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Submit Your First Report
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userReports.map((report) => (
                          <div key={report.id} className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                                <p className="text-gray-600">{report.location}</p>
                              </div>
                              <div className="flex space-x-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(report.severity)}`}>
                                  {report.severity.toUpperCase()}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                  {report.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{report.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Reported: {new Date(report.reportedAt).toLocaleDateString()}</span>
                              <button className="text-blue-600 hover:text-blue-700">View Details</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Report resolved</p>
                          <p className="text-sm text-gray-500">Your chemical spill report was marked as resolved</p>
                        </div>
                        <span className="text-xs text-gray-500">2h ago</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">New report submitted</p>
                          <p className="text-sm text-gray-500">You reported algae bloom at Central Lake</p>
                        </div>
                        <span className="text-xs text-gray-500">1d ago</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Points earned</p>
                          <p className="text-sm text-gray-500">You earned 50 points for reporting a hazard</p>
                        </div>
                        <span className="text-xs text-gray-500">1d ago</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <Bell className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                      <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </button>
              </div>
            </div>

            {/* Quick Settings */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Settings</h2>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SMS alerts</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Location tracking</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  More Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;