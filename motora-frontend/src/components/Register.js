import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebaseConfig';

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
    <div style={styles.registerContainer}>
      <div style={styles.backgroundSquare}></div>
      <div style={styles.imageContainer}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Cadastre-se agora e comece as suas avaliações.</h2>
        <form style={styles.form} onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="firstName">Nome</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="João"
              style={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="lastName">Sobrenome</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Gomes da Costa"
              style={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@mail.com"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Repetir senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="******"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="image">Imagem de Perfil</label>
            <input
              type="file"
              id="image"
              name="image"
              style={styles.input}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" style={styles.button}>Criar conta</button>
        </form>
        <div style={styles.links}>
          <p>Já possui uma conta? <a href="/login" style={styles.link}>Conecte-se.</a></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  registerContainer: {
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 3,
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#2E8B57',
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
    color: '#ccc',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: 'none',
    borderBottom: '1px solid #ccc',
    borderRadius: '0',
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

export default Register;