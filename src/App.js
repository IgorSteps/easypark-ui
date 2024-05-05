import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/components/loginForm.js';
import DriverDashboard from './views/driverDashboard.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
