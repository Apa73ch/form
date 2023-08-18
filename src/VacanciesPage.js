import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const vacanciesCollection = collection(db, 'vacancies');
        const vacanciesSnapshot = await getDocs(vacanciesCollection);

        const vacanciesData = [];
        
        for (const vacancyDoc of vacanciesSnapshot.docs) {
          const vacancyData = vacancyDoc.data();
          const companyDoc = await getDoc(doc(db, 'companies', vacancyData.vacancy.IDEmpresa));
          const companyData = companyDoc.data();
          
          vacanciesData.push({
            idVacantes: vacancyDoc.id,
            idEmpresa: vacancyData.vacancy.IDEmpresa,
            especialidad: vacancyData.vacancy.especialidad,
            categoría: vacancyData.vacancy.categoria,
            descripción: vacancyData.vacancy.descripcion,
            empresaX: companyData.name,
          });
        }

        setVacancies(vacanciesData);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    fetchVacancies();
  }, []);

  return (
    <div>
      <h1>Listado de Vacantes</h1>
      <pre>{JSON.stringify(vacancies, null, 2)}</pre>
    </div>
  );
};

export default VacanciesPage;
