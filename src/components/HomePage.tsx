import { useState, ReactNode } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import "../styles/GalaxyTitle.css";
import Me from '../assets/AboutMe.png';
import calendarImage from '../assets/skyndar.jpg';
import massageImage from '../assets/softrelax.jpg';
import shootingGameImage from '../assets/tir.jpg';
import vss from '../assets/vss.jpg';
import cvPdf from '../assets/CV_Camille_LACROIX.pdf';
import AfficheSkyndar from '../assets/AfficheSkyndar.jpg';
import Sensibilisation from '../assets/AfficheErinyes.jpg';
import Relax from '../assets/AfficheRelax.jpg';
import SkyndarVideo from '../assets/Skyndar_Video.mp4';
import Form1 from '../assets/formation_1.jpg';
import Form2 from '../assets/formation_2.jpg';
import Form3 from '../assets/formation_3.jpg';
import logo from '../assets/logo.png';
import Folio1 from '../assets/folio_1.jpg';
import Folio2 from '../assets/folio_2.jpg';
import Folio3 from '../assets/folio_3.jpg';
import erinyes from '../assets/Logo_Erinyes.png';
import nemesis from '../assets/nemesis.png';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from './ui/dialog';
import { ExternalLink, Github, Image as ImageIcon, Eye } from 'lucide-react';
import { Carousel3D } from './Carousel3D';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

type MediaItem = {
  type: 'image' | 'video';
  src: string;
};

type TextContent = {
  type: 'text';
  content: string;
};

type MixedContent = {
  type: 'mixed';
  content: MediaItem[];
};

type URLContent = {
  type: 'url';
  content: string;
};


interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: ReactNode;
  image: string;
  poster: string;
  codeUrl: string;
  gameUrl?: string;
  category: 'informatique' | 'humaine' | 'minijeu';
  technologies: string[];
  detailsContent: MixedContent | TextContent | URLContent;
  }

