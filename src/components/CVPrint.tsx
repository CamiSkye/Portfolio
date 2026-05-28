// Composant invisible sur le site, visible uniquement à l'impression (Ctrl+P)
// À ajouter dans CVPage : import { CVPrint } from './CVPrint'; puis <CVPrint /> à la fin du <main>

export function CVPrint() {
  return (
    <div className="cv-print-only">

      {/* HEADER */}
      <div className="cvp-header">
        <div className="cvp-header-text">
          <h1 className="cvp-name">Camille <span>LACROIX</span></h1>
          <p className="cvp-subtitle">Étudiante en 3ème année — Bachelor Concepteur et Développeur d'application web et mobile · Développeuse full-stack</p>
          <div className="cvp-badge">⇒ ALTERNANCE 12 MOIS À PARTIR DE SEPTEMBRE 2026</div>
        </div>
      </div>

      {/* BODY */}
      <div className="cvp-body">

        {/* COLONNE GAUCHE */}
        <div className="cvp-main">

          <p className="cvp-intro">
            Étudiante en 3e année du cursus Bachelor Expert en informatique, je recherche une alternance en développement web et mobile. Engagée, autonome, investie et curieuse, je m'adapte rapidement et m'implique pleinement dans les projets qui me sont confiés. Je souhaite évoluer au sein d'une équipe collaborative pour renforcer mes compétences techniques et humaines afin de contribuer activement aux projets de votre entreprise.
          </p>

          <h2 className="cvp-section-title">EXPÉRIENCES</h2>

          <div className="cvp-exp">
            <div className="cvp-exp-header">
              <span className="cvp-role">Stagiaire</span> — <strong>HexoTech</strong>
            </div>
            <div className="cvp-date">Février 2026 → Août 2026</div>
            <ul>
              <li>Création de l'UI/UX d'une application de visualisation de pièce 3D pour ArcelorMittal.</li>
              <li>Création de documentation technique (manuel utilisateur en français et anglais).</li>
              <li>Formation sur l'Intelligence artificielle.</li>
              <li>Apprentissage du python</li>
            </ul>
            <p className="cvp-tags"><strong>Outils :</strong> React, ThreeJS</p>
          </div>

          <div className="cvp-exp">
            <div className="cvp-exp-header">
              <span className="cvp-role">Cheffe de projet</span> — <strong>Formation sur les Violences Sexistes et Sexuelles</strong>
            </div>
            <div className="cvp-date">ESIEA · Mars 2025 → Janvier 2026</div>
            <ul>
              <li>Élaboration d'une formation de sensibilisation d'une heure.</li>
              <li>Organisation de deux formations en e-learning.</li>
              <li>Création de support de communication et de sensibilisation : erinyes.fr</li>
            </ul>
            <p className="cvp-tags"><strong>Soft Skills :</strong> Sens du collectif, pensée stratégique, assertivité</p>
          </div>

          <div className="cvp-exp">
            <div className="cvp-exp-header">
              <span className="cvp-role">Scrum Master</span> — <strong>Site de prise de rendez-vous en ligne</strong>
            </div>
            <div className="cvp-date">ESIEA · Mars → Juillet 2025</div>
            <ul>
              <li>Développement d'une application de prise de rendez-vous multi-prestataires.</li>
              <li>Interface web pour les clients et application WPF pour l'administration, avec gestion des créneaux et notification automatique par e-mail.</li>
            </ul>
            <p className="cvp-tags"><strong>Outils :</strong> PHP, MySQL, JS, C# et WPF &nbsp;·&nbsp; <strong>Soft Skills :</strong> Leadership, résolution des problèmes, méthodes agiles</p>
          </div>

          <h2 className="cvp-section-title">FORMATIONS</h2>

          <div className="cvp-exp">
            <div className="cvp-exp-header"><strong>Bachelor Expert en Développement web et mobile</strong></div>
            <div className="cvp-role-sub">ESIEA — Ivry-sur-Seine</div>
            <div className="cvp-date">Septembre 2023 → Aujourd'hui</div>
            <ul>
              <li>Conception et développement logiciel</li>
              <li>Développement web et bases de données</li>
            </ul>
          </div>

        </div>

        {/* COLONNE DROITE - SIDEBAR */}
        <div className="cvp-sidebar">

          <h3 className="cvp-sidebar-title">Contacts</h3>
          <ul className="cvp-sidebar-list">
            <li>✉ clacroix@et.esiea.fr</li>
            <li>🌐 c-lacroix.fr</li>
            <li>in in/lacroix-camille</li>
            <li>📍 Yvelines / Paris</li>
          </ul>

          <h3 className="cvp-sidebar-title">Compétences</h3>
          <div className="cvp-skill-group">
            <div className="cvp-skill-label">Méthodologie</div>
            <div className="cvp-tags-row"><span className="cvp-tag">Agile</span></div>
          </div>
          <div className="cvp-skill-group">
            <div className="cvp-skill-label">Anglais</div>
            <div className="cvp-skill-value">TOEIC 450/990</div>
          </div>
          <div className="cvp-skill-group">
            <div className="cvp-skill-label">Langages</div>
            <div className="cvp-tags-row">
              <span className="cvp-tag">PHP</span>
              <span className="cvp-tag">C#</span>
              <span className="cvp-tag">WPF</span>
              <span className="cvp-tag">JS</span>
              <span className="cvp-tag">SQL</span>
              <span className="cvp-tag">HTML/CSS</span>
              <span className="cvp-tag">React</span>
              <span className="cvp-tag">TypeScript</span>
              <span className="cvp-tag">Python</span>
              <span className="cvp-tag">JAVA*</span>
            </div>
            <div className="cvp-note">* en apprentissage</div>
          </div>
          <div className="cvp-skill-group">
            <div className="cvp-skill-label">Systèmes</div>
            <div className="cvp-tags-row">
              <span className="cvp-tag">Windows</span>
              <span className="cvp-tag">Linux</span>
            </div>
          </div>
          <div className="cvp-skill-group">
            <div className="cvp-skill-label">Outils</div>
            <div className="cvp-tags-row">
              <span className="cvp-tag">Docker</span>
              <span className="cvp-tag">Grafana</span>
            </div>
          </div>

          <h3 className="cvp-sidebar-title">Soft Skills</h3>
          <ul className="cvp-sidebar-list">
            <li>✓ Leadership</li>
            <li>✓ Sens de l'organisation</li>
            <li>✓ Créativité</li>
          </ul>

          <h3 className="cvp-sidebar-title">Centres d'intérêt</h3>
          <ul className="cvp-sidebar-list">
            <li>✦ Création de jeux vidéo</li>
            <li>✦ Lecture / Écriture</li>
            <li>✦ Sport : Footing</li>
            <li>✦ Mythologie grecque</li>
          </ul>

        </div>
      </div>
    </div>
  );
}