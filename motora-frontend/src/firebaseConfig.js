import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB32ZszRS8yOJNRjqNJ8oIrrSZ5h4lN-Uc",
  authDomain: "motoraweb-e7180.firebaseapp.com",
  projectId: "motoraweb-e7180",
  storageBucket: "motoraweb-e7180.appspot.com",
  messagingSenderId: "692781441222",
  appId: "1:692781441222:web:17de1b1d6691a4b1b337c7",
  measurementId: "G-42SMF627K3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
