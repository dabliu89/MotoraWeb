import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../firebaseConfig';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let imageUrl = '';
      if (image) {
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrl = downloadURL;
                resolve();
              });
            }
          );
        });
      }

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        profileImage: imageUrl,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="registerContainer">
      <div className="backgroundSquare"></div>
      <div className="imageContainer"></div>
      <div className="formContainer">
        <h2 className="title">Cadastre-se agora e comece as suas avaliações.</h2>
        <form className="form" onSubmit={handleRegister}>
          <div className="formGroup">
            <label className="label" htmlFor="firstName">Nome</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="João"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="lastName">Sobrenome</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Gomes da Costa"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@mail.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="confirmPassword">Repetir senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="******"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="image">Imagem de Perfil</label>
            <input
              type="file"
              id="image"
              name="image"
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="button">Criar conta</button>
        </form>
        <div className="links">
          <p>Já possui uma conta? <a href="/login" className="link">Conecte-se.</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;