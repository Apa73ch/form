import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import RegisterCompany from './RegisterCompany';
import RegisterUser from './RegisterUser';
import RegisterVacancies from './RegisterVacancies';
import Login from './Login'
import UsersPage from './UsersPage';
import CompaniesPage from './CompaniesPage';
import VacanciesPage from './VacanciesPage';

const AppRoutes = () => {
  return (
    <Router> {/* Cambia BrowserRouter o MemoryRouter aquí si es necesario */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse-empresa" element={<RegisterCompany />} />
        <Route path="/registrarse-usuario" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/registrar-vacantes/:companyId" element={<RegisterVacancies />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