export function HomePage({ onPageChange }: HomePageProps) {
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [currentPoster, setCurrentPoster] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [descriptionProject, setDescriptionProject] = useState<Project | null>(null);

  const isMobile = window.innerWidth <= 768;

const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = cvPdf;          
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
      id: 5,
      title: "Les Erinyes",
      shortDescription: "Site de sensibilisation contre les VSS",
      fullDescription: <p>Erinyes est un site de sensibilisation que j’ai conçu et développé pour lutter contre les violences sexistes et sexuelles (VSS), en rendant accessibles des ressources pédagogiques et des outils concrets pour tous. L’objectif était de créer une plateforme claire, engageante et informative permettant de comprendre l’ampleur des violences, de savoir comment agir en tant que témoin ou victime, et d’accéder rapidement aux aides disponibles.<br /><br />J’ai structuré le contenu autour des chiffres clés récents sur les VSS, accompagnés d’explications compréhensibles pour un large public. Le site inclut également mes supports de formation e-learning, un violentomètre interactif pour aider à repérer les différents degrés de violence, et plusieurs affiches de sensibilisation visuelles que j’ai créées moi-même pour faciliter la prévention. J’y ai aussi intégré une rubrique pratique listant les numéros d’urgence, les structures d’accompagnement et les associations à contacter pour obtenir de l’aide ou orienter quelqu’un dans le besoin.<br /><br />Ce projet m’a permis de combiner design visuel, pédagogie et développement web pour proposer une plateforme utile et accessible, tout en contribuant à une cause sociale majeure qui concerne et affecte un grand nombre de personnes chaque année.</p>,
      image: erinyes,
      poster: Sensibilisation,
      codeUrl: "https://github.com/CamiSkye/erinyes",
      category: 'informatique',
      technologies: ['HTML', 'CSS', 'React', 'Autonomie', 'Créativité', "FeedBack", "Humain"],
      detailsContent: {
        type: 'url',
        content: "https://erinyes.fr"
      }
    },
    {
      id: 1,
      title: "Skyndar",
      shortDescription: "Logiciel de gestion de rendez-vous",
      fullDescription: <p>Skyndar est un logiciel que j’ai développé pour une entreprise, avec une application administrateur en C# / WPF et un site web côté client en PHP / JavaScript. L’objectif était de créer un outil complet et intuitif pour gérer les rendez-vous, côté utilisateur et côté équipe administrative.<br /><br />J’ai conçu l’interface administrateur en MVVM, permettant de gérer les prestations et l’historique client en temps réel, avec mise à jour automatique de la base de données. Côté client, j’ai participé au parcours utilisateur, de la réservation jusqu’à la confirmation, avec une mini-carte et l’envoi automatique de mails. Le module est intégré directement au site via une iframe pour une expérience fluide. <br /><br /> Ce projet m’a permis de combiner développement back-end et front-end, UX/UI et gestion de bases de données, tout en répondant à un besoin réel d’entreprise.</p>,
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
      fullDescription: <p>Soft Relax est un site web professionnel développé pour une entreprise spécialisée dans les massages et le bien-être. Il présente l'ensemble des services proposés, permet aux clients de prendre contact facilement via un formulaire intégré, et offre une expérience visuelle apaisante en accord avec l'identité de l'entreprise. <br /><br /> Chaque utilisateur pouvait créer son compte pour réserver un rendez-vous, tandis que l’administratrice disposait également de son compte pour gérer le contenu du site et apporter ses propres modifications si nécessaire. <br /> <br/> En tant que cheffe de projet, j’ai été en charge de la relation avec le client, de la création des maquettes, de la relecture du code, ainsi que du développement de la partie administration et de la page prestations. J’ai également mis en place le système de confirmation de rendez-vous par e-mail, garantissant une communication fluide entre le client et l’entreprise.</p>,
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

    {
      id: 6,
      title: "PortFolio",
      shortDescription: "Site vitrine pour montrer mes différents projets",
      fullDescription: <p>Mon portfolio est une vitrine de mes compétences en développement web et en design interactif. Il présente l’ensemble de mes projets personnels et professionnels, illustrant ma maîtrise de technologies telles que <strong>React, C#, WPF, PHP/MySQL</strong> et mon sens du design moderne et intuitif. <br /><br /> Chaque projet est décrit en détail, avec des démonstrations interactives et des captures d’écran, permettant aux visiteurs de comprendre le fonctionnement et les choix techniques derrière chaque réalisation. <br /><br /> En tant que développeuse et cheffe de projet de mon propre portfolio, j’ai conçu l’architecture, créé les maquettes, développé les fonctionnalités interactives, et intégré des animations pour offrir une expérience utilisateur fluide et engageante. Le portfolio reflète ma créativité, ma rigueur technique et mon goût pour les interfaces soignées et immersives.</p>,
      image: logo,
      poster: Relax,
      codeUrl: "https://github.com/CamiSkye/Portfolio",
      category: 'informatique',
      technologies: ['HTML', 'CSS', 'JS', 'React', 'Autonomie', 'Créativité'],
      detailsContent: {
        type: 'mixed',
        content: [
              { type: 'image', src: Folio1 },
              { type: 'image', src: Folio2 },
              { type: 'image', src: Folio3 },
        ]
      }
    },

    // Projet humain
    {
      id: 4,
      title: "Nemesis",
      shortDescription: "Violences Sexistes et Sexuelles, partie 1",
      fullDescription: <p>Ce semestre, nous avons travaillé sur un projet profondément humain et porteur de sens : la création d’une formation de sensibilisation aux violences sexistes et sexuelles, dans le cadre d’une démarche RSE.
        En tant que cheffe de projet, j’ai dirigé une équipe investie et curieuse, tout en assurant la relation, la coordination et la cohérence globale du projet.<br /><br />
        Nous avons mené une recherche approfondie (lectures, témoignages, lois, études) pour comprendre ce sujet complexe et le traiter avec justesse.
        Notre objectif : ne pas seulement informer, mais sensibiliser et susciter le dialogue au sein de notre établissement. <br/><br/>
        Le résultat : une formation d’une heure accompagnée d’une affiche percutante, fruit de nombreux essais pour trouver le ton juste — ni trop dur, ni trop lisse.
        Cette initiative a eu un véritable impact, et notre travail est aujourd’hui en cours d’évolution vers une version e-learning pour toucher un public plus large</p>,
      image: vss,
      poster: nemesis,
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
    {
      id: 7,
      title: "Les Erinyes",
      shortDescription: "Violences Sexistes et Sexuelles, partie 2",
      fullDescription: <p>Dans la continuité de cette première phase, nous avons développé deux parcours e-learning complets, chacun composé de cinq modules progressifs. Le premier, la formation initiale, reprend les bases : définitions essentielles, données clés, cadres juridiques et signaux d’alerte — tout ce qu’il faut pour comprendre les VSS et adopter les bons réflexes. Le second, plus spécialisé, approfondit le sujet dans le milieu professionnel : harcèlement au travail, rapports hiérarchiques, culture d’entreprise et devoirs légaux des organisations, afin de mieux outiller les apprenants face à ces situations concrètes.<br /><br /> Au-delà des modules pédagogiques, notre groupe a réalisé une série d’affiches animées diffusées au sein de l’école pour rendre le sujet visible, briser le tabou et maintenir l’attention dans le quotidien. J’ai également conçu un site web de sensibilisation regroupant ressources, outils interactifs et informations pratiques, permettant d’aborder les VSS sous plusieurs formats selon la sensibilité et le rythme de chacun.<br /><br /> Ce chantier m’a permis d’allier recherche, pédagogie, gestion de projet et création numérique, tout en contribuant à un changement tangible au sein de notre établissement et au-delà.</p>,
      image: erinyes,
      poster: Sensibilisation,
      codeUrl: "",
      category: 'humaine',
      technologies: [ 'Leadership', 'Sensibilisation', 'Sens du collectif', 'Créativité'],
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
      fullDescription: "Un jeu de tir en 2D développé en JavaScript avec une interface graphique en CSS. Le joueur doit affronter des vagues d'ennemis (les couronnes) avec un système de score. Le jeu propose des graphismes rétro et une jouabilité dynamique.",
      image: shootingGameImage,
      poster: "https://images.unsplash.com/photo-1745223676002-b881b2a19089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjByZXRybyUyMHBvc3RlcnxlbnwxfHx8fDE3NjAwMDE3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      codeUrl: "https://github.com/CamiSkye/Jeu-de-tir",
      gameUrl: '../../game/tir/index.html',
      category: 'minijeu',
      technologies: ['HTML', 'JavaScript', 'CSS', 'Canvas API'],
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
        <button
          onClick={() => {
            setDescriptionProject(project);
            setShowDescriptionModal(true);
          }}
          className="project-btn project-btn-description"
        >
          Description
        </button>

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
                if (project.detailsContent.type === 'url') {
                  window.open(project.detailsContent.content, '_blank'); // redirection
                } else {
                  setSelectedProject(project); // modal normal
                  setCurrentMediaIndex(0);
                }
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
        <h1 className="title" >
        Camille LACROIX
        </h1>
        
        <div className="about-content">
          <div className="about-text">
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.8', 
              marginBottom: '20px',
              textAlign: 'left'
            }}><br></br>
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
      <section id = "informatique" className="projects-section">
        <h2 className="section-title">Projets Informatiques</h2>
        <div className="projects-wrapper">
        {isMobile ? (
          <div className="projects-grid">
            {projectsByCategory.informatique.map(renderProjectCard)}
          </div>
        ) : (
          <Carousel3D>
            {projectsByCategory.informatique.map(renderProjectCard)}
          </Carousel3D>
        )}
        </div>
        
      </section>

      {/* Section Projets Humains */}
      {projectsByCategory.humaine.length > 0 && (
        <section id = "communication"className="projects-section">
          <h2 className="section-title">Projets de Communication</h2>
          <div className="projects-wrapper">
            <div className="projects-grid">
              {projectsByCategory.humaine.map(renderProjectCard)}
            </div>
          </div>
        </section>
      )}

      {/* Section Mini Jeux */}
      {projectsByCategory.minijeu.length > 0 && (
        <section id ="minijeu" className="projects-section">
          <h2 className="section-title">Mini Jeu</h2>
          <div className="projects-wrapper">
            <div className="projects-grid">
              {projectsByCategory.minijeu.map(renderProjectCard)}
            </div>
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
    <Dialog open={selectedProject !== null} onOpenChange={(open : boolean) => !open && setSelectedProject(null)}>
      <DialogContent
      style={{
          width: '90vw',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: '20px',

          /* Glass */
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',

          /* Subtle glow */
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '30px',
        }}
    >
        
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
              width: '100%',       
              height: 'auto',     
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
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 rounded-lg hover:opacity-80 transition-opacity"
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
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-400 to-purple-500 rounded-lg hover:opacity-80 transition-opacity"
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
          maxWidth: '1200px',
          maxHeight: '80vh',
          objectFit: 'contain',
          borderRadius: '12px',

          /* Glass */
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',

          /* Subtle glow */
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '30px',
        }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Description seule */}
      <Dialog
        open={showDescriptionModal}
        onOpenChange={(open: boolean) => {
          setShowDescriptionModal(open);
          if (!open) setDescriptionProject(null);
        }}
      >
        <DialogContent
          style={{
          width: '80vw',
          maxWidth: '900px',
          maxHeight: '80vh',
          overflow: 'auto',
          borderRadius: '20px',

          /* Glass */
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',

          /* Subtle glow */
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '30px',
        }}
        >
          <DialogHeader
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            paddingBottom: '12px',
            marginBottom: '20px'
          }}>
            <DialogTitle
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                letterSpacing: '1px',
                color: '#9ca8ff',
                WebkitBackgroundClip: 'text'
              }}>{descriptionProject?.title}</DialogTitle>
            <DialogDescription>{descriptionProject?.shortDescription}</DialogDescription>
          </DialogHeader>

          <div style={{ marginTop: '20px', lineHeight: 1.6 }}>
            {descriptionProject?.fullDescription}
          </div>
        </DialogContent>
      </Dialog>
    </>   
  );
}