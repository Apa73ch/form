import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJNrU1Bu5NP69vLNl4haU8Q05zoGuRRMc",
  authDomain: "formsmetaitla.firebaseapp.com",
  projectId: "formsmetaitla",
  storageBucket: "formsmetaitla.appspot.com",
  messagingSenderId: "741761300434",
  appId: "1:741761300434:web:613498b334308fded43a0b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };


ReactDOM.render(<Routes />, document.getElementById('root'));

