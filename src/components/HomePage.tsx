import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback'
import Me from '../assets/AboutMe.png';
import calendarImage from '../assets/skyndar.png';
import massageImage from '../assets/softrelax.png';
import shootingGameImage from '../assets/tir.png';
import vss from '../assets/vss.png';
import cvPdf from '../assets/CV_Camille_LACROIX.pdf';
import AfficheSkyndar from '../assets/AfficheSkyndar.png';
import Sensibilisation from '../assets/AfficheErinyes.png';
import Relax from '../assets/AfficheRelax.png'
import SkyndarVideo from '../assets/Skyndar_Video.mp4';
import Form1 from '../assets/formation_1.png'
import Form2 from '../assets/formation_2.png'
import Form3 from '../assets/formation_3.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ExternalLink, Github, Image as ImageIcon, Eye } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  poster: string;
  codeUrl: string;
  gameUrl?: string;
  category: 'informatique' | 'humaine' | 'minijeu';
  technologies: string[];
  detailsContent: {
    type: 'mixed';
    content: Array <{type: 'image'| 'video'; src: string}>;
  };
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [currentPoster, setCurrentPoster] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

const projects: Project[] = [
    // Projets informatiques
    {
      id: 1,
      title: "Skyndar",
      shortDescription: "Logiciel de gestion de rendez-vous",
      fullDescription: "Skyndar est une application complète de prise de rendez-vous développée en C# et WPF. Les utilisateurs choisissent un créneau disponible, en présentiel, visio ou par téléphone via un site web. L'administrateur, via un logiciel, gère ses disponibilités, reçoit les réservations sur sa boîte mail, peut ajouter, modifier ou supprimer des prestations. Il peut tout contrôler.",
      image: calendarImage,
      poster: AfficheSkyndar,
      codeUrl: "https://github.com/CamiSkye/skyndar",
      category: 'informatique',
      technologies: ['C#', 'WPF', 'PHP', 'CSS', 'HTML', 'SQL', 'Srum Master', 'Adaptabilité'],
      detailsContent: {
        type: 'mixed',
        content: [
          {type: 'video', src: SkyndarVideo}
        ]
      }
    },
    {
      id: 2,
      title: "Soft Relax",
      shortDescription: "Site vitrine pour entreprise de bien-être",
      fullDescription: "Soft Relax est un site web professionnel développé pour une entreprise spécialisée dans les massages et le bien-être. Il présente l'ensemble des services proposés, permet aux clients de prendre contact facilement via un formulaire intégré, et offre une expérience visuelle apaisante en accord avec l'identité de l'entreprise.",
      image: massageImage,
      poster: Relax,
      codeUrl: "https://github.com/CamiSkye/SoftRelax",
      category: 'informatique',
      technologies: ['HTML', 'CSS', 'PHP', 'MySQL', 'Feedback', 'Esprit critique'],
      detailsContent: {
        type: 'text',
        content: "Le site a été développé avec une attention particulière portée à l'expérience utilisateur et à l'accessibilité. Il intègre des animations douces, un design responsive pour tous les appareils, et un système de formulaire de contact optimisé. Le design met en avant la sérénité et le professionnalisme de l'entreprise."
      }
    },
    // Projet humain
    {
      id: 4,
      title: "Les Erinyes",
      shortDescription: "Violences Sexistes et Sexuelles",
      fullDescription: "Le projet VSS consistait en une formation de sensibilisation visant à mieux comprendre les enjeux et impacts des VSS. Dans ce cadre, nous avons réalisé un état des lieux détaillé, rassemblant chiffres, statistiques et conséquences liées au sujet, afin de donner une vision claire et complète. Parallèlement, nous avons développé des supports de communication variés, notamment de nombreuses affiches, destinées à sensibiliser un large public et à diffuser les informations de manière accessible et percutante. Ce projet a ainsi combiné analyse, création et diffusion pour maximiser l’impact de la sensibilisation.",
      image: vss,
      poster: Sensibilisation,
      codeUrl: "",
      category: 'humaine',
      technologies: [ 'Leadership', 'Communication', 'Sens du collectif', 'Créativité', 'Assertivité'],
      detailsContent: {
        type: 'mixed',
        content: [
              { type: 'image', src: Form1 },
              { type: 'image', src: Form2 },
              { type: 'image', src: Form3 },
        ]
      }
    },
    // Mini jeux
    {
      id: 3,
      title: "Jeu de tir",
      shortDescription: "Jeu de tir 2D arcade",
      fullDescription: "Un jeu de tir en 2D développé en C# avec une interface graphique en JavaScript et CSS. Le joueur doit affronter des vagues d'ennemis avec un système de score, de power-ups, et différents niveaux de difficulté. Le jeu propose des graphismes rétro et une jouabilité dynamique.",
      image: shootingGameImage,
      poster: "https://images.unsplash.com/photo-1745223676002-b881b2a19089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjByZXRybyUyMHBvc3RlcnxlbnwxfHx8fDE3NjAwMDE3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      codeUrl: "https://github.com/CamiSkye/Jeu-de-tir",
      gameUrl: '../../game/tir/index.html',
      category: 'minijeu',
      technologies: ['C#', 'JavaScript', 'CSS', 'Canvas API'],
      detailsContent: {
        type: 'text',
        content: "Ce jeu a été développé comme projet personnel pour explorer les mécaniques de jeu et l'animation canvas. Il inclut un système de collision optimisé, des effets de particules, et une bande sonore rétro. Le code est modulaire et facilement extensible pour ajouter de nouveaux ennemis ou power-ups."
      }
    }
  ];

   const projectsByCategory = {
    informatique: projects.filter(p => p.category === 'informatique'),
    humaine: projects.filter(p => p.category === 'humaine'),
    minijeu: projects.filter(p => p.category === 'minijeu')
  };

  const handleOpenPoster = (posterUrl: string) => {
    setCurrentPoster(posterUrl);
    setShowPoster(true);
  };

  const renderProjectCard = (project: Project) => (
    <div key={project.id} className="project-card-new">
      <div className="project-card-image">
        <img src={project.image} alt={project.title} />
      </div>
      
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-short-desc">{project.shortDescription}</p>
        <p className="project-card-full-desc">{project.fullDescription}</p>
        
        <div className="project-card-tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>
        
        <div className="project-card-buttons">
          {/* Projets informatiques : View, Git, Affiche */}
          {project.category === 'informatique' && (
            <>
            <button 
              onClick={() => {
                setSelectedProject(project);
                setCurrentMediaIndex(0);
              }}
              className="project-btn project-btn-view"
            >
              <Eye size={18} />
              View
            </button>
              <a 
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-git"
              >
                <Github size={18} />
                Git
              </a>
              <button 
                onClick={() => handleOpenPoster(project.poster)}
                className="project-btn project-btn-poster"
              >
                <ImageIcon size={18} />
                Affiche
              </button>
            </>
          )}
          
          {/* Projets humains : View, Affiche (Git optionnel) */}
          {project.category === 'humaine' && (
            <>
              <button 
                onClick={() => setSelectedProject(project)}
                className="project-btn project-btn-view"
              >
                <Eye size={18} />
                View
              </button>
              <button 
                onClick={() => handleOpenPoster(project.poster)}
                className="project-btn project-btn-poster"
              >
                <ImageIcon size={18} />
                Affiche
              </button>
            </>
          )}
          
          {/* Mini jeux : Git, Jouer */}
          {project.category === 'minijeu' && (
            <>
              <a 
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-git"
              >
                <Github size={18} />
                Git
              </a>
              {project.gameUrl && (
                <button 
                  onClick={() => handleOpenGame(project.gameUrl!)}
                  className="project-btn project-btn-play"
                >
                  <ExternalLink size={18} />
                  Jouer
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );


return (
    <>
      {/* Section À propos de moi */}
      <section className="about-section">
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '50px'
        }}>
          Camille LACROIX
        </h1>
        
        <div className="about-content">
          <div className="about-text">
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.8', 
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              Je suis passionnée par le développement logiciel et le design d’interfaces.
            J’adore transformer des idées en solutions innovantes et intuitives qui facilitent la vie des utilisateurs.
            Sérieuse, audacieuse et toujours avide de défis, je cherche constamment à apprendre et à repousser mes limites à travers des projets variés. Dynamique et engagée, je m’implique pleinement dans chaque mission pour apporter des résultats concrets et créer une vraie valeur pour l’équipe.
            </p>         
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              marginBottom: '30px',
              textAlign: 'left',
            }}>
             J’aime mêler technique et créativité, suivre les tendances et expérimenter de nouvelles approches pour concevoir des expériences à la fois fonctionnelles, esthétiques et impactantes.
            Ce portfolio reflète mon parcours, mes réalisations et mon enthousiasme à continuer d’innover et de grandir dans mon métier.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Télécharger mon CV
              </button>
            </div>
          </div>
          
          <div className="about-image">
            <ImageWithFallback
              src= {Me}
              alt="Portrait professionnel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Section Projets Informatiques */}
      <section className="projects-section">
        <h2 className="section-title">Projets Informatiques</h2>
        <div className="projects-grid">
          {projectsByCategory.informatique.map(renderProjectCard)}
        </div>
      </section>

      {/* Section Projets Humains */}
      {projectsByCategory.humaine.length > 0 && (
        <section className="projects-section">
          <h2 className="section-title">Projets de Communication</h2>
          <div className="projects-grid">
            {projectsByCategory.humaine.map(renderProjectCard)}
          </div>
        </section>
      )}

      {/* Section Mini Jeux */}
      {projectsByCategory.minijeu.length > 0 && (
        <section className="projects-section">
          <h2 className="section-title">Mini Jeux</h2>
          <div className="projects-grid">
            {projectsByCategory.minijeu.map(renderProjectCard)}
          </div>
        </section>
      )}

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
        <h2 style={{ 
          fontSize: '2.8rem', 
          fontWeight: 'bold', 
          marginBottom: '20px'
        }}>
          Contactez-moi
        </h2>
        <p style={{ 
          fontSize: '1.2rem',
          color: '#ccc',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Je suis toujours partante pour discuter de nouveaux projets ou d'opportunités d'alternance !
        </p>
        
        <button 
          onClick={() => onPageChange('contact')}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Me contacter
        </button>
      </section>

      {/* Dialog pour les détails du projet */}
 <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
      <DialogDescription>
        {selectedProject?.shortDescription}
      </DialogDescription>
    </DialogHeader>

    <div className="mt-4 space-y-4">
      {/* Gestion des médias */}
      {['image', 'video', 'mixed'].includes(selectedProject?.detailsContent.type || '') && Array.isArray(selectedProject?.detailsContent.content) && (
        <div className="media-modal relative">
        {selectedProject.detailsContent.content[currentMediaIndex].type === 'image' ? (
          <img
            src={selectedProject.detailsContent.content[currentMediaIndex].src}
            alt={selectedProject.title}
            style={{
              width: '100%',       // occupe toute la largeur du modal
              height: 'auto',      // garde les proportions originales
              borderRadius: '12px',
              display: 'block',
              margin: '0 auto'
            }}
          />
        ) : (
          <video
            src={selectedProject.detailsContent.content[currentMediaIndex].src}
            controls
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              display: 'block',
              margin: '0 auto'
            }}
          />
        )}

          {selectedProject.detailsContent.content.length > 1 && (
            <>
              <button
                onClick={() => setCurrentMediaIndex((prev) => (prev - 1 + selectedProject.detailsContent.content.length) % selectedProject.detailsContent.content.length)}
                style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}
              >
                ←
              </button>
              <button
                onClick={() => setCurrentMediaIndex((prev) => (prev + 1) % selectedProject.detailsContent.content.length)}
                style={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}
              >
                →
              </button>
            </>
          )}
        </div>
      )}

      {/* Afficher la description complète, technologies et liens uniquement si ce n’est pas un média */}
      {selectedProject?.detailsContent.type === 'text' && (
        <>
          <div className="bg-white/5 p-6 rounded-lg">
            <p className="text-white/90 leading-relaxed">
              {selectedProject?.detailsContent.content}
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg">
            <h4 className="mb-3 font-semibold">Description complète</h4>
            <p className="text-white/80 leading-relaxed">
              {selectedProject?.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Technologies utilisées</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject?.technologies.map((tech, index) => (
                <span key={index} className="tech-badge-large">{tech}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {selectedProject?.codeUrl && (
              <a
                href={selectedProject.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:opacity-80 transition-opacity"
              >
                <Github size={20} />
                Voir le code
              </a>
            )}

            {selectedProject?.gameUrl && (
              <a
                href={selectedProject.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg hover:opacity-80 transition-opacity"
              >
                <ExternalLink size={20} />
                Jouer
              </a>
            )}
          </div>
        </>
      )}
    </div>
  </DialogContent>
</Dialog>

      {/* Dialog pour l'affiche */}
      <Dialog open={showPoster} onOpenChange={setShowPoster}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Affiche du projet</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ImageWithFallback
              src={currentPoster}
              alt="Affiche du projet"
              style={{
                width: '100%',
                borderRadius: '12px',
                maxHeight: '80vh',
                objectFit: 'contain'
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
