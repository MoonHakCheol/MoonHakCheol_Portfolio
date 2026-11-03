import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import SoundProvider from './context/SoundProvider';
import ThemeProvider from './context/ThemeProvider';
import ToastProvider from './context/ToastProvider';
import LangProvider from './i18n/LangProvider';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <LangProvider>
          <ThemeProvider>
            <SoundProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </SoundProvider>
          </ThemeProvider>
        </LangProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
