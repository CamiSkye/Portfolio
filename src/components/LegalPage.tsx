import { useTranslation } from 'react-i18next';
import '../styles/legal.css';

export function LegalPage() {
  const { t } = useTranslation('legal');

  const sections = t('sections', { returnObjects: true }) as Record<
    string,
    { title: string; content: string[] }
  >;

  return (
    <div className="legal-page">
      <h1 className="legal-title">{t('title')}</h1>
      <p className="legal-updated">{t('last_updated')}</p>

      {Object.values(sections).map((section, index) => (
        <div key={index} className="legal-section">
          <h2 className="legal-section-title">{section.title}</h2>
          {section.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
