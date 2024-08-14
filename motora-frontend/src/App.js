// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Avaliation from './pages/Avaliation/Avaliation';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Turma from './pages/Turma/Turma';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/avaliation" element={<Avaliation />} />
      <Route path="/turmas" element={<Turma />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />      
    </Routes>
  );
}

export default App;