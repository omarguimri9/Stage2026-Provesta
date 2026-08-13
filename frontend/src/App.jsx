import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicules from './pages/vehicules';
import VehiculeDetails from './pages/VehiculeDetails';
import MesReservations from './pages/MesReservations';
import MesFavoris from './pages/MesFavoris';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f5f5f5';
    document.body.style.color = darkMode ? '#e0e0e0' : '#1a1a1a';
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/vehicules/:id" element={<VehiculeDetails />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/mes-favoris" element={<MesFavoris />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;