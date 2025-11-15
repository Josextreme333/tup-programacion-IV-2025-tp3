import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AlumnosList from './pages/AlumnosList';
import MateriasList from './pages/MateriasList';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/alumnos" : "/login"} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/alumnos" /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/alumnos" /> : <Register />} />
        <Route path="/alumnos" element={isLoggedIn ? <AlumnosList /> : <Navigate to="/login" />} />
        <Route path="/materias" element={isLoggedIn ? <MateriasList /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

