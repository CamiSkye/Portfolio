import { Linkedin, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import affichePdf from '../assets/affichesensibilisation.pdf';
import cvPdf from '../assets/CV_Camille_LACROIX.pdf';
import '../styles/cv.css';
import '../styles/print.css';
import { CVPrint } from './CVPrint';

const iconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={16} />,
  linkedin: <Linkedin size={16} />,
  location: <MapPin size={16} />,
};

export function CVPage() {
  const { t } = useTranslation('cv');
  const { t: tc } = useTranslation('common');

  const experiences = t('experiences', { returnObjects: true }) as Array<{
    title: string;
    company: string;
    companyUrl: string;
    period: string;
    tasks: string[];
    tags?: string;
    link?: { href: string; label: string };
  }>;

  const formations = t('formations', { returnObjects: true }) as Array<{
    title: string;
    titleUrl: string;
    school: string;
    schoolUrl: string;
    location: string;
    period: string;
    tasks: string[];
  }>;

  const skills = t('skills', { returnObjects: true }) as Array<{
    label: string;
    value?: string;
    tags?: string[];
  }>;

  const softSkills = t('soft_skills', { returnObjects: true }) as string[];
  const interests = t('interests', { returnObjects: true }) as string[];
  const profileLinks = t('profile', { returnObjects: true }) as Array<{
    label: string;
    display: string;
    href?: string;
    icon: string;
  }>;

  return (
    <>
      <main>
        <div className="cv-header">
          <h1 className="cv-page-title">{t('title')}</h1>
          <button className="cv-print-btn" onClick={() => window.print()}>
            🖨️
          </button>
        </div>

        <div className="cv-container">
          {/* ── Expériences & Formations ── */}
          <div className="experiences">
            <h2>{t('sections.experiences')}</h2>

            {experiences.map((exp, index) => (
              <div key={index} className="experience">
                <h3>{exp.title}</h3>
                <p className="cv-company-period">
                  <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="cv-link">
                    {exp.company}
                  </a>{' '}
                  - {exp.period}
                </p>
                <ul className="cv-tasks-list">
                  {exp.tasks.map((task, i) => (
                    <li key={i}>
                      {task}
                      {exp.link && i === exp.tasks.length - 1 && (
                        <>
                          {' '}
                          <a
                            href={exp.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="cv-link"
                          >
                            {exp.link.label}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {exp.tags && <p className="cv-tags">{exp.tags}</p>}
                {index === 1 && (
                  <a
                    href={affichePdf}
                    download="affichesensibilisation.pdf"
                    className="cv-poster-btn"
                  >
                    {tc('buttons.download_poster')}
                  </a>
                )}
              </div>
            ))}

            <h2 className="cv-formations-title">{t('sections.formations')}</h2>

            {formations.map((form, index) => (
              <div key={index} className="experience">
                <h3>
                  <a href={form.titleUrl} target="_blank" rel="noreferrer" className="cv-link">
                    {form.title}
                  </a>
                </h3>
                <p className="cv-company-period">{form.period}</p>
                <p className="cv-school">
                  <a href={form.schoolUrl} target="_blank" rel="noreferrer" className="cv-link">
                    {form.school}
                  </a>{' '}
                  — {form.location}
                </p>
                <br />
                <ul className="cv-formations-list">
                  {form.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Sidebar ── */}
          <div className="sidebar">
            <section>
              <h2>{t('sidebar.profile')}</h2>
              <ul className="cv-profile-list">
                {profileLinks.map((link, i) => (
                  <li key={i} className="cv-profile-item">
                    <span className="cv-profile-icon">{iconMap[link.icon]}</span>
                    {link.href ? (
                      <a
                        href={link.href}
                        target={link.icon === 'mail' ? undefined : '_blank'}
                        rel="noreferrer"
                        className="cv-link"
                      >
                        {link.display}
                      </a>
                    ) : (
                      <span>{link.display}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>{t('sidebar.skills')}</h2>
              <ul>
                {skills.map((skill, i) => (
                  <li key={i}>
                    {skill.label} : {skill.value ?? skill.tags?.join(', ')}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>{t('sidebar.soft_skills')}</h2>
              <ul className="cv-softskills-list">
                {softSkills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>{t('sidebar.interests')}</h2>
              <ul className="cv-interests-list">
                {interests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
            </section>

            <a href={cvPdf} download="CV_Camille_LACROIX.pdf" className="cv-download-btn">
              {tc('buttons.download_cv')}
            </a>
          </div>
        </div>

        <CVPrint />
      </main>
    </>
  );
}
