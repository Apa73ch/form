import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesCollection = collection(db, 'companies');
        const companiesSnapshot = await getDocs(companiesCollection);

        const companiesData = [];
        
        companiesSnapshot.forEach((companyDoc) => {
          const companyData = companyDoc.data();
          companiesData.push({
            idEmpresa: companyDoc.id,
            nombre: companyData.name,
            colores: companyData.colors,
            correoElectronico: companyData.email,
            pais: companyData.country,
          });
        });

        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Listado de Empresas</h1>
      <pre>{JSON.stringify(companies, null, 2)}</pre>
    </div>
  );
};

export default CompaniesPage;
