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
      <h1 className="text-2xl font-bold mb-4">
        🌍 IoT Disaster Alert Dashboard
      </h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Sensor</th>
            <th className="px-4 py-2 border">Value</th>
            <th className="px-4 py-2 border">Unit</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Alert</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.name}>
              <td className="px-4 py-2 border">{sensor.name}</td>
              <td
                className={`px-4 py-2 border ${
                  sensor.value > sensor.threshold ? "text-red-600 font-bold" : ""
                }`}
              >
                {sensor.value}
              </td>
              <td className="px-4 py-2 border">{sensor.unit}</td>
              <td className="px-4 py-2 border">{sensor.location}</td>
              <td className="px-4 py-2 border">
                {sensor.value > sensor.threshold && (
                  <AlertTriangle className="h-5 w-5 text-red-600 inline-block" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IotDashboard;
