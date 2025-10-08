import { useState } from 'react';
import '/game/tir/index.html';
import calendarImage from '../assets/skyndar.png';
import massageImage from '../assets/softrelax.png';
import shootingGameImage from '../assets/tir.png';
import cvPdf from '../assets/cv.pdf';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [gameUrl, setGameUrl] = useState<string | null>(null);

const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = cvPdf;             // ← URL fournie par Vite
  link.download = 'cv.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

  const handleViewCV = () => {
    onPageChange('cv');
  };

  const handleOpenGame = (url: string) => setGameUrl(url);
  const handleCloseGame = () => setGameUrl(null);

  const projects = [
    {
      id: 1,
      title: "Skyndar",
      description: "Site de prise de rendez-vous en ligne en C# et WPF. Personnalisable selon vos présentations et disponibilités.",
      image: calendarImage,
      isGame: false,
      codeUrl: "https://github.com/CamiSkye/skyndar"
    },
    {
      id: 2,
      title: "Soft Relax",
      description: "Développement d'un site web pour une entreprise de massage, avec contact par mail et présentation des services.",
      image: massageImage,
      isGame: false,
      codeUrl: "https://github.com/CamiSkye/SoftRelax"
    },
    {
      id: 3,
      title: "Jeu de tir",
      description: "Un petit jeu de tir fait en HTML, JavaScript et CSS.",
      image: shootingGameImage,
      isGame: true,
      codeUrl: "https://github.com/CamiSkye/Jeu-de-tir",
      gameUrl: "/game/tir/index.html"
    }
  ];

  return (
    <>
      {/* Section À propos de moi */}
      <section>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
          À propos de moi
        </h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', textAlign: 'left' }}>
            Curieuse et ambitieuse, je souhaite apprendre et développer mes compétences à travers divers 
            projets. Sérieuse, curieuse et motivée, je m'investis dans les missions qui me sont confiées 
            pour progresser rapidement et apporter une réelle valeur ajoutée à l'équipe.
          </p>
          
          <div style={{ textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleViewCV} 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '15px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Voir mon CV
            </button>
            <button 
              onClick={handleDownloadCV}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '15px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Télécharger mon CV
            </button>
          </div>
        </div>
      </section>

      {/* Section Mes projets */}
      <section>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Mes projets
        </h2>
        <p style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto 40px', fontSize: '1.1rem', paddingLeft: '20px' }}>
          Voici plusieurs projets que j'ai codés qui se sont dans des milieux scolaires ou durant mon temps libre. 
          N'hésitez pas à cliquer !
        </p>

        <div className="projects-container">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-buttons">
                  <a 
                    href={project.codeUrl} 
                    className="project-btn-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%', textDecoration: 'none', padding: '12px 16px', borderRadius: '8px', textAlign: 'center', color: '#fff', fontWeight: 'bold', background: 'linear-gradient(45deg, #ff7f50, #ff4da6)', boxShadow: '0 4px 15px rgba(255, 127, 80, 0.4)', transition: 'all 0.3s ease', display: 'block' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(45deg, #ff7f50, #ff4da6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    Voir le code
                  </a>

                  {project.isGame && (
                    <button
                      onClick={() => handleOpenGame(project.gameUrl!)}
                      style={{ width: '100%', marginTop: '10px', padding: '12px 16px', borderRadius: '8px', textAlign: 'center', color: '#fff', fontWeight: 'bold', background: 'linear-gradient(45deg, #4deeea, #9b59b6)', boxShadow: '0 4px 15px rgba(77, 238, 234, 0.4)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(45deg, #4deeea, #9b59b6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      Jouer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal du jeu */}
      {gameUrl && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
          onClick={handleCloseGame}
        >
          <div
            style={{ width: '80%', height: '80%', background: '#fff', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseGame}
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              X
            </button>
            <iframe src={gameUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="Jeu" />
          </div>
        </div>
      )}

      {/* Section Contact */}
      <section style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '20px' }}>Contactez-moi</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Je suis toujours partante pour discuter de nouveaux projets ou d'opportunités de stage ou d'alternance !
        </p>
        <button 
          onClick={() => onPageChange('contact')}
          style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white', padding: '15px 40px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Me contacter
        </button>
      </section>
    </>
  );
}
