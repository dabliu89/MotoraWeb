import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';


const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav style={styles.navigation}>
      <button style={styles.navButton} onClick={() => navigate('/')}>HOME</button>
      <button style={styles.navButton} onClick={() => navigate('/turmas')}>TURMAS</button>
      <button style={styles.navButton} onClick={() => navigate('/Avaliation')}>AVALIAÇÃO</button>      
    </nav>
  );
};

const styles = {
  navigation: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#f8f9fa',
  },
  navButton: {
    marginTop: '10px', 
    padding: '8px 16px',
    border: 'none', 
    backgroundColor: 'transparent', 
    color: '#16914F', 
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Navigation;