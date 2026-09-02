import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import SoundProvider from './context/SoundProvider';
import LangProvider from './i18n/LangProvider';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
);
