import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import '../Dashboard/DashboardAluno.css';
import AdicionarAluno from './AdicionarAluno';

const NovoAluno = () => {
  const { turmaId } = useParams(); // Obtém o ID da turma da URL

  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Alunos</h2>
      </header>      
      <AdicionarAluno turmaId={turmaId} /> {/* Passa o turmaId para AdicionarAluno */}     
    </div>
  );
};

export default NovoAluno;
