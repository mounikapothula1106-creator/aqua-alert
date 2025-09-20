import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

type SensorData = {
  location: string;
  ph: number;
  temperature: number;
  conductivity: number;
  salinity: number;
  turbidity: number;
  dissolvedOxygen: number;
  waterLevel: number;
  orp: number;
};

// Create 10 sample locations
const initialData: SensorData[] = Array.from({ length: 10 }, (_, i) => ({
  location: `Location ${i + 1}`,
  ph: parseFloat((7 + Math.random() * 2).toFixed(2)),
  temperature: parseFloat((25 + Math.random() * 10).toFixed(1)),
  conductivity: parseFloat((800 + Math.random() * 500).toFixed(1)),
  salinity: parseFloat((30 + Math.random() * 10).toFixed(1)),
  turbidity: parseFloat((5 + Math.random() * 10).toFixed(1)),
  dissolvedOxygen: parseFloat((4 + Math.random() * 3).toFixed(1)),
  waterLevel: parseFloat((3 + Math.random() * 5).toFixed(1)),
  orp: parseFloat((200 + Math.random() * 100).toFixed(1)),
}));

// Thresholds for alerting
const thresholds = {
  ph: 7.5,
  temperature: 30,
  conductivity: 1000,
  salinity: 35,
  turbidity: 10,
  dissolvedOxygen: 5,
  waterLevel: 5,
  orp: 250,
};

const IotDashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>(initialData);

  // Update values every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) =>
        prev.map((loc) => ({
          ...loc,
          ph: parseFloat((loc.ph + (Math.random() * 0.4 - 0.2)).toFixed(2)),
          temperature: parseFloat((loc.temperature + (Math.random() * 1 - 0.5)).toFixed(1)),
          conductivity: parseFloat((loc.conductivity + (Math.random() * 20 - 10)).toFixed(1)),
          salinity: parseFloat((loc.salinity + (Math.random() * 1 - 0.5)).toFixed(1)),
          turbidity: parseFloat((loc.turbidity + (Math.random() * 1 - 0.5)).toFixed(1)),
          dissolvedOxygen: parseFloat((loc.dissolvedOxygen + (Math.random() * 0.3 - 0.15)).toFixed(1)),
          waterLevel: parseFloat((loc.waterLevel + (Math.random() * 0.5 - 0.25)).toFixed(1)),
          orp: parseFloat((loc.orp + (Math.random() * 10 - 5)).toFixed(1)),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌍 IoT Disaster Alert Dashboard - Multiple Locations</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">pH</th>
              <th className="px-4 py-2 border">Temperature</th>
              <th className="px-4 py-2 border">Conductivity</th>
              <th className="px-4 py-2 border">Salinity</th>
              <th className="px-4 py-2 border">Turbidity</th>
              <th className="px-4 py-2 border">Dissolved O₂</th>
              <th className="px-4 py-2 border">Water Level</th>
              <th className="px-4 py-2 border">ORP</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((loc) => (
              <tr key={loc.location} className="hover:bg-gray-50">
                <td className="px-4 py-2 border font-semibold">{loc.location}</td>
                {(['ph','temperature','conductivity','salinity','turbidity','dissolvedOxygen','waterLevel','orp'] as const).map((key) => {
                  const value = loc[key];
                  const alert = value > thresholds[key];
                  return (
                    <td
                      key={key}
                      className={`px-4 py-2 border ${alert ? 'text-red-600 font-bold' : ''}`}
                    >
                      {alert && <AlertTriangle className="inline w-4 h-4 mr-1 text-red-600" />}
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IotDashboard;
