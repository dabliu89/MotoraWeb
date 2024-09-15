import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ListarAlunos.css'; // Verifique o caminho e a importação

const ListarAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const { turmaId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const loadAlunos = async () => {
    setLoading(true);
    try {
      if (user) {
        const q = query(collection(db, 'alunos'), where('turmaId', '==', turmaId));
        const data = await getDocs(q);
        setAlunos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        toast.error('Usuário não autenticado.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Erro ao carregar alunos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlunos();
  }, [turmaId, user]);

  const editAluno = (id) => {
    navigate(`/editar-aluno/${id}`);
  };

  const deleteAluno = async (id) => {
    try {
      const alunoDoc = doc(db, 'alunos', id);
      await deleteDoc(alunoDoc);
      toast.success('Aluno excluído com sucesso!');
      loadAlunos();
    } catch (error) {
      toast.error('Erro ao excluir o aluno.');
    }
  };

  const verResultados = (id) => {
    navigate(`/resultados-aluno/${id}`);
  };

  return (
    <div>
      <h2>Lista de Alunos da Turma</h2>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome Completo</th>
              <th>Idade</th>
              <th>Email</th>
              <th>Sexo</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length > 0 ? (
              alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.idade}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.sexo}</td>
                  <td>
                    <button className="resultados" onClick={() => verResultados(aluno.id)}>Resultados</button>
                    <button className="edit" onClick={() => editAluno(aluno.id)}>Editar</button>
                    <button className="delete" onClick={() => deleteAluno(aluno.id)}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum aluno encontrado para esta turma.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarAlunos;
