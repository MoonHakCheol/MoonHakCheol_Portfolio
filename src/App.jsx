import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToHash from './components/layout/ScrollToHash';
import EasterEgg from './components/EasterEgg';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <EasterEgg />
    </>
  );
}

export default App;
