import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore'; // Adiciona query e where
import { getAuth } from 'firebase/auth'; // Importa o Firebase Auth
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importa o react-toastify
import 'react-toastify/dist/ReactToastify.css';
import './ListarTurmas.css';

const ListarTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser; // Obtém o usuário logado

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!user) {
      toast.error('Usuário não autenticado.');
      navigate('/login'); // Redireciona para a página de login, se necessário
    }
  }, [user, navigate]);

  const loadTurmas = async () => {
    setLoading(true); // Inicia o estado de carregamento
    if (user) {
      try {
        // Cria uma query para filtrar as turmas pelo ID do usuário
        const q = query(collection(db, 'turmas'), where('userId', '==', user.uid));
        const data = await getDocs(q);
        setTurmas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        toast.error('Erro ao carregar turmas.');
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    }
  };

  useEffect(() => {
    loadTurmas();
  }, [user]); // Recarrega quando o usuário for definido

  const editTurma = (id) => {
    navigate(`/editar-turma/${id}`);
  };

  const deleteTurma = async (id) => {
    try {
      const turmaDoc = doc(db, 'turmas', id);
      await deleteDoc(turmaDoc);
      toast.success('Turma excluída com sucesso!');
      loadTurmas(); // Recarrega as turmas após a exclusão
    } catch (error) {
      toast.error('Erro ao excluir a turma.');
    }
  };

  // Função para redirecionar para a página de alunos da turma
  const verAlunos = (turmaId) => {
    navigate(`/turma/${turmaId}/dashboard-aluno`); // Modificado para navegar para DashboardAlunos
  };

  return (
    <div>
      <h2>Lista de Turmas</h2>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Série</th>
              <th>Número</th>
              <th>Descrição</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {turmas.length > 0 ? (
              turmas.map((turma) => (
                <tr key={turma.id}>
                  <td>{turma.nome}</td>
                  <td>{turma.serie}</td>
                  <td>{turma.numero}</td>
                  <td>{turma.descricao}</td>
                  <td>
                    <button className="ver-alunos" onClick={() => verAlunos(turma.id)}>Ver Alunos</button>
                    <button className="edit" onClick={() => editTurma(turma.id)}>Editar</button>
                    <button className="delete" onClick={() => deleteTurma(turma.id)}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhuma turma encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarTurmas;
