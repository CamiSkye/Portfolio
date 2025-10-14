import { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleScrollToSection = (id: string) => {
    if (currentPage === 'accueil') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onPageChange('accueil');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    setIsMobileMenuOpen(false);
  };

  const mobileBtn = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    textAlign: 'left' as const,
    padding: '10px 0',
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  return (
    <header
      style={{
        padding: '15px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Logo / Titre à gauche */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '4px' : '0',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 600 }}>Camille LACROIX - Développeuse Full-Stack</span>
      </div>

      {/* Menu desktop à droite */}
      {!isMobile && (
        <nav>
          <div style={{ display: 'flex', gap: '24px' }}>
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
              Mini-Jeu
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
        </nav>
      )}

      {/* Hamburger mobile à droite */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Menu mobile en dessous du header */}
      {isMobileMenuOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            marginTop: '16px',
            background: 'rgba(0,0,0,0.95)',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <button onClick={() => handleScrollToSection('informatique')} style={mobileBtn}>
            Projets Info
          </button>
          <button onClick={() => handleScrollToSection('communication')} style={mobileBtn}>
            Communication
          </button>
          <button onClick={() => handleScrollToSection('minijeu')} style={mobileBtn}>
            Mini-Jeu
          </button>
          <button onClick={() => handlePageChange('cv')} style={mobileBtn}>
            CV
          </button>
          <button onClick={() => handlePageChange('contact')} style={mobileBtn}>
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
