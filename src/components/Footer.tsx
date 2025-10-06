import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      padding: '20px 40px',
      fontSize: '17px',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {/* Partie gauche */}
      <div className="footer-left">
        <p style={{ margin: 0, color: '#ccc' }}>
          © {currentYear} Camille LACROIX - Développeuse Full-Stack
        </p>
      </div>

      {/* Partie droite - Réseaux sociaux */}
      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <a
          href="mailto:clacroix@et.esiea.fr"
          aria-label="Email"
          style={{
            display: 'block',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          <Mail size={40} style={{ color: '#999' }} />
        </a>
        
        <a
          href="https://github.com/CamiSkye"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{
            display: 'block',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          <Github size={40} style={{ color: '#999' }} />
        </a>
        
        <a
          href="https://www.linkedin.com/in/lacroix-camille/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{
            display: 'block',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          <Linkedin size={40} style={{ color: '#999' }} />
        </a>
      </div>
    </footer>
  );
}