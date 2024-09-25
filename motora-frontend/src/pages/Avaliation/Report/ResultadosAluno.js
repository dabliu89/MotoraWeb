import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'; 
import { db } from '../../../firebaseConfig';
import { calcularIMC, avaliarIMC } from '../Classification/BMI';
import { avaliarDesempenho } from '../Classification/6Minutos';
import { avaliarAbdominais } from '../Classification/AbdominaisEm1Minuto';
import { avaliarArremesso } from '../Classification/ArremessoDeMedicineball';
import { avaliarCorrida } from '../Classification/CorridaDe20Metros';
import { avaliarRCE } from '../Classification/RCE';
import { avaliarSentarAlcancar } from '../Classification/SentarEAlcancar';
import './ResultadosAluno.css';

const ResultadosAluno = ({ alunoId, onClose }) => {
  const [aluno, setAluno] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchAluno = async () => {
      const alunoDoc = doc(db, 'alunos', alunoId);
      const alunoSnap = await getDoc(alunoDoc);
      if (alunoSnap.exists()) {
        setAluno(alunoSnap.data());
      }
    };

    fetchAluno();
  }, [alunoId]);

  if (!aluno) return null;

  const {
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
  } = aluno;

  const sexoConvertido = sexo === 'Masculino' ? 'Rapazes' : sexo === 'Feminino' ? 'Moças' : sexo;

  const resultadoIMC = massa && estatura && massa > 0 && estatura > 0 
    ? avaliarIMC(massa, estatura, sexoConvertido, idade) 
    : 'Dados ausentes';

  const resultadoRCE = perimetroCintura && estatura && perimetroCintura > 0 && estatura > 0 
    ? avaliarRCE(perimetroCintura, estatura) 
    : 'Dados ausentes';

  const resultadoDesempenho = corrida6Min && !isNaN(corrida6Min) 
    ? avaliarDesempenho(parseFloat(corrida6Min), idade, sexoConvertido) 
    : 'Dados ausentes';

  const resultadoAbdominais = abdominais && !isNaN(abdominais) 
    ? avaliarAbdominais(parseInt(abdominais, 10), idade, sexoConvertido) 
    : 'Dados ausentes';

  const resultadoArremesso = arremesso && !isNaN(arremesso) 
    ? avaliarArremesso(parseFloat(arremesso), idade, sexoConvertido) 
    : 'Dados ausentes';

  const resultadoCorrida = corrida20m && !isNaN(corrida20m) 
    ? avaliarCorrida(parseFloat(corrida20m), idade, sexoConvertido) 
    : 'Dados ausentes';

  const resultadoSentarAlcancar = sentarAlcancar && !isNaN(sentarAlcancar) 
    ? avaliarSentarAlcancar(parseFloat(sentarAlcancar), idade, sexoConvertido) 
    : 'Dados ausentes';

  const handleEnviarFeedback = () => {
    // Simular o envio de feedback
    console.log(`Feedback para ${nome}:`, feedback);

    // Exibir toast de sucesso
    toast.success('Feedback enviado com sucesso!');

    // Fechar o popup
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>Fechar</button>
        <h2>Resultados do Aluno</h2>
        <p><strong>Nome:</strong> {nome}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Idade:</strong> {idade}</p>
        <p><strong>Sexo:</strong> {sexo}</p>
        
        <h3>Resultados dos Testes</h3>
        <table className="resultados-tabela">
          <thead>
            <tr>
              <th>Teste</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IMC</td>
              <td>{resultadoIMC}</td>
            </tr>
            <tr>
              <td>RCE</td>
              <td>{resultadoRCE}</td>
            </tr>
            <tr>
              <td>Desempenho (6 Minutos)</td>
              <td>{resultadoDesempenho}</td>
            </tr>
            <tr>
              <td>Abdominais</td>
              <td>{resultadoAbdominais}</td>
            </tr>
            <tr>
              <td>Arremesso</td>
              <td>{resultadoArremesso}</td>
            </tr>
            <tr>
              <td>Corrida (20 metros)</td>
              <td>{resultadoCorrida}</td>
            </tr>
            <tr>
              <td>Sentar e Alcançar</td>
              <td>{resultadoSentarAlcancar}</td>
            </tr>
          </tbody>
        </table>

        <h3>Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Escreva o feedback"
          rows="4"
          style={{ width: '100%', marginTop: '10px' }}
        />

        <button onClick={handleEnviarFeedback} className="send-feedback-btn">
          Enviar Feedback
        </button>
      </div>
    </div>
  );
};

export default ResultadosAluno;
