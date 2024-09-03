import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ListarTurmas from '../../components/ListarTurmas';
import Navigation from '../../components/Navigation/Navigation';
import './Dashboard.css';

const Dashboard = () => {
  
  const navigate = useNavigate();
  
  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Turmas</h2>
      </header>
      <div className="dashboard-container">
        <div className="buttonNovaTurma" onClick={() => navigate('/nova-turma')}>Nova turma</div>
        <ListarTurmas />
      </div>
    </div>
  );
};

export default Dashboard;