import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/components/loginForm.js';
import RegisterForm from './views/components/registerForm.js';
import DriverDashboard from './views/driverDashboard.js';
import AdminLoginForm from './views/components/adminLoginForm.js';
import CreateParkingLotForm from './views/components/createParkingLotForm.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />     
            <Route path="/admin-login" element={<AdminLoginForm />} />
            {/* temporary path so it can be seen and tested */}
            <Route path="/create-parking-lot" element={<CreateParkingLotForm />} />   
        </Routes>
      </BrowserRouter>
  );
}

export default App;
