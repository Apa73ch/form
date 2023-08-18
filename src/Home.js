import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Bienvenido</h1>
    <Link to="/registrarse-empresa">Registrarse como Empresa</Link>
    <br />
    <Link to="/registrarse-usuario">Registrarse como Usuario</Link>
    <br />
    <Link to="/login">Registrar Vacantes</Link>
  </div>
);

export default Home;
