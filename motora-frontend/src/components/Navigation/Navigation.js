import React from 'react';
import './Navigation.css';


const Navigation = () => {
  return (
    <nav style={styles.navigation}>
      
      <button style={styles.navButton}>HOME</button>
      <button style={styles.navButton}>TURMAS</button>
      <button style={styles.navButton}>MANUAL</button>
    </nav>
  );
};

export default Navigation;