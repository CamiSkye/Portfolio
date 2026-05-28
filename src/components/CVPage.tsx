import affichePdf from '../assets/affichesensibilisation.pdf';
import cvPdf from '../assets/CV_Camille_LACROIX.pdf';
import "../styles/print.css";
import { CVPrint } from './CVPrint';

export function CVPage() {
  return (
    <>
      <main>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          fontSize: '3rem',
          fontWeight: '300',
          letterSpacing: '2px'
        }}>
          Mon CV
        </h1>
        
        <div className="cv-container">
          <div className="experiences">
            <h2>EXPÉRIENCES</h2>
            <div className="experience">
              <h3>Stagiaire </h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>HexoTech - Février 2026 à Août 2026</p>
              <ul>
                <li>Création de l'UI/UX d'une application de visualisation de pièce 3D pour ArcelorMittal.</li>
                <li>Création de documentation technique (manuel utilisateur en français et anglais).</li>
                <li>Formation sur l'Intelligence artificielle.</li>
                <li>Apprentissage du python.</li>
              </ul>
            </div>

            <div className="experience">
              <h3>Cheffe de projet - Formation sur les Violences Sexistes et Sexuelles</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>ESIEA - Mars 2025 à Janvier 2026</p>
              <ul>
                <li>Elaboration d'une formation de sensibilisation d'une heure sur le sujet des VSS pour tout âge en présentiel.</li>
                <li>Organisation de deux formations en e-learning.</li>
                <li>Création de support de communication et de sensibilisation : <a href="https://erinyes.fr" target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>erinyes.fr</a></li>
              </ul>
              <a 
                href={affichePdf}
                download="affichesensibilisation.pdf" 
                className="btn-download"
                style={{ marginTop: '15px', display: 'inline-block', textAlign: 'center' }}
              >
                Télécharger l'affiche de sensibilisation
              </a>
            </div>
            
            <div className="experience">
              <h3>Scrum Master - Site de prise de rendez-vous en ligne</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>ESIEA - Mars 2025 à Juillet 2025</p>
              <ul>
                <li>Développement d'une application multi-prestataires.</li>
                <li>Interface Web et WPF.</li>
                <li>Projet avec commanditaire extérieur.</li>
              </ul>
            </div>
            <h2 style={{ marginTop: '20px' }}>FORMATIONS</h2>
            
            <div className="experience">
              <h3>Bachelor Expert en Développement web et mobile</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>Septembre 2023 à Aujourd'hui</p>
              <p style={{ color: '#ccc' }}>Esiea - Ivry-sur-Seine</p><br></br>
              <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                <li>Conception et développement logiciel</li>
                <li>Développement web et bases de données</li>
              </ul>
            </div>
          </div>
          
          <div className="sidebar">
            <section>
              <h2>Profil</h2>
              <ul>
                <li>Mail : clacroix@et.esiea.fr</li>
                <li><a href="https://linkedin.com/in/lacroix-camille" target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>in/lacroix-camille</a></li>
                <li>Lieux : Yvelines/Paris</li>
              </ul>
            </section>

            <section>
              <h2>Compétences techniques</h2>
              <ul>
                <li>Anglais : TOEIC 450/990</li>
                <li>Frontend : HTML, CSS, JS, React, TypeScript</li>
                <li>Backend : PHP, C#, WPF, MySQL, Python</li>
                <li>En apprentissage : JAVA</li>
                <li>Systèmes d'exploitation : Windows, Linux</li>
                <li>Outils : Docker, Grafana</li>
              </ul>
            </section>

            <section>
              <h2>Soft Skills</h2>
              <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                <li>Méthodologie Agile</li>                
                <li>Leadership</li>
                <li>Créativité</li>
                <li>Sens de l'organisation</li>
              </ul>
            </section>

            <section>
              <h2>Centres d'intérêt</h2>
              <ul>
                <li>Création de jeux vidéo</li>
                <li>Lecture/Écriture</li>
                <li>Sport : footing</li>
                <li>Mythologie grecque</li>
              </ul>
            </section>

            <a 
              href={cvPdf}
              download="CV_Camille_LACROIX.pdf" 
              className="btn-download"
              style={{ width: '100%', marginTop: '30px', textAlign: 'center', display: 'inline-block' }}
            >
              Télécharger mon CV
            </a>
          </div>
        </div>
        <CVPrint />
      </main>
    </>
  );
}
