import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LeChatonAdminApp } from './LeChatonAdminApp.tsx';
import { I18nProvider } from './i18n/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <LeChatonAdminApp />
    </I18nProvider>
  </StrictMode>,
);
