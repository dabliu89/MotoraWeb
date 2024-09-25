import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './ListarTurmas.css';

const ListarTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser; 

  
  useEffect(() => {
    if (!user) {
      toast.error('Usuário não autenticado.');
      navigate('/login'); 
    }
  }, [user, navigate]);

  const loadTurmas = async () => {
    setLoading(true); 
    if (user) {
      try {        
        const q = query(collection(db, 'turmas'), where('userId', '==', user.uid));
        const data = await getDocs(q);
        setTurmas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        toast.error('Erro ao carregar turmas.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadTurmas();
  }, [user]); 

  const editTurma = (id) => {
    navigate(`/editar-turma/${id}`);
  };

  const deleteTurma = async (id) => {
    try {
      const turmaDoc = doc(db, 'turmas', id);
      await deleteDoc(turmaDoc);
      toast.success('Turma excluída com sucesso!');
      loadTurmas(); 
    } catch (error) {
      toast.error('Erro ao excluir a turma.');
    }
  };

  const verAlunos = (turmaId) => {
    navigate(`/turma/${turmaId}/dashboard-aluno`); 
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
