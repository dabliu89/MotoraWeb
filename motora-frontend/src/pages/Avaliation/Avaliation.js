import React, { useState } from 'react';
import './Avaliation.css';


const Avaliation = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('Avaliação enviada com sucesso!');
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
          <button type="submit" className="button">Enviar Avaliação</button>
        </form>
        <div className="links">
          <p><a href="/login" className="link">Voltar ao login</a></p>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Avaliation;