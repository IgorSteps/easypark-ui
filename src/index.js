import React from 'react';
import { makeServer } from '../mirageServer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.js';

if (process.env.USING === 'mirage') {
  makeServer();
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <App />
);

