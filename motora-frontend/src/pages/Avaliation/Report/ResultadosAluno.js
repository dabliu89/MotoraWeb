import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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

  // Conversão de sexo
  const sexoConvertido = sexo === 'Masculino' ? 'Rapazes' : sexo === 'Feminino' ? 'Moças' : sexo;

  // Verificações para valores indefinidos e classificações
  console.log("massa:", massa, "estatura:", estatura, "sexo:", sexoConvertido, "idade:", idade);

  // Avaliação IMC
  const resultadoIMC = massa != null && estatura != null && massa > 0 && estatura > 0 
    ? avaliarIMC(massa, estatura, sexoConvertido, idade) 
    : 'Dados ausentes';

  // Avaliação RCE
  const resultadoRCE = perimetroCintura != null && estatura != null && perimetroCintura > 0 && estatura > 0 
    ? avaliarRCE(perimetroCintura, estatura) 
    : 'Dados ausentes';

  // Avaliação Desempenho (corrida de 6 minutos)
  console.log("corrida6Min:", corrida6Min, "idade:", idade, "sexo:", sexoConvertido);
  const resultadoDesempenho = corrida6Min != null && !isNaN(corrida6Min) 
    ? avaliarDesempenho(parseFloat(corrida6Min), idade, sexoConvertido) 
    : 'Dados ausentes';

  // Avaliação Abdominais
  const resultadoAbdominais = abdominais != null && !isNaN(abdominais) 
    ? avaliarAbdominais(parseInt(abdominais, 10), idade, sexoConvertido) 
    : 'Dados ausentes';

  // Avaliação Arremesso de Medicineball
  const resultadoArremesso = arremesso != null && !isNaN(arremesso) 
    ? avaliarArremesso(parseFloat(arremesso), idade, sexoConvertido) 
    : 'Dados ausentes';

  // Avaliação Corrida (20 metros)
  const resultadoCorrida = corrida20m != null && !isNaN(corrida20m) 
    ? avaliarCorrida(parseFloat(corrida20m), idade, sexoConvertido) 
    : 'Dados ausentes';

  // Avaliação Sentar e Alcançar
  const resultadoSentarAlcancar = sentarAlcancar != null && !isNaN(sentarAlcancar) 
    ? avaliarSentarAlcancar(parseFloat(sentarAlcancar), idade, sexoConvertido) 
    : 'Dados ausentes';

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
      </div>
    </div>
  );
};

export default ResultadosAluno;
