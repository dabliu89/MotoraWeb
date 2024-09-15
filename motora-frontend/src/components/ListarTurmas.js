import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importa o react-toastify
import 'react-toastify/dist/ReactToastify.css';
import './ListarTurmas.css';

const ListarTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const navigate = useNavigate();

  const turmasCollectionRef = collection(db, 'turmas');

  const loadTurmas = async () => {
    const data = await getDocs(turmasCollectionRef);
    setTurmas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    loadTurmas();
  }, []);

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

  return (
    <div>
      <h2>Lista de Turmas</h2>
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
          {turmas.map((turma, index) => (
            <tr key={turma.id}>
              <td>{turma.nome}</td>
              <td>{turma.serie}</td>
              <td>{turma.numero}</td>
              <td>{turma.descricao}</td>
              <td>
                <button className="edit" onClick={() => editTurma(turma.id)}>Editar</button>
                <button className="delete" onClick={() => deleteTurma(turma.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarTurmas;