import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/components/loginForm.js';
import RegisterForm from './views/components/registerForm.js';
import DriverDashboard from './views/driverDashboard.js';
import AdminLoginForm from './views/components/adminLoginForm.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />    
            <Route path="/admin-login" element={<AdminLoginForm />} />   
        </Routes>
    </BrowserRouter>
  );
}

export default App;
