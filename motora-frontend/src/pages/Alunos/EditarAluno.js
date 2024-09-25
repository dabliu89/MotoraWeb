import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import EditAluno from './EditAluno'; 
import '../Dashboard/DashboardAluno';

const EditarAluno = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Editar Aluno</h2>
      </header>
      <EditAluno alunoId={id} /> 
    </div>
  );
};

export default EditarAluno;
