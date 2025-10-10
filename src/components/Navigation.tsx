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



  return (
    <>
      <header style={{ 
        padding: '15px 40px', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Logo/Nom */}
        <h1 
          className="site-name"
          style={{ cursor: 'pointer' }}
          onClick={() => handlePageChange('accueil')}
        >
          Camille LACROIX - Développeuse Full-Stack
        </h1>

        {/* Menu desktop */}
        <div style={{ display: window.innerWidth >= 768 ? 'block' : 'none' }}>
          <div className="nav-links">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handlePageChange('accueil'); }}
              style={{ color: currentPage === 'accueil' ? '#3b82f6' : '#fff' }}
            >
              Projets
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handlePageChange('cv'); }}
              style={{ color: currentPage === 'cv' ? '#3b82f6' : '#fff' }}
            >
              CV
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handlePageChange('contact'); }}
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
              padding: '8px'
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div style={{
            display: 'block',
            width: '100%',
            marginTop: '16px',
            background: 'rgba(0,0,0,0.9)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => handlePageChange('accueil')}
                style={{
                  background: currentPage === 'accueil' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  color: currentPage === 'accueil' ? '#3b82f6' : 'white',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Projets
              </button>
              <button
                onClick={() => handlePageChange('cv')}
                style={{
                  background: currentPage === 'cv' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  color: currentPage === 'cv' ? '#3b82f6' : 'white',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                CV
              </button>
              <button
                onClick={() => handlePageChange('contact')}
                style={{
                  background: currentPage === 'contact' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  color: currentPage === 'contact' ? '#3b82f6' : 'white',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}