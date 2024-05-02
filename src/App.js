import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './components/loginForm.js';
import Home from './components/home.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
