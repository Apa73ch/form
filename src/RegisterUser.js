import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    applicantType: 'invitado',
    name: '',
    password: '',
  });
  const [lastUserId, setLastUserId] = useState(0); // To store the last used user ID

  useEffect(() => {
    // Fetch the last user ID from Firestore
    const fetchLastUserId = async () => {
      const lastIdDoc = doc(db, 'system', 'lastUserId'); // Use a suitable path for your document
      const lastIdSnapshot = await getDoc(lastIdDoc);
      if (lastIdSnapshot.exists()) {
        setLastUserId(lastIdSnapshot.data().lastId);
      }
    };

    fetchLastUserId();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      const userCollection = collection(db, 'users');

      // Update the last used user ID and store it in Firestore
      const newUserId = lastUserId + 1;
      setLastUserId(newUserId);
      const lastIdDoc = doc(db, 'system', 'lastUserId'); // Use a suitable path for your document
      await updateDoc(lastIdDoc, { lastId: newUserId });

      // Add the user with the new ID
      await addDoc(userCollection, {
        id: newUserId,
        name: formData.name,
        email: formData.email,
        applicantType: formData.applicantType
      });

      console.log('User registered:', user);
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error en el registro');
    }
  };
    

  return (
    <div>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="applicantType">Tipo Solicitante:</label>
          <select
            id="applicantType"
            name="applicantType"
            value={formData.applicantType}
            onChange={handleInputChange}
          >
            <option value="invitado">Invitado</option>
            <option value="solicitante">Solicitante</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterUser;
