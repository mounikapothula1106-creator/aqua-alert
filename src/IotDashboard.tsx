import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface SensorData {
  location: string;
  ph: number;
  temp: number;
  conductivity: number;
  salinity: number;
  turbidity: number;
  dissolvedOxygen: number;
  waterLevel: number;
  orp: number;
}

const IotDashboard = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);

  // Initialize 10 locations
  useEffect(() => {
    const initialSensors: SensorData[] = [];
    for (let i = 1; i <= 10; i++) {
      initialSensors.push({
        location: `Location ${i}`,
        ph: 7,
        temp: 25,
        conductivity: 100,
        salinity: 0.5,
        turbidity: 2,
        dissolvedOxygen: 8,
        waterLevel: 50,
        orp: 300,
      });
    }
    setSensors(initialSensors);
  }, []);

  // Update sensor values every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev =>
        prev.map(s => ({
          ...s,
          ph: +(6 + Math.random() * 2).toFixed(2),
          temp: +(20 + Math.random() * 10).toFixed(1),
          conductivity: +(80 + Math.random() * 40).toFixed(0),
          salinity: +(0.3 + Math.random() * 0.7).toFixed(2),
          turbidity: +(1 + Math.random() * 4).toFixed(1),
          dissolvedOxygen: +(6 + Math.random() * 4).toFixed(1),
          waterLevel: +(40 + Math.random() * 20).toFixed(0),
          orp: +(250 + Math.random() * 100).toFixed(0),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Helper to check if value crosses threshold
  const checkAlert = (key: keyof SensorData, value: number) => {
    const thresholds: { [key in keyof SensorData]?: number } = {
      ph: 8,
      temp: 30,
      conductivity: 120,
      salinity: 0.7,
      turbidity: 3,
      dissolvedOxygen: 6,
      waterLevel: 45,
      orp: 350,
    };
    return thresholds[key] !== undefined && ((key === 'dissolvedOxygen' || key === 'waterLevel') ? value < thresholds[key]! : value > thresholds[key]!);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌍 IoT Dashboard</h1>
      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Location</th>
            <th className="border p-2">pH</th>
            <th className="border p-2">Temp</th>
            <th className="border p-2">Conductivity</th>
            <th className="border p-2">Salinity</th>
            <th className="border p-2">Turbidity</th>
            <th className="border p-2">Dissolved O₂</th>
            <th className="border p-2">Water Level</th>
            <th className="border p-2">ORP</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((s, idx) => (
            <tr key={idx}>
              <td className="border p-2">{s.location}</td>
              {(Object.keys(s) as (keyof SensorData)[]).map(key =>
                key !== 'location' ? (
                  <td key={key} className={`border p-2 ${checkAlert(key, s[key]) ? 'text-red-600 font-bold flex items-center justify-center' : ''}`}>
                    {checkAlert(key, s[key]) && <AlertTriangle className="h-4 w-4 mr-1 inline" />}
                    {s[key]}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IotDashboard;
