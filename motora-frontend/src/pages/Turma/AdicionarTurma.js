
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import '../../pages/Turma/AdicionarTurma.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdicionarTurma = () => {
  const [turmas, setTurmas] = useState([]);
  const [nome, setNome] = useState('');
  const [serie, setSerie] = useState('');
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

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
    
  
    try {
      if (editIndex !== null) {
        // Atualizando uma turma existente
        const turmaDoc = doc(db, 'turmas', editId);
        await updateDoc(turmaDoc, turmaData);
        const updatedTurmas = turmas.map((turma, index) =>
          index === editIndex ? { ...turma, ...turmaData } : turma
        );
        setTurmas(updatedTurmas);
        setEditIndex(null);
        setEditId(null);
        toast.success('Turma atualizada com sucesso!'); // Toast de sucesso para edição
      } else {
        // Adicionando uma nova turma
        const docRef = await addDoc(turmasCollectionRef, turmaData);
        setTurmas([...turmas, { ...turmaData, id: docRef.id }]);
        toast.success('Nova turma adicionada com sucesso!'); // Toast de sucesso para adição
        navigate('/Dashboard'); // Navega para o Dashboard após sucesso
      }
  
      // Limpa os campos após adicionar/editar
      setNome('');
      setSerie('');
      setNumero('');
      setDescricao('');
    } catch (error) {
      toast.error('Erro ao adicionar/atualizar turma. Tente novamente.');
    }
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
        <h2>Adicionar nova turma:</h2>
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
        <button type="adicionar" onClick={addTurma}>
        {editIndex !== null ? 'Editar Turma' : 'Adicionar Turma'}
      </button>      
      </div>      
    </div>
  );
};

export default AdicionarTurma;