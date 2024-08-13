// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import RegisterEvaluation from './components/RegisterEvaluation';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registerEvaluation" element={<RegisterEvaluation />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />      
    </Routes>
  );
}

export default App;