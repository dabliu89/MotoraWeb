import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';

const ListarTurmas = () => {
  const [turmas, setTurmas] = useState([]);

  const turmasCollectionRef = collection(db, 'turmas');

  // Função para carregar as turmas do Firebase
  const loadTurmas = async () => {
    const data = await getDocs(turmasCollectionRef);
    setTurmas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    loadTurmas();
  }, []);

  return (
    <div>
      <h3>Lista de Turmas</h3>
      <ul>
        {turmas.map((turma) => (
          <li key={turma.id}>
            {turma.nome} - {turma.serie} - {turma.numero} - {turma.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarTurmas;