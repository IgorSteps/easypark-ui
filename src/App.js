import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './views/loginForm.js';
import RegisterForm from './views/registerForm.js';
import Home from './views/home.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
