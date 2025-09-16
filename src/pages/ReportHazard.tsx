import React, { useState } from 'react';
import { AlertTriangle, MapPin, Camera, Mic, Send, CheckCircle } from 'lucide-react';
import { useHazards } from '../contexts/HazardContext';
import { useAuth } from '../contexts/AuthContext';

const ReportHazard = () => {
  const { addHazard } = useHazards();
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    severity: '',
    location: '',
    description: '',
    coordinates: { lat: '', lng: '' },
    contactInfo: '',
    imageFile: null as File | null,
  });

  const hazardTypes = [
    { id: 'chemical', label: 'Chemical Contamination' },
    { id: 'biological', label: 'Biological Contamination' },
    { id: 'physical', label: 'Physical Hazard' },
    { id: 'pollution', label: 'Pollution' },
  ];

  const severityLevels = [
    { id: 'low', label: 'Low - Minor concern' },
    { id: 'medium', label: 'Medium - Moderate risk' },
    { id: 'high', label: 'High - Significant danger' },
    { id: 'critical', label: 'Critical - Immediate threat' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString(),
            },
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to detect location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Mock voice recording - in real implementation, use Web Speech API
      setTimeout(() => {
        setIsRecording(false);
        setFormData(prev => ({
          ...prev,
          description: prev.description + ' [Voice recording: Chemical spill observed near the riverbank with strong odor]'
        }));
      }, 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to report hazards.');
      return;
    }

    const newHazard = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      severity: formData.severity,
      location: formData.location,
      description: formData.description,
      reportedBy: user.name,
      reportedAt: new Date().toISOString(),
      status: 'pending',
      imageUrl: formData.imageFile ? URL.createObjectURL(formData.imageFile) : undefined,
    };

    addHazard(newHazard);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: '',
        type: '',
        severity: '',
        location: '',
        description: '',
        coordinates: { lat: '', lng: '' },
        contactInfo: '',
        imageFile: null,
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this water hazard. Local authorities have been notified and will respond accordingly.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Report ID:</strong> #{Date.now().toString().slice(-6)}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Expected Response:</strong> Within 2 hours
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Report Water Hazard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help protect your community by reporting water hazards. Your report will be immediately shared with local authorities and community members.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Emergency Situations</h3>
              <p className="text-sm text-red-700 mt-1">
                For immediate life-threatening situations, call emergency services (911) first, then submit this report.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hazard Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hazard Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Brief description of the hazard"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Hazard Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hazard Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select hazard type</option>
                {hazardTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select severity</option>
                {severityLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.label}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Street address or landmark"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleLocationDetection}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Detect
                </button>
              </div>
            </div>

            {/* Coordinates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="text"
                name="lat"
                value={formData.coordinates.lat}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  coordinates: { ...prev.coordinates, lat: e.target.value }
                }))}
                placeholder="Auto-filled or manual entry"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="text"
                name="lng"
                value={formData.coordinates.lng}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  coordinates: { ...prev.coordinates, lng: e.target.value }
                }))}
                placeholder="Auto-filled or manual entry"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Provide detailed information about the hazard, including what you observed, potential causes, and any immediate dangers"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleVoiceRecording}
                  className={`absolute bottom-3 right-3 p-2 rounded-lg transition-colors ${
                    isRecording 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
                </button>
              </div>
              {isRecording && (
                <p className="text-sm text-red-600 mt-1">Recording... Speak now</p>
              )}
            </div>

            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Evidence
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  Click to upload photo
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Photos help authorities assess the situation quickly
                </p>
                {formData.imageFile && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {formData.imageFile.name} uploaded
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information (Optional)
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="Phone number or email for follow-up questions"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Authorities may contact you for additional information
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Send className="h-5 w-5" />
              <span>Submit Hazard Report</span>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.
              False reports may result in account suspension.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportHazard;