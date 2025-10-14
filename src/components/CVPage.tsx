import affichePdf from '../assets/affichesensibilisation.pdf';
import cvPdf from '../assets/CV_Camille_LACROIX.pdf';
import "../styles/print.css";

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
          {/* Partie gauche - Expériences */}
          <div className="experiences">
            <h2>EXPÉRIENCES</h2>
            <div className="experience">
              <h3>Cheffe de projet - Formation sur les Violences Sexistes et Sexuelles</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>ESIEA - Mars 2025 à Janvier 2026</p>
              <ul>
                <li>Elaboration d'une formation de sensibilisation d'une heure sur le sujet des VSS pour tout âge en présentiel.</li>
                <li>Organisation de deux formations en e-learning.</li>
                <li>Création de support de communication et de sensibilisation.</li>
              </ul>

              {/* Bouton téléchargement affiche */}
              <a 
                href={affichePdf}
                download="affichesensibilisation.pdf" 
                className="btn-download"
                style={{ marginTop: '15px', display: 'inline-block', textAlign: 'center' }}
              >
                Télécharger l’affiche de sensibilisation
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


            <div className="experience">
              <h3>Cheffe de projet - Site Web dans le massage professionnel</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>ESIEA - Octobre 2024 à Février 2025</p>
              <ul>
                <li>Conception d'un site web pour une entreprise spécialisé dans le massage en entreprise.</li>
              </ul>
            </div>

            <h2 style={{ marginTop: '20px' }}>FORMATIONS</h2>
            
            <div className="experience">
              <h3>Bachelor Expert Ingénierie Logicielle</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>Septembre 2023 à Aujourd'hui</p>
              <p style={{ color: '#ccc' }}>Esiea - Ivry-sur-Seine</p><br></br>
                <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                <li>Conception et développement logiciel</li>
                <li>Développement web et bases de données</li></ul>
            </div>

            <div className="experience">
              <h3>Baccalauréat STI2D</h3>
              <p style={{ color: '#3b82f6', marginBottom: '12px' }}>2022</p>
              <p style={{ color: '#ccc' }}>Lycée les Pierres Vives - Carrières-sur-Seine</p>
            </div>
          </div>

          {/* Partie droite - Sidebar */}
          <div className="sidebar">
            <section>
              <h2>Profil</h2>
              <ul>
                <li>Année de naissance : 2004</li>
                <li>Mail : clacroix@et.esiea.fr</li>
                <li>Lieux : Yvelines/Paris</li>
              </ul>
            </section>

            <section>
              <h2>Compétences techniques</h2>
              <ul>
                <li>Anglais : TOEIC 450/990</li>
                <li>Frontend : HTML, CSS, JS, React</li>
                <li>Backend : PHP, C#, MySQL</li>
                <li>Systèmes d'exploitation : Windows, Linux</li>
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

            {/* Bouton téléchargement CV */}
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
      </main>
    </>
  );
}
