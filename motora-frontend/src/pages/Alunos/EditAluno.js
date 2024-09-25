import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditAluno.css'; 

const EditAluno = () => {
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
  const [alunoId, setAlunoId] = useState(null);
  const [turmaId, setTurmaId] = useState(null); 

  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const loadAluno = async () => {
      try {
        const alunoDoc = doc(db, 'alunos', id);
        const alunoData = await getDoc(alunoDoc);
        if (alunoData.exists()) {
          const aluno = alunoData.data();
          setNome(aluno.nome);
          setEmail(aluno.email);
          setIdade(aluno.idade);
          setSexo(aluno.sexo);
          setMassa(aluno.massa);
          setEstatura(aluno.estatura);
          setPerimetroCintura(aluno.perimetroCintura);
          setCorrida6Min(aluno.corrida6Min);
          setAbdominais(aluno.abdominais);
          setArremesso(aluno.arremesso);
          setCorrida20m(aluno.corrida20m);
          setSentarAlcancar(aluno.sentarAlcancar);
          setAlunoId(id);
          setTurmaId(aluno.turmaId); 
        } else {
          toast.error('Aluno não encontrado!');
          navigate('/dashboard'); 
        }
      } catch (error) {
        toast.error('Erro ao carregar dados do aluno.');
      }
    };

    loadAluno();
  }, [id, navigate]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const alunoDoc = doc(db, 'alunos', alunoId);
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
        sentarAlcancar
      };
      await updateDoc(alunoDoc, alunoData);
      toast.success('Aluno atualizado com sucesso!');
      navigate(`/turma/${turmaId}/dashboard-aluno`); 
    } catch (error) {
      toast.error('Erro ao atualizar o aluno.');
    }
  };

  return (
    <div className="wrapper">      
      <div className="form-container">
        <h2>Editar aluno:</h2>
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
        <div className="form-buttons">
          <button type="button" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button type="submit" onClick={handleUpdate}>
            Editar Aluno
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAluno;
