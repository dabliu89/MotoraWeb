import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import EditAluno from './EditAluno'; // Componente que realmente faz a edição
import '../Dashboard/DashboardAluno';

const EditarAluno = () => {
  const { id } = useParams(); // Obtém o ID do aluno a partir da URL
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Navigation />
      <header className="header">
        <h2 className="h2">Editar Aluno</h2>
      </header>
      <EditAluno alunoId={id} /> {/* Passa o ID do aluno para o componente de edição */}
    </div>
  );
};

export default EditarAluno;
