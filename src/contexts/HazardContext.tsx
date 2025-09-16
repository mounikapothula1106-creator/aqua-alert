import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Hazard {
  id: string;
  title: string;
  type: 'chemical' | 'biological' | 'physical' | 'pollution';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'pending' | 'investigating' | 'resolved' | 'false-alarm';
  imageUrl?: string;
}

interface HazardContextType {
  hazards: Hazard[];
  addHazard: (hazard: Hazard) => void;
  updateHazard: (id: string, updates: Partial<Hazard>) => void;
  deleteHazard: (id: string) => void;
}

const HazardContext = createContext<HazardContextType | undefined>(undefined);

export const useHazards = () => {
  const context = useContext(HazardContext);
  if (context === undefined) {
    throw new Error('useHazards must be used within a HazardProvider');
  }
  return context;
};

interface HazardProviderProps {
  children: ReactNode;
}

export const HazardProvider: React.FC<HazardProviderProps> = ({ children }) => {
  const [hazards, setHazards] = useState<Hazard[]>([
    {
      id: '1',
      title: 'Chemical Spill Near River Park',
      type: 'chemical',
      severity: 'high',
      location: 'River Park, Downtown',
      description: 'Large chemical spill observed near the riverbank. Strong chemical odor detected. Area appears to be affecting local wildlife.',
      reportedBy: 'Sarah Johnson',
      reportedAt: '2025-01-27T10:30:00Z',
      status: 'investigating',
      imageUrl: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'Algae Bloom in Central Lake',
      type: 'biological',
      severity: 'medium',
      location: 'Central Lake Recreation Area',
      description: 'Significant algae bloom covering approximately 30% of the lake surface. Water appears green and has unusual smell.',
      reportedBy: 'Mike Chen',
      reportedAt: '2025-01-27T08:15:00Z',
      status: 'pending',
      imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'Debris Blocking Water Treatment Intake',
      type: 'physical',
      severity: 'critical',
      location: 'Municipal Water Treatment Plant',
      description: 'Large debris pile blocking main water intake. This could affect water supply to the entire district.',
      reportedBy: 'David Rodriguez',
      reportedAt: '2025-01-27T06:45:00Z',
      status: 'investigating',
    },
    {
      id: '4',
      title: 'Oil Sheen on Harbor Water',
      type: 'pollution',
      severity: 'high',
      location: 'Harbor District Marina',
      description: 'Rainbow-colored oil sheen visible across harbor water. Possible fuel leak from boats or nearby industrial facility.',
      reportedBy: 'Emma Wilson',
      reportedAt: '2025-01-26T16:20:00Z',
      status: 'resolved',
      imageUrl: 'https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '5',
      title: 'Unusual Water Discoloration',
      type: 'chemical',
      severity: 'medium',
      location: 'Riverside Elementary School',
      description: 'School fountain water appears brown/orange. Students reported metallic taste. Possible pipe corrosion or contamination.',
      reportedBy: 'Lisa Thompson',
      reportedAt: '2025-01-26T14:10:00Z',
      status: 'pending',
    },
    {
      id: '6',
      title: 'Dead Fish Found in Creek',
      type: 'biological',
      severity: 'high',
      location: 'Willow Creek Trail',
      description: 'Multiple dead fish found along creek bed. No obvious cause visible. Water appears normal but may be contaminated.',
      reportedBy: 'James Park',
      reportedAt: '2025-01-26T11:30:00Z',
      status: 'investigating',
      imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ]);

  const addHazard = (hazard: Hazard) => {
    setHazards(prev => [hazard, ...prev]);
  };

  const updateHazard = (id: string, updates: Partial<Hazard>) => {
    setHazards(prev => prev.map(hazard => 
      hazard.id === id ? { ...hazard, ...updates } : hazard
    ));
  };

  const deleteHazard = (id: string) => {
    setHazards(prev => prev.filter(hazard => hazard.id !== id));
  };

  const value = {
    hazards,
    addHazard,
    updateHazard,
    deleteHazard,
  };

  return (
    <HazardContext.Provider value={value}>
      {children}
    </HazardContext.Provider>
  );
};