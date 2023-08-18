import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        
        const usersData = [];
        let sequence = 1;
        
        usersSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          usersData.push({
            secuencia: sequence++,
            correo: userData.email,
            tipoSolicitante: userData.applicantType,
            nombre: userData.name,
          });
        });
        
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Listado de Usuarios</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default UsersPage;
