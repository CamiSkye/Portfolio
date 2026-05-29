import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CVPage } from './components/CVPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LegalPage } from './components/LegalPage';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { useScrollToTop } from './hooks/useScrollToTop';

function AppContent() {
  useScrollToTop();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        style={{ minHeight: '100vh', opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
      >
        <AnimatedBackground />
        <Navigation />
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
