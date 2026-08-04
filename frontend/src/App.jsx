import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicules from './pages/Vehicules';
import VehiculeDetails from './pages/VehiculeDetails';
import MesReservations from './pages/MesReservations';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/vehicules/:id" element={<VehiculeDetails />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;