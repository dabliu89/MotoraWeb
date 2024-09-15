import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Avaliation from './pages/Avaliation/Avaliation';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdicionarTurma from './pages/Turma/AdicionarTurma';
import EditarTurma from './pages/Turma/EditarTurma';
import NovaTurma from './pages/Turma/NovaTurma';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/avaliation" element={<Avaliation />} />
        <Route path="/adicionar-turma" element={<AdicionarTurma />} />
        <Route path="/nova-turma" element={<NovaTurma />} />
        <Route path="/editar-turma/:id" element={<EditarTurma />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />      
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;