import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx'
import { LeChatonAdminApp } from './LeChatonAdminApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <LeChatonAdminApp />
  </StrictMode>,
);
