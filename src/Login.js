import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore'; // Importa las funciones de Firestore
import { db, storage } from './firebaseConfig';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // Obtener el ID del documento de la empresa desde Firestore
      const companiesCollectionRef = collection(db, 'companies');
      const querySnapshot = await getDocs(companiesCollectionRef);
      
      let companyId = null;

      querySnapshot.forEach((doc) => {
        const companyData = doc.data();
        if (companyData.email === formData.email) {
          companyId = doc.id;
          localStorage.setItem('companyId', companyId);
        }
      });

      if (companyId) {
        // Redireccionar a la página de RegistrarVacantes con el ID de la empresa como parámetro
        navigate(`/registrar-vacantes/${companyId}`);
      } else {
        alert('Empresa no encontrada');
      }
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form>
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
        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
