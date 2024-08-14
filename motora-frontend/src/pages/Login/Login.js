import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import './Login.css';

// Componente Login
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login realizado com sucesso!');
      navigate('/dashboard'); // Redireciona para a página de dashboard
    } catch (error) {
      console.error("Erro ao realizar login: ", error);
      setMessage('Ocorreu um erro ao realizar o login.');
    }
  };

  return (
    <div className="loginContainer">
      <div className="backgroundSquare"></div>
      <div className="imageContainer"></div>
      <div className="formContainer">
        <div className="logoContainer">
          <img src="logo.png" alt="motora logo" className="logo" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label" htmlFor="email">Login</label>
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
          <div className="formGroup">
            <label className="label" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Entrar</button>
        </form>
        <div className="links">
          <p>Ainda não possui uma conta? <a href="/register" className="link">Criar conta.</a></p>
          <p><a href="/forgot-password" className="link">Esqueceu a senha?</a></p>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;