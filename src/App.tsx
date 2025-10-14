import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CVPage } from './components/CVPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    setCurrentPage('accueil');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'cv':
        return <CVPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div style={{ minHeight: '100vh', opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <AnimatedBackground />
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        
        {/* Bouton retour hors du header - fixe en haut */}
      {currentPage !== 'accueil' && (
        <div
          className="back-button-container"
          style={{
            position: 'sticky',
            top: '80px', // hauteur du header pour que le bouton reste juste en dessous
            marginLeft: '20px',
            zIndex: 50,
          }}
        >
          <button
            onClick={handleBackClick}
            className="btn-back"
            style={{
              fontSize: '16px',
              padding: '10px 25px',
            }}
          >
            ← Retour
          </button>
        </div>
      )}
        
        <main style={{ position: 'relative', zIndex: 10 }}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </>
  );
}