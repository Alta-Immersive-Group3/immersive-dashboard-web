import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import './styles/index.css';
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
