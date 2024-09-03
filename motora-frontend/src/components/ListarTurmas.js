import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import './ListarTurmas.css';

const ListarTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [nome, setNome] = useState('');
  const [serie, setSerie] = useState('');
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  const turmasCollectionRef = collection(db, 'turmas');

  // Função para carregar as turmas do Firebase
  const loadTurmas = async () => {
    const data = await getDocs(turmasCollectionRef);
    setTurmas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };  

  useEffect(() => {
    loadTurmas();
  }, []);

    // Função para editar uma turma
    const editTurma = (index) => {
      const turma = turmas[index];
      setNome(turma.nome);
      setSerie(turma.serie);
      setNumero(turma.numero);
      setDescricao(turma.descricao);
      setEditIndex(index);
      setEditId(turma.id);
    };
  
    // Função para deletar uma turma
    const deleteTurma = async (index) => {
      const turmaDoc = doc(db, 'turmas', turmas[index].id);
      await deleteDoc(turmaDoc);
      const updatedTurmas = turmas.filter((_, i) => i !== index);
      setTurmas(updatedTurmas);
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
          {turmas.map((turma) => (
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
  

  // return (
  //   <div>
  //     <h3>Lista de Turmas</h3>
  //     <ul>
  //       {turmas.map((turma) => (
  //         <li key={turma.id}>
  //           {turma.nome} - {turma.serie} - {turma.numero} - {turma.descricao}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default ListarTurmas;