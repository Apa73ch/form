import React, { useState } from 'react';
import { db, storage } from './firebaseConfig'; // Ajusta la ruta según la ubicación de tu archivo
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const RegisterVacancies = () => {
  const { companyId } = useParams();
  const [vacancies, setVacancies] = useState([
    {
      IDEmpresa:companyId,
      especialidad: '',
      categoria: '',
      descripcion: '',
      empresa: '',
    },
  ]);

  const handleVacancyChange = (index, field, value) => {
    const updatedVacancies = [...vacancies];
    updatedVacancies[index][field] = value;
    setVacancies(updatedVacancies);
  };

  const addVacancy = () => {
    setVacancies((prevVacancies) => [
      ...prevVacancies,
      {
        IDEmpresa:companyId,
        especialidad: '',
        categoria: '',
        descripcion: '',
        empresa: '',
      },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Obtener companyId desde el almacenamiento local
      const storedCompanyId = localStorage.getItem('companyId');

      // Verificar si el companyId almacenado coincide con el companyId en la URL
      if (storedCompanyId !== companyId) {
        alert('No tienes permiso para registrar vacantes para esta empresa.');
        return;
      }

      for (const vacancy of vacancies) {
        const vacanciesCollectionRef = collection(db, 'vacancies');
        await addDoc(vacanciesCollectionRef, vacancy);
      }

      console.log('Vacancies submitted:', vacancies);
      alert('Vacantes creadas exitosamente');
    } catch (error) {
      console.error('Error creating vacancies:', error);
      alert('Error al crear las vacantes');
    }
  };

  return (
    <div>
      <h1>Formulario de Creación de Vacantes</h1>
      <form onSubmit={handleSubmit}>
        {vacancies.map((vacancy, index) => (
          <div key={index}>
            <h2>Vacante {index + 1}</h2>
            <div>
              <label>Especialidad:</label>
              <input
                type="text"
                value={vacancy.especialidad}
                onChange={(e) =>
                  handleVacancyChange(index, 'especialidad', e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Categoría:</label>
              <input
                type="text"
                value={vacancy.categoria}
                onChange={(e) =>
                  handleVacancyChange(index, 'categoria', e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                value={vacancy.descripcion}
                onChange={(e) =>
                  handleVacancyChange(index, 'descripcion', e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Empresa:</label>
              <input
                type="text"
                value={vacancy.empresa}
                onChange={(e) =>
                  handleVacancyChange(index, 'empresa', e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addVacancy}>
          Agregar Vacante
        </button>
        <button type="submit">Crear Vacantes</button>
      </form>
    </div>
  );
};

export default RegisterVacancies;
