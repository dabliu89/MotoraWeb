import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import './AdicionarAluno.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdicionarAluno = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [massa, setMassa] = useState('');
  const [estatura, setEstatura] = useState('');
  const [perimetroCintura, setPerimetroCintura] = useState('');
  const [corrida6Min, setCorrida6Min] = useState('');
  const [abdominais, setAbdominais] = useState('');
  const [arremesso, setArremesso] = useState('');
  const [corrida20m, setCorrida20m] = useState('');
  const [sentarAlcancar, setSentarAlcancar] = useState('');
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const { turmaId } = useParams(); 

  const alunosCollectionRef = collection(db, 'alunos');

  const addAluno = async () => {
    if (!user) {
      toast.error('Usuário não está autenticado.');
      return;
    }

    const alunoData = { 
      nome,
      email,
      idade,
      sexo,
      massa,
      estatura,
      perimetroCintura,
      corrida6Min,
      abdominais,
      arremesso,
      corrida20m,
      sentarAlcancar,
      turmaId,
      userId: user.uid
    };
    
    try {
      if (editId) {
        const alunoDoc = doc(db, 'alunos', editId);
        await updateDoc(alunoDoc, alunoData);
        toast.success('Aluno atualizado com sucesso!');
      } else {
        await addDoc(alunosCollectionRef, alunoData);
        toast.success('Novo aluno adicionado com sucesso!');
        navigate(`/turma/${turmaId}/dashboard-aluno`);
      }

      setNome('');
      setEmail('');
      setIdade('');
      setSexo('');
      setMassa('');
      setEstatura('');
      setPerimetroCintura('');
      setCorrida6Min('');
      setAbdominais('');
      setArremesso('');
      setCorrida20m('');
      setSentarAlcancar('');
      setEditId(null);
    } catch (error) {
      toast.error('Erro ao adicionar/atualizar aluno. Tente novamente.');
    }
  };

  return (
    <div className="wrapper">      
      <div className="form-container">
        <h2>Adicionar novo aluno:</h2>
        <div className="form-group">
          <div className="row-single">
            <label>Nome Completo</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Nome Completo" 
            />
          </div>
          <div className="row-single">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
            />
          </div>
          <div className="row-single">
            <label>Sexo</label>
            <select 
              value={sexo} 
              onChange={(e) => setSexo(e.target.value)} 
            >
              <option value="">Selecione o Sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className="row-single">
            <label>Idade</label>
            <input 
              type="text" 
              value={idade} 
              onChange={(e) => setIdade(e.target.value)} 
              placeholder="Idade" 
            />
          </div>
          <h3>Resultados de Testes:</h3>
          <div className="row">
            <div className="form-item">
              <label>Massa (kg)</label>
              <input 
                type="text" 
                value={massa} 
                onChange={(e) => setMassa(e.target.value)} 
                placeholder="Massa (kg)" 
              />
            </div>
            <div className="form-item">
              <label>Estatura (cm)</label>
              <input 
                type="text" 
                value={estatura} 
                onChange={(e) => setEstatura(e.target.value)} 
                placeholder="Estatura (cm)" 
              />
            </div>
            <div className="form-item">
              <label>Perímetro da Cintura (cm)</label>
              <input 
                type="text" 
                value={perimetroCintura} 
                onChange={(e) => setPerimetroCintura(e.target.value)} 
                placeholder="Perímetro da Cintura (cm)" 
              />
            </div>
            <div className="form-item">
              <label>Corrida/Caminhada 6 Minutos (m)</label>
              <input 
                type="text" 
                value={corrida6Min} 
                onChange={(e) => setCorrida6Min(e.target.value)} 
                placeholder="Corrida/Caminhada 6 Minutos (m)" 
              />
            </div>
          </div>
          <div className="row">
            <div className="form-item">
              <label>Abdominais em 1 Minuto</label>
              <input 
                type="text" 
                value={abdominais} 
                onChange={(e) => setAbdominais(e.target.value)} 
                placeholder="Abdominais em 1 Minuto" 
              />
            </div>
            <div className="form-item">
              <label>Arremesso de Medicineball (m)</label>
              <input 
                type="text" 
                value={arremesso} 
                onChange={(e) => setArremesso(e.target.value)} 
                placeholder="Arremesso de Medicineball (m)" 
              />
            </div>
            <div className="form-item">
              <label>Corrida de 20 Metros (s)</label>
              <input 
                type="text" 
                value={corrida20m} 
                onChange={(e) => setCorrida20m(e.target.value)} 
                placeholder="Corrida de 20 Metros (s)" 
              />
            </div>
            <div className="form-item">
              <label>Sentar e Alcançar (cm)</label>
              <input 
                type="text" 
                value={sentarAlcancar} 
                onChange={(e) => setSentarAlcancar(e.target.value)} 
                placeholder="Sentar e Alcançar (cm)" 
              />
            </div>
          </div>
        </div>
        <button type="adicionar" onClick={addAluno}>
          {editId ? 'Editar Aluno' : 'Adicionar Aluno'}
        </button>
      </div>
    </div>
  );
};

export default AdicionarAluno;
