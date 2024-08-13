import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Verifique se o caminho está correto

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header /> 
      <header style={styles.header}>
        <h2>Dashboard</h2>
        <div>
          <button onClick={() => navigate('/register')} style={styles.button}>Register</button>
          <button onClick={() => navigate('/login')} style={styles.button}>Login</button>
          <button onClick={() => navigate('/registerEvaluation')} style={styles.button}>Avaliação</button>
        </div>
      </header>
      
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  },
  button: {
    marginLeft: '10px',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #16914F',
    backgroundColor: '#16914F',
    color: '#fff',
    cursor: 'pointer',
  },
  h2: {
    color: '#16914F',
  },
};

export default Dashboard;