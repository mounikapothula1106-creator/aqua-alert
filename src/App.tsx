import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HazardMap from './pages/HazardMap';
import ReportHazard from './pages/ReportHazard';
import Community from './pages/Community';
import Education from './pages/Education';
import IotDashboard from './IotDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import { HazardProvider } from './contexts/HazardContext';

function App() {
  return (
    <AuthProvider>
      <HazardProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<HazardMap />} />
                <Route path="/report" element={<ReportHazard />} />
                <Route path="/community" element={<Community />} />
                <Route path="/education" element={<Education />} />
                <Route path="/iot-dashboard" element={<IotDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </HazardProvider>
    </AuthProvider>
  );
}

export default App;
