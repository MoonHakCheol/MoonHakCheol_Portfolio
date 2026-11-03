import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToHash from './components/layout/ScrollToHash';
import BackToTop from './components/layout/BackToTop';
import CommandPalette from './components/CommandPalette';
import EasterEgg from './components/EasterEgg';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const { pathname } = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <ScrollToHash />
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.div>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
      <EasterEgg />
    </>
  );
}

export default App;
