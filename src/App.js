import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneralAdminForm from './components/GeneralAdminForm';
import SuperAdminLogin from './admins/SuperAdminLogin';
import SuperAdminRegister from './admins/SuperAdminRegister';
import GeneralAdminLogin from './admins/GeneralAdminLogin';
import GeneralAdminRegister from './admins/GeneralAdminRegister';
import EmployeeManagement from './components/EmployeeManagement'; 
import AdminDashboard from './admins/AdminDashboard';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Admin routes */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />
        <Route path="/generaladmin/login" element={<GeneralAdminLogin />} />
        <Route path="/generaladmin/register" element={<GeneralAdminRegister />} />

        <Route path="/create-general-admin" element={<GeneralAdminForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Employee management route */}
        <Route path="/employee-management" element={<EmployeeManagement />} />

        <Route path="/" element={<GeneralAdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
