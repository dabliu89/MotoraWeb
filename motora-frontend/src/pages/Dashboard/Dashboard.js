import React from 'react';
import Header from '../../components/Header/Header';
import ListarTurmas from '../../components/ListarTurmas';
import Navigation from '../../components/Navigation/Navigation';
import Turma from './../Turma/Turma';
import './Dashboard.css';

const Dashboard = () => {  
  return (
    <div>
      <Header />
      <Navigation /> 
      <header className="header">
        <h2 className="h2">Dashboard</h2>           
      </header>
      <div className="dashboard-container">
        <ListarTurmas />    
      </div>
      <Turma/>         
    </div>
  );
};

export default Dashboard;