import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/components/loginForm.js';
import RegisterForm from './views/components/registerForm.js';
import DriverDashboard from './views/driverDashboard.js';
import AdminLoginForm from './views/components/admin/adminLoginForm.js';
import AdminDashboard from './views/adminDashboard.js';
import AdminParkingRequests from './views/adminParkingRequests.js';
import AdminAlerts from './views/adminAlerts.js';
import AdminNotifications from './views/adminNotifications.js';
import {DriverFAQPage, AdminFAQPage} from './views/faqPage.js';
import ManageDrivers from './views/ManageDrivers.js';

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
            <Route path="/alerts" element={<AdminAlerts />} />
            <Route path="/notifications" element={<AdminNotifications />} />
            <Route path='/faq' element={<DriverFAQPage />} /> 
            <Route path='/admin-faq' element={<AdminFAQPage />} /> 
            <Route path='/manage-drivers' element={<ManageDrivers />} /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
