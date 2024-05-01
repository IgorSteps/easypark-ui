"use client"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './view/Login-view';
import RegisterView from './view/Register-view';
import DriverHomepageView from './view/DriverHomepage-view';
import AdminHomepageView from './view/AdminHomepage-view';
//<Route path="/register" element={<Register />} />

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/driverHomepage" element={<DriverHomepageView />} />
          <Route path="/adminHomepage" element={<AdminHomepageView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
