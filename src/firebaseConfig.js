import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCJNrU1Bu5NP69vLNl4haU8Q05zoGuRRMc",
    authDomain: "formsmetaitla.firebaseapp.com",
    projectId: "formsmetaitla",
    storageBucket: "formsmetaitla.appspot.com",
    messagingSenderId: "741761300434",
    appId: "1:741761300434:web:613498b334308fded43a0b"
  };
  
// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de Firestore, Auth y Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
