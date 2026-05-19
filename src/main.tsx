import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx'
import { LeChatonAdminApp } from './LeChatonAdminApp.tsx';
import { I18nProvider } from './i18n/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <I18nProvider>
      <LeChatonAdminApp />
    </I18nProvider>
  </StrictMode>,
);
