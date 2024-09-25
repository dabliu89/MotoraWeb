import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import './DashboardAluno.css';
import ListarAlunos from '../../components/ListarAlunos';

const DashboardAluno = () => {
  const { turmaId } = useParams(); 
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Alunos</h2>
      </header>
      <div className="dashboard-container">
        <button 
          type="adicionar" 
          onClick={() => navigate(`/novo-aluno/${turmaId}`)} 
        >
          Novo aluno
        </button>
        <ListarAlunos />
      </div>
    </div>
  );
};

export default DashboardAluno;
