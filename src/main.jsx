import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import SoundProvider from './context/SoundProvider';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SoundProvider>
        <App />
      </SoundProvider>
    </BrowserRouter>
  </StrictMode>
);
