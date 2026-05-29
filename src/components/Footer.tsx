import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { socialLinks, type SocialLink } from '../data/social';
import '../styles/footer.css';

const iconMap = {
  mail: <Mail size={22} />,
  github: <Github size={22} />,
  linkedin: <Linkedin size={22} />,
};

function SocialIcon({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      target={link.icon === 'mail' ? undefined : '_blank'}
      rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
      aria-label={link.label}
      className="social-icon"
    >
      {iconMap[link.icon]}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-identity">
        <p className="footer-name">Camille LACROIX</p>
        <p className="footer-role">{t('footer.role')}</p>
      </div>

      <div className="footer-separator" />

      <div className="footer-social">
        {socialLinks.map((link) => (
          <SocialIcon key={link.label} link={link} />
        ))}
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} — {t('footer.rights')}
        </p>
        <div className="footer-divider" />
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate('/legal');
          }}
          href="/legal"
          className="footer-legal"
        >
          {t('footer.legal')}
        </a>
      </div>
    </footer>
  );
}
