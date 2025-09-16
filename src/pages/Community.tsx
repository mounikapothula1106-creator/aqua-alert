import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Award, Plus, Heart, MessageCircle, Share2 } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: 'Water Quality Concerns in Downtown Area',
      author: 'Sarah Johnson',
      replies: 12,
      likes: 8,
      timestamp: '2 hours ago',
      category: 'General Discussion',
      excerpt: 'Has anyone else noticed changes in water taste and smell in the downtown district? Looking for others who might have similar experiences...',
    },
    {
      id: 2,
      title: 'Organizing Lake Cleanup - March 15th',
      author: 'Mike Chen',
      replies: 24,
      likes: 15,
      timestamp: '5 hours ago',
      category: 'Events',
      excerpt: 'Planning a community cleanup event at Central Lake. We need volunteers and equipment. Please join us in making our water bodies cleaner!',
    },
    {
      id: 3,
      title: 'Best Practices for Home Water Testing',
      author: 'Dr. Emily Rodriguez',
      replies: 18,
      likes: 22,
      timestamp: '1 day ago',
      category: 'Education',
      excerpt: 'Sharing some professional insights on how to properly test your home water quality. Here are the key indicators to watch for...',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Community Water Safety Workshop',
      date: 'March 10, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'Community Center',
      attendees: 45,
      organizer: 'Water Safety Coalition',
      description: 'Learn about water testing, hazard identification, and emergency response procedures.',
    },
    {
      id: 2,
      title: 'River Cleanup Volunteer Day',
      date: 'March 15, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'Riverside Park',
      attendees: 78,
      organizer: 'Green River Initiative',
      description: 'Join us for a day of environmental action to clean up our local waterways.',
    },
    {
      id: 3,
      title: 'Water Quality Monitoring Training',
      date: 'March 22, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Environmental Center',
      attendees: 23,
      organizer: 'Citizen Science Network',
      description: 'Hands-on training for community members interested in water quality monitoring.',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', points: 1250, badge: 'Water Guardian', reports: 45 },
    { rank: 2, name: 'Mike Chen', points: 980, badge: 'Community Hero', reports: 32 },
    { rank: 3, name: 'Dr. Emily Rodriguez', points: 875, badge: 'Expert Contributor', reports: 28 },
    { rank: 4, name: 'David Park', points: 720, badge: 'Active Reporter', reports: 24 },
    { rank: 5, name: 'Lisa Thompson', points: 650, badge: 'Vigilant Citizen', reports: 21 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Hub</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow water safety advocates, share knowledge, and organize community initiatives.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2,847</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1,293</div>
            <div className="text-gray-600">Discussions</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="text-gray-600">Upcoming Events</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-gray-600">Badges Earned</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'discussions', label: 'Discussions', icon: MessageSquare },
                { id: 'events', label: 'Events', icon: Calendar },
                { id: 'leaderboard', label: 'Leaderboard', icon: Award },
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
            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Community Discussions</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>New Discussion</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              {discussion.category}
                            </span>
                            <span className="text-gray-500 text-sm">{discussion.timestamp}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                          <p className="text-gray-600 mb-3">{discussion.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>by {discussion.author}</span>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{discussion.likes} likes</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Create Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <Calendar className="h-6 w-6 text-blue-600" />
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {event.attendees} attending
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div><strong>Date:</strong> {event.date}</div>
                        <div><strong>Time:</strong> {event.time}</div>
                        <div><strong>Location:</strong> {event.location}</div>
                        <div><strong>Organizer:</strong> {event.organizer}</div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Join Event
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Community Leaderboard</h2>
                  <p className="text-gray-600">Top contributors to water safety in our community</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
                      <div>Rank</div>
                      <div>Member</div>
                      <div>Points</div>
                      <div>Badge</div>
                      <div>Reports</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {leaderboard.map((member) => (
                      <div key={member.rank} className="px-6 py-4 hover:bg-gray-50">
                        <div className="grid grid-cols-5 gap-4 items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              member.rank === 1 ? 'bg-yellow-500' :
                              member.rank === 2 ? 'bg-gray-400' :
                              member.rank === 3 ? 'bg-orange-600' : 'bg-blue-500'
                            }`}>
                              {member.rank}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{member.name}</div>
                          </div>
                          <div>
                            <span className="text-lg font-semibold text-blue-600">{member.points}</span>
                          </div>
                          <div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                              {member.badge}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">{member.reports} reports</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Earn Points</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div>• Report a water hazard: <strong>50 points</strong></div>
                    <div>• Verify a report: <strong>25 points</strong></div>
                    <div>• Participate in cleanup: <strong>100 points</strong></div>
                    <div>• Help in community discussion: <strong>10 points</strong></div>
                    <div>• Organize an event: <strong>200 points</strong></div>
                    <div>• Complete training: <strong>75 points</strong></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;