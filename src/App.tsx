import { useState } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CVPage } from './components/CVPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

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
    <div style={{ minHeight: '100vh' }}>
      <AnimatedBackground />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Bouton retour hors du header */}
      {currentPage !== 'accueil' && (
        <div style={{ 
          padding: '20px 40px 0',
          position: 'relative',
          zIndex: 10
        }}>
          <button 
            onClick={handleBackClick}
            className="btn-back"
            style={{ 
              fontSize: '16px',
              padding: '10px 25px'
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
  );
}