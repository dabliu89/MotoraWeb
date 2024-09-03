import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Turma from '../../pages/Turma/Turma';
import Navigation from '../../components/Navigation/Navigation';
import '../Dashboard/Dashboard.css';
const NovaTurma = () => {
  
  const navigate = useNavigate();
  
  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Turmas</h2>
      </header>      
        <Turma />      
    </div>
  );
};

export default NovaTurma;