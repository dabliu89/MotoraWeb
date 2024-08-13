import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';

const RegisterEvaluation = () => {
  const [studentName, setStudentName] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'evaluations'), {
        studentName,
        evaluationResult,
        timestamp: new Date()
      });
      setStudentName('');
      setEvaluationResult('');
      alert('Avaliação registrada com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrar Avaliação Física</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Nome do Aluno" required />
        <input type="text" value={evaluationResult} onChange={(e) => setEvaluationResult(e.target.value)} placeholder="Resultado da Avaliação" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterEvaluation;