import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/components/loginForm.js';
import RegisterForm from './views/components/registerForm.js';
import DriverDashboard from './views/driverDashboard.js';
import AdminLoginForm from './views/components/admin/adminLoginForm.js';
import AdminDashboard from './views/adminDashboard.js';
import AdminParkingRequests from './views/adminParkingRequests.js';
import CreateParkingLotForm from './views/components/admin/createParkingLotForm.js';
import DeleteParkingLotForm from './views/components/admin/deleteParkingLotForm.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />    
            <Route path="/admin-login" element={<AdminLoginForm />} />   
            <Route path="/admin-dashboard" element={<AdminDashboard />} />   
            <Route path="/admin-parking-requests" element={<AdminParkingRequests />} />
            {/* temporary paths so they can be seen and tested */}
            <Route path="/create-parking-lot" element={<CreateParkingLotForm />} />   
            <Route path="/delete-parking-lot" element={<DeleteParkingLotForm />} />   
        </Routes>
    </BrowserRouter>
  );
}

export default App;
