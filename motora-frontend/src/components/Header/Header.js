import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import './Header.css';

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
    <header className="header">           
      <div className="logo">
        <img src="/Logo.png" alt="Logo" className="logoImage" />
      </div>      
      <div className="userProfile">
        <span>Olá, {userName}.</span>
        <button className="logoutButton" onClick={handleLogout}>Sair</button>        
      </div>
      <div>
        <img src={userImage || defaultImage} alt="Profile" className="profileImage" />
      </div>
    </header>
  );
};

export default Header;