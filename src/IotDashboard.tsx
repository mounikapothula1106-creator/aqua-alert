import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface Sensor {
  name: string;
  value: number;
  threshold: number;
  unit: string;
  location: string;
}

const IotDashboard: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([
    { name: "pH", value: 7, threshold: 8, unit: "", location: "Location A" },
    { name: "Temperature", value: 25, threshold: 35, unit: "°C", location: "Location B" },
    { name: "Conductivity", value: 400, threshold: 500, unit: "µS/cm", location: "Location C" },
    { name: "Salinity", value: 0.5, threshold: 1, unit: "ppt", location: "Location D" },
    { name: "Turbidity", value: 2, threshold: 5, unit: "NTU", location: "Location E" },
    { name: "Dissolved Oxygen", value: 6, threshold: 4, unit: "mg/L", location: "Location F" },
    { name: "Water Level", value: 1.2, threshold: 2, unit: "m", location: "Location G" },
    { name: "ORP", value: 200, threshold: 300, unit: "mV", location: "Location H" },
  ]);

  // Simulate sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: parseFloat((sensor.value + Math.random() * 2 - 1).toFixed(2)),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">
        🌍 IoT Disaster Alert Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sensors.map((sensor) => (
          <div
            key={sensor.name}
            className={`p-4 rounded-lg shadow-md transition-colors ${
              sensor.value > sensor.threshold ? "bg-red-100" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-lg">{sensor.name}</h2>
              {sensor.value > sensor.threshold && (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
            </div>
            <p className={`text-2xl font-bold ${
              sensor.value > sensor.threshold ? "text-red-600" : "text-gray-900"
            }`}>
              {sensor.value} {sensor.unit}
            </p>
            <p className="text-gray-500 mt-1">Location: {sensor.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IotDashboard;
