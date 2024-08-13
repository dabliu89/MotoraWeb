import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // importe o arquivo firebase.js

// Componente ForgotPassword
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Email de recuperação enviado com sucesso!');
    } catch (error) {
      console.error("Erro ao enviar email de recuperação: ", error);
      setMessage('Ocorreu um erro ao enviar o email de recuperação.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundSquare}></div>
      <div style={styles.imageContainer}></div>
      <div style={styles.formContainer}>
        <div style={styles.logoContainer}>
          <img src="logo.png" alt="motora logo" style={styles.logo} />
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Digite seu email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Recuperar Senha</button>
        </form>
        <div style={styles.links}>
          <p><a href="/login" style={styles.link}>Voltar ao login</a></p>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

// Estilos CSS
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'relative',
  },
  backgroundSquare: {
    position: 'absolute',
    width: '1280px',
    height: '832px',
    backgroundColor: '#16914F',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
  imageContainer: {
    position: 'absolute',
    width: '949px',
    height: '832px',
    background: `url('/Background.png') no-repeat left top`,
    backgroundSize: 'cover',
    top: '50%',
    left: '41%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
  },
  formContainer: {
    position: 'absolute',
    marginLeft: '30%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    zIndex: 3,
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  logo: {
    maxWidth: '150px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  links: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default ForgotPassword;