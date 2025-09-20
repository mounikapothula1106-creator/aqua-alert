import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS import

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
