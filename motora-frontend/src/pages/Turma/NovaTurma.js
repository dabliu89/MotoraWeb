import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Turma from './AdicionarTurma';
import Navigation from '../../components/Navigation/Navigation';
import '../Dashboard/Dashboard.css';
import AdicionarTurma from './AdicionarTurma';
const NovaTurma = () => {
  
  const navigate = useNavigate();
  
  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Turmas</h2>
      </header>      
        <AdicionarTurma />      
    </div>
  );
};

export default NovaTurma;