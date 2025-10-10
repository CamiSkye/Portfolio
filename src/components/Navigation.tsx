import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  // ✅ On ajoute une fonction pour scroller dans la page "Projets"
  const handleScrollToSection = (id: string) => {
    if (currentPage === 'accueil') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si on n'est pas sur la page "Projets", on y va d'abord
      onPageChange('accueil');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          padding: '15px 40px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo/Nom */}
        <h1
          className="site-name"
          style={{ cursor: 'pointer', color: 'white' }}
          onClick={() => handlePageChange('accueil')}
        >
          Camille LACROIX - Développeuse Full-Stack
        </h1>

        {/* Menu desktop */}
        <div style={{ display: window.innerWidth >= 768 ? 'block' : 'none' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '24px' }}>
            <a
              href="#informatique"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('informatique');
              }}
              style={{ color: '#fff' }}
            >
              Projets Info
            </a>
            <a
              href="#communication"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('communication');
              }}
              style={{ color: '#fff' }}
            >
              Communication
            </a>
            <a
              href="#minijeu"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('minijeu');
              }}
              style={{ color: '#fff' }}
            >
              Mini-Jeux
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange('cv');
              }}
              style={{ color: currentPage === 'cv' ? '#3b82f6' : '#fff' }}
            >
              CV
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange('contact');
              }}
              style={{ color: currentPage === 'contact' ? '#3b82f6' : '#fff' }}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bouton hamburger mobile */}
        <div style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}>
          <button
            onClick={toggleMobileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div
            style={{
              display: 'block',
              width: '100%',
              marginTop: '16px',
              background: 'rgba(0,0,0,0.9)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => handleScrollToSection('informatique')} style={mobileBtn}>Projets Info</button>
              <button onClick={() => handleScrollToSection('communication')} style={mobileBtn}>Communication</button>
              <button onClick={() => handleScrollToSection('minijeu')} style={mobileBtn}>Mini-Jeux</button>
              <button onClick={() => handlePageChange('cv')} style={mobileBtn}>CV</button>
              <button onClick={() => handlePageChange('contact')} style={mobileBtn}>Contact</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}