import React, { useState, useEffect } from 'react';
import { MapPin, Filter, AlertTriangle, Droplets, Zap, Trash2, Calendar, Eye } from 'lucide-react';
import { useHazards } from '../contexts/HazardContext';

const HazardMap = () => {
  const { hazards } = useHazards();
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    severity: 'all',
    timeframe: 'all'
  });

  const hazardTypes = [
    { id: 'chemical', label: 'Chemical Contamination', icon: Zap, color: 'red' },
    { id: 'biological', label: 'Biological Contamination', icon: Droplets, color: 'orange' },
    { id: 'physical', label: 'Physical Hazard', icon: AlertTriangle, color: 'yellow' },
    { id: 'pollution', label: 'Pollution', icon: Trash2, color: 'purple' },
  ];

  const severityLevels = [
    { id: 'low', label: 'Low', color: 'green' },
    { id: 'medium', label: 'Medium', color: 'yellow' },
    { id: 'high', label: 'High', color: 'orange' },
    { id: 'critical', label: 'Critical', color: 'red' },
  ];

  const filteredHazards = hazards.filter(hazard => {
    if (filters.type !== 'all' && hazard.type !== filters.type) return false;
    if (filters.severity !== 'all' && hazard.severity !== filters.severity) return false;
    if (filters.timeframe !== 'all') {
      const now = new Date();
      const hazardDate = new Date(hazard.reportedAt);
      const daysDiff = (now.getTime() - hazardDate.getTime()) / (1000 * 3600 * 24);
      
      if (filters.timeframe === '24h' && daysDiff > 1) return false;
      if (filters.timeframe === '7d' && daysDiff > 7) return false;
      if (filters.timeframe === '30d' && daysDiff > 30) return false;
    }
    return true;
  });

  const getSeverityColor = (severity: string) => {
    const level = severityLevels.find(s => s.id === severity);
    return level ? level.color : 'gray';
  };

  const getHazardIcon = (type: string) => {
    const hazardType = hazardTypes.find(h => h.id === type);
    return hazardType ? hazardType.icon : AlertTriangle;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Water Hazard Map</h1>
          <p className="text-gray-600">
            Real-time monitoring of water hazards in your community. Click on markers for detailed information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <Filter className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Hazard Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hazard Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  {hazardTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Severity Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </label>
                <select
                  value={filters.severity}
                  onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Levels</option>
                  {severityLevels.map(level => (
                    <option key={level.id} value={level.id}>{level.label}</option>
                  ))}
                </select>
              </div>

              {/* Time Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Frame
                </label>
                <select
                  value={filters.timeframe}
                  onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>

              {/* Legend */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Legend</h3>
                <div className="space-y-2">
                  {hazardTypes.map(type => {
                    const Icon = type.icon;
                    return (
                      <div key={type.id} className="flex items-center">
                        <Icon className={`h-4 w-4 text-${type.color}-500 mr-2`} />
                        <span className="text-sm text-gray-600">{type.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Map and Hazard List */}
          <div className="lg:col-span-3">
            {/* Mock Map */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-32 h-24 bg-blue-300 rounded-lg"></div>
                  <div className="absolute top-20 right-20 w-40 h-20 bg-green-300 rounded-lg"></div>
                  <div className="absolute bottom-20 left-1/3 w-28 h-32 bg-blue-400 rounded-lg"></div>
                </div>
                
                {/* Hazard Markers */}
                {filteredHazards.slice(0, 8).map((hazard, index) => {
                  const Icon = getHazardIcon(hazard.type);
                  const positions = [
                    { top: '20%', left: '25%' },
                    { top: '35%', left: '60%' },
                    { top: '60%', left: '30%' },
                    { top: '45%', left: '75%' },
                    { top: '70%', left: '50%' },
                    { top: '25%', left: '80%' },
                    { top: '80%', left: '20%' },
                    { top: '15%', left: '45%' },
                  ];
                  
                  return (
                    <div
                      key={hazard.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10`}
                      style={positions[index]}
                      onClick={() => setSelectedHazard(hazard)}
                    >
                      <div className={`bg-${getSeverityColor(hazard.severity)}-500 p-2 rounded-full shadow-lg hover:scale-110 transition-transform`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  );
                })}
                
                <div className="text-center z-0">
                  <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Interactive Water Hazard Map</p>
                  <p className="text-gray-500 text-sm">Click on markers to view hazard details</p>
                </div>
              </div>
            </div>

            {/* Hazard List */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Hazards ({filteredHazards.length})
                  </h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    Live Updates
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredHazards.slice(0, 10).map((hazard) => {
                  const Icon = getHazardIcon(hazard.type);
                  return (
                    <div
                      key={hazard.id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedHazard(hazard)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`bg-${getSeverityColor(hazard.severity)}-100 p-2 rounded-lg`}>
                          <Icon className={`h-5 w-5 text-${getSeverityColor(hazard.severity)}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {hazard.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getSeverityColor(hazard.severity)}-100 text-${getSeverityColor(hazard.severity)}-800`}>
                              {hazard.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{hazard.description}</p>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {hazard.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(hazard.reportedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Hazard Detail Modal */}
        {selectedHazard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedHazard.title}</h2>
                  <button
                    onClick={() => setSelectedHazard(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full bg-${getSeverityColor(selectedHazard.severity)}-100 text-${getSeverityColor(selectedHazard.severity)}-800`}>
                      {selectedHazard.severity.toUpperCase()} SEVERITY
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedHazard.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Location:</span>
                      <p className="text-gray-600">{selectedHazard.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Reported:</span>
                      <p className="text-gray-600">{new Date(selectedHazard.reportedAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Type:</span>
                      <p className="text-gray-600">{hazardTypes.find(t => t.id === selectedHazard.type)?.label}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Status:</span>
                      <p className="text-gray-600">{selectedHazard.status}</p>
                    </div>
                  </div>
                  {selectedHazard.imageUrl && (
                    <div>
                      <img
                        src={selectedHazard.imageUrl}
                        alt="Hazard"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardMap;