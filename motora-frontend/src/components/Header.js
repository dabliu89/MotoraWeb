import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');

  const defaultImage = '/logo192.png'; 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTeacherData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          const userData = docSnap.data();
          const fullName = `${userData.firstName} ${userData.lastName}`;
          setUserName(fullName); 
          setUserImage(userData.profileImage); 
        }
      }
    };

    fetchTeacherData();
  }, []);

  const handleLogout = async () => {
    if (auth.currentUser) {
      await signOut(auth);
      navigate('/login'); 
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src="/Logo.png" alt="Logo" style={styles.logoImage} />
      </div>
      <div style={styles.userProfile}>
        <span>Olá, {userName}.</span>
        <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>        
      </div>
      <div>
        <img src={userImage || defaultImage} alt="Profile" style={styles.profileImage} />
      </div>
    </header>
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
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoImage: {
    width: '100px', 
    height: 'auto',
  },
  userProfile: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    marginLeft : 'auto',
  },
  logoutButton: {
    marginTop: '10px', 
    padding: '8px 16px',
    border: 'none', 
    backgroundColor: 'transparent', 
    color: '#16914F', 
    cursor: 'pointer',
    fontSize: '16px',
  },
  profileImage: {
    marginLeft: '10px', 
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
};

export default Header;