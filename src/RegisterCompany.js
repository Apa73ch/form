import React, { useState } from 'react';
import { db, storage } from './firebaseConfig'; // Ajusta la ruta según la ubicación de tu archivo
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    //logo: null,
    colors: '',
    email: '',
    country: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /*

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };
*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;
/*
    // Subir el archivo del logo a Firebase Storage
    const storageRef = storage.ref();
    const logoRef = storageRef.child(`company_logos/${user.uid}-${formData.logo.name}`);
    await logoRef.put(formData.logo);

    // Obtener la URL del logo subido
    const logoURL = await logoRef.getDownloadURL();
*/
    // Guardar los datos en Firestore
    const companyCollectionRef = collection(db, 'companies'); // Utiliza el nombre de tu colección aquí
    await addDoc(companyCollectionRef, {
      name: formData.name,
      //logo: logoURL,
      colors: formData.colors,
      email: formData.email,
      country: formData.country,
    });

    console.log('Company registered:', user);
    alert('Registro exitoso');
  };


  return (
    <div>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="colors">Colores:</label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={formData.colors}
            onChange={handleInputChange}
            required
          />
        </div>
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
          <label htmlFor="country">País:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
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

export default RegisterCompany;
