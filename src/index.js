import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.js';

console.info("Backend API endpoint is set to ", process.env.BASE_API_URL)

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <App />
);

