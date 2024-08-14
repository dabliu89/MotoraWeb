import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import './ForgotPassword.css';

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
    <div className="container">
      <div className="backgroundSquare"></div>
      <div className="imageContainer"></div>
      <div className="formContainer">
        <div className="logoContainer">
          <img src="logo.png" alt="motora logo" className="logo" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label" htmlFor="email">Digite seu email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Recuperar Senha</button>
        </form>
        <div className="links">
          <p><a href="/login" className="link">Voltar ao login</a></p>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;