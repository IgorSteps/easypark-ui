import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/components/loginForm.js';
import RegisterForm from './views/components/registerForm.js';
import DriverDashboard from './views/driverDashboard.js';
import DriverList from './views/components/driversList.js';
import WebSocketProvider from './context/websocketContext.js';
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />    
            <Route  path="/temp" element={<DriverList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
