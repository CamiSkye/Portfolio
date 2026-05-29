import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useMediaQuery';
import '../styles/navigation.css';

function LangSwitcher({
  mobile = false,
  currentLang,
  onChange,
}: {
  mobile?: boolean;
  currentLang: string;
  onChange: (lang: 'fr' | 'en') => void;
}) {
  return (
    <div className="lang-switcher">
      {(['fr', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`lang-btn ${mobile ? 'lang-btn--mobile' : ''} ${currentLang === lang ? 'lang-btn--active' : ''}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation('common');

  const currentPage = location.pathname.replace('/', '') || 'accueil';
  const currentLang = i18n.language;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handlePageChange = (page: string) => {
    navigate(`/${page === 'accueil' ? '' : page}`);
    setIsMobileMenuOpen(false);
  };

  const handleScrollToSection = (id: string) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.projects_info'), action: () => handleScrollToSection('informatique') },
    { label: t('nav.communication'), action: () => handleScrollToSection('communication') },
    { label: t('nav.mini_game'), action: () => handleScrollToSection('minijeu') },
    { label: t('nav.cv'), action: () => handlePageChange('cv') },
    { label: t('nav.contact'), action: () => handlePageChange('contact') },
  ];

  const isActive = (label: string) =>
    (label === t('nav.cv') && currentPage === 'cv') ||
    (label === t('nav.contact') && currentPage === 'contact');

  return (
    <header className="nav-header">
      {/* ── BLOC GAUCHE : Logo ── */}
      <div className="nav-logo" onClick={() => handlePageChange('accueil')}>
        <div className="nav-logo-badge">CL</div>
        <span className="nav-logo-title">{t('nav.title')}</span>
      </div>

      {/* ── BLOC DROIT : Menu desktop ── */}
      {!isMobile && (
        <div className="nav-desktop-wrapper">
          <nav>
            <div className="nav-links-list">
              {navLinks.map(({ label, action }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    action();
                  }}
                  className={`nav-link ${isActive(label) ? 'nav-link--active' : ''}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
          <LangSwitcher currentLang={currentLang} onChange={(lang) => i18n.changeLanguage(lang)} />
        </div>
      )}

      {/* ── BLOC DROIT : Burger mobile ── */}
      {isMobile && (
        <div className="nav-mobile-wrapper">
          <LangSwitcher
            mobile
            currentLang={currentLang}
            onChange={(lang) => i18n.changeLanguage(lang)}
          />
          <button onClick={toggleMobileMenu} className="nav-burger">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      )}

      {/* ── Menu mobile déroulant ── */}
      {isMobileMenuOpen && (
        <div className="nav-mobile-menu">
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className={`nav-mobile-btn ${isActive(label) ? 'nav-mobile-btn--active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
