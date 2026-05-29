import { useTranslation } from 'react-i18next';

export function CVPrint() {
  const { t } = useTranslation('cv');

  const printData = t('print', { returnObjects: true }) as {
    name: string;
    lastname: string;
    subtitle: string;
    badge: string;
    intro: string;
    contacts_title: string;
    contacts: string[];
    soft_skills_title: string;
    soft_skills: string[];
    interests_title: string;
    interests: string[];
  };

  const experiences = t('experiences', { returnObjects: true }) as Array<{
    title: string;
    company: string;
    period: string;
    tasks: string[];
    tags?: string;
    link?: { href: string; label: string };
  }>;

  const formations = t('formations', { returnObjects: true }) as Array<{
    title: string;
    school: string;
    period: string;
    tasks: string[];
  }>;

  const skills = t('skills', { returnObjects: true }) as Array<{
    label: string;
    value?: string;
    tags?: string[];
  }>;

  return (
    <div className="cv-print-only">
      <div className="cvp-header">
        <div className="cvp-header-text">
          <h1 className="cvp-name">
            {printData.name} <span>{printData.lastname}</span>
          </h1>
          <p className="cvp-subtitle">{printData.subtitle}</p>
          <div className="cvp-badge">{printData.badge}</div>
        </div>
      </div>

      <div className="cvp-body">
        {/* COLONNE GAUCHE */}
        <div className="cvp-main">
          <p className="cvp-intro">{printData.intro}</p>

          <h2 className="cvp-section-title">{t('sections.experiences')}</h2>

          {experiences.map((exp, index) => (
            <div key={index} className="cvp-exp">
              <div className="cvp-exp-header">
                <span className="cvp-role">{exp.title}</span> — <strong>{exp.company}</strong>
              </div>
              <div className="cvp-date">{exp.period}</div>
              <ul>
                {exp.tasks.map((task, i) => (
                  <li key={i}>
                    {task}
                    {exp.link && i === exp.tasks.length - 1 && (
                      <>
                        {' '}
                        <a href={exp.link.href}>{exp.link.label}</a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {exp.tags && <p className="cvp-tags">{exp.tags}</p>}
            </div>
          ))}

          <h2 className="cvp-section-title">{t('sections.formations')}</h2>

          {formations.map((form, index) => (
            <div key={index} className="cvp-exp">
              <div className="cvp-exp-header">
                <strong>{form.title}</strong>
              </div>
              <div className="cvp-role-sub">{form.school}</div>
              <div className="cvp-date">{form.period}</div>
              <ul>
                {form.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cvp-sidebar">
          <h3 className="cvp-sidebar-title">{printData.contacts_title}</h3>
          <ul className="cvp-sidebar-list">
            {printData.contacts.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          <h3 className="cvp-sidebar-title">{t('sidebar.skills')}</h3>
          {skills.map((skill, i) => (
            <div key={i} className="cvp-skill-group">
              <div className="cvp-skill-label">{skill.label}</div>
              {skill.value ? (
                <div className="cvp-skill-value">{skill.value}</div>
              ) : (
                <div className="cvp-tags-row">
                  {skill.tags?.map((tag, j) => (
                    <span key={j} className="cvp-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          <h3 className="cvp-sidebar-title">{printData.soft_skills_title}</h3>
          <ul className="cvp-sidebar-list">
            {printData.soft_skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3 className="cvp-sidebar-title">{printData.interests_title}</h3>
          <ul className="cvp-sidebar-list">
            {printData.interests.map((interest, i) => (
              <li key={i}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
