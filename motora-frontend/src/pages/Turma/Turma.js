import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import './Turma.css';

const Turma = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função para adicionar uma nova turma
  const addTurma = async () => {
    const turmaData = { nome, serie, numero, descricao };

    if (editIndex !== null) {
      const turmaDoc = doc(db, 'turmas', editId);
      await updateDoc(turmaDoc, turmaData);
      const updatedTurmas = turmas.map((turma, index) => 
        index === editIndex ? { ...turma, ...turmaData } : turma
      );
      setTurmas(updatedTurmas);
      setEditIndex(null);
      setEditId(null);
    } else {
      const docRef = await addDoc(turmasCollectionRef, turmaData);
      setTurmas([...turmas, { ...turmaData, id: docRef.id }]);
    }
    setNome('');
    setSerie('');
    setNumero('');
    setDescricao('');
  };

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
    <div className="container">
      <div>
        <h1>Gerenciamento de Turmas</h1>
        <div className="form-group">
          <label>Nome da Turma</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            placeholder="Nome da Turma" 
          />      
          <label>Série</label>
          <input 
            type="text" 
            value={serie} 
            onChange={(e) => setSerie(e.target.value)} 
            placeholder="Série" 
          />      
          <label>Número da Turma</label>
          <input 
            type="text" 
            value={numero} 
            onChange={(e) => setNumero(e.target.value)} 
            placeholder="Número da Turma" 
          />      
          <label>Descrição</label>
          <input 
            type="text" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            placeholder="Descrição" 
          />
        </div>
      </div>
      <button type="submit" onClick={addTurma}>
        {editIndex !== null ? 'Editar Turma' : 'Adicionar Turma'}
      </button>
      <ul>
        {turmas.map((turma, index) => (
          <li key={turma.id}>
            {turma.nome} - {turma.serie} - {turma.numero} - {turma.descricao}
            <div>
              <button type="EdButton" onClick={() => editTurma(index)}>Editar</button>
              <button type="DelButton" onClick={() => deleteTurma(index)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Turma;