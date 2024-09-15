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
import ListarAlunos from './components/ListarAlunos';
import DashboardAluno from './pages/Dashboard/DashboardAluno';
import NovoAluno from './pages/Alunos/NovoAluno';
import AdicionarAluno from './pages/Alunos/AdicionarAluno';
import EditarAluno from './pages/Alunos/EditarAluno'; // Importa o componente de edição de aluno
import ListarTurmas from './components/ListarTurmas';

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
        <Route path="/turma/:turmaId/alunos" element={<ListarAlunos />} />
        <Route path="/listar-turmas" element={<ListarTurmas />} />
        <Route path="/turma/:turmaId/dashboard-aluno" element={<DashboardAluno />} />
        <Route path="/novo-aluno/:turmaId" element={<NovoAluno />} />
        <Route path="/adicionar-aluno/:turmaId" element={<AdicionarAluno />} />
        <Route path="/editar-aluno/:id" element={<EditarAluno />} /> {/* Rota para editar aluno */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
