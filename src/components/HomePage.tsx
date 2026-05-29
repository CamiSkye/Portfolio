import { ExternalLink, Eye, Github, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Me from '../assets/AboutMe.png';
import cvPdf from '../assets/CV_Camille_LACROIX.pdf';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useModal } from '../hooks/useModal';
import { SOFT_SKILLS, useProjects } from '../hooks/useProjects';
import '../styles/GalaxyTitle.css';
import '../styles/homepage.css';
import type { Project } from '../types/project';
import { downloadCV } from '../utils/cv';
import { Carousel3D } from './Carousel3D';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export function HomePage() {
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const projectModal = useModal<Project>();
  const posterModal = useModal<string>();
  const descriptionModal = useModal<Project>();

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation('common');
  const { projectsByCategory } = useProjects();

  const handleDownloadCV = () => downloadCV(cvPdf);
  const handleViewCV = () => navigate('/cv');
  const handleOpenGame = (url: string) => setGameUrl(url);
  const handleCloseGame = () => setGameUrl(null);

  const renderProjectCard = (project: Project) => (
    <div key={project.id} className="project-card-new">
      <div className="project-card-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-short-desc">{project.shortDescription}</p>

        <button
          onClick={() => descriptionModal.open(project)}
          className="project-btn project-btn-description"
        >
          {tc('buttons.description')}
        </button>

        <div className="project-card-tech">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className={`tech-badge ${SOFT_SKILLS.includes(tech) ? 'tech-badge--soft' : 'tech-badge--hard'}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card-buttons">
          {project.category === 'informatique' && (
            <>
              <button
                onClick={() => {
                  if (project.detailsContent.type === 'url') {
                    window.open(project.detailsContent.content, '_blank');
                  } else {
                    projectModal.open(project);
                    setCurrentMediaIndex(0);
                  }
                }}
                className="project-btn project-btn-view"
              >
                <Eye size={18} /> {tc('buttons.view')}
              </button>
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-git"
              >
                <Github size={18} /> {tc('buttons.git')}
              </a>
              {project.poster && (
                <button
                  onClick={() => posterModal.open(project.poster)}
                  className="project-btn project-btn-poster"
                >
                  <ImageIcon size={18} /> {tc('buttons.poster')}
                </button>
              )}
            </>
          )}

          {project.category === 'humaine' && (
            <>
              <button
                onClick={() => projectModal.open(project)}
                className="project-btn project-btn-view"
              >
                <Eye size={18} /> {tc('buttons.view')}
              </button>
              <button
                onClick={() => posterModal.open(project.poster)}
                className="project-btn project-btn-poster"
              >
                <ImageIcon size={18} /> {tc('buttons.poster')}
              </button>
            </>
          )}

          {project.category === 'minijeu' && (
            <>
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn project-btn-git"
              >
                <Github size={18} /> {tc('buttons.git')}
              </a>
              {project.gameUrl && (
                <button
                  onClick={() => handleOpenGame(project.gameUrl!)}
                  className="project-btn project-btn-play"
                >
                  <ExternalLink size={18} /> {tc('buttons.play')}
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
      {/* Section À propos */}
      <section className="about-section">
        <h1 className="title">{t('about.title')}</h1>
        <div className="about-content">
          <div className="about-text">
            <p className="about-bio-large">
              <br />
              {t('about.bio_1')}
            </p>
            <p className="about-bio-small">{t('about.bio_2')}</p>
            <div className="about-buttons">
              <button className="btn-ghost" onClick={handleViewCV}>
                {tc('buttons.view_cv')}
              </button>
              <button className="btn-ghost" onClick={handleDownloadCV}>
                {tc('buttons.download_cv')}
              </button>
            </div>
          </div>
          <div className="about-image">
            <ImageWithFallback src={Me} alt="Portrait professionnel" className="about-portrait" />
          </div>
        </div>
      </section>

      {/* Section Projets Informatiques */}
      <section id="informatique" className="projects-section">
        <h2 className="section-title">{t('sections.dev_projects')}</h2>
        <div className="projects-wrapper">
          {isMobile ? (
            <div className="projects-grid">
              {projectsByCategory.informatique.map(renderProjectCard)}
            </div>
          ) : (
            <Carousel3D>{projectsByCategory.informatique.map(renderProjectCard)}</Carousel3D>
          )}
        </div>
      </section>

      {/* Section Projets Humains */}
      {projectsByCategory.humaine.length > 0 && (
        <section id="communication" className="projects-section">
          <h2 className="section-title">{t('sections.communication')}</h2>
          <div className="projects-wrapper">
            <div className="projects-grid">{projectsByCategory.humaine.map(renderProjectCard)}</div>
          </div>
        </section>
      )}

      {/* Section Mini Jeux */}
      {projectsByCategory.minijeu.length > 0 && (
        <section id="minijeu" className="projects-section">
          <h2 className="section-title">{t('sections.mini_game')}</h2>
          <div className="projects-wrapper">
            <div className="projects-grid">{projectsByCategory.minijeu.map(renderProjectCard)}</div>
          </div>
        </section>
      )}

      {/* Modal du jeu */}
      {gameUrl && (
        <div className="game-modal-overlay" onClick={handleCloseGame}>
          <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseGame} className="game-modal-close">
              X
            </button>
            <iframe src={gameUrl} className="game-modal-iframe" title="Jeu" />
          </div>
        </div>
      )}

      {/* Section Contact */}
      <section className="contact-section">
        <h2 className="contact-title">{t('contact_section.title')}</h2>
        <p className="contact-subtitle">{t('contact_section.subtitle')}</p>
        <button className="btn-ghost" onClick={() => navigate('/contact')}>
          {tc('buttons.contact_me')}
        </button>
      </section>

      {/* Dialog — Détails du projet */}
      <Dialog
        open={projectModal.isOpen}
        onOpenChange={(open: boolean) => !open && projectModal.close()}
      >
        <DialogContent className="dialog-glass dialog-project">
          <DialogHeader>
            <DialogTitle className="text-2xl">{projectModal.data?.title}</DialogTitle>
            <DialogDescription>{projectModal.data?.shortDescription}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {['image', 'video', 'mixed'].includes(projectModal.data?.detailsContent.type || '') &&
              Array.isArray(projectModal.data?.detailsContent.content) && (
                <div className="media-modal relative">
                  {projectModal.data!.detailsContent.content[currentMediaIndex].type === 'image' ? (
                    <img
                      src={projectModal.data!.detailsContent.content[currentMediaIndex].src}
                      alt={projectModal.data!.title}
                      className="media-item"
                    />
                  ) : (
                    <video
                      src={projectModal.data!.detailsContent.content[currentMediaIndex].src}
                      controls
                      className="media-item"
                    />
                  )}
                  {projectModal.data!.detailsContent.content.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentMediaIndex(
                            (prev) =>
                              (prev - 1 + projectModal.data!.detailsContent.content.length) %
                              projectModal.data!.detailsContent.content.length
                          )
                        }
                        className="media-nav media-nav--prev"
                      >
                        ←
                      </button>
                      <button
                        onClick={() =>
                          setCurrentMediaIndex(
                            (prev) => (prev + 1) % projectModal.data!.detailsContent.content.length
                          )
                        }
                        className="media-nav media-nav--next"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
              )}
            {projectModal.data?.detailsContent.type === 'text' && (
              <>
                <div className="bg-white/5 p-6 rounded-lg">
                  <p className="text-white/90 leading-relaxed description-text">
                    {projectModal.data.detailsContent.content}
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h4 className="mb-3 font-semibold">{t('modals.full_description')}</h4>
                  <p className="text-white/80 leading-relaxed description-text">
                    {projectModal.data.fullDescription as string}
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">{t('modals.technologies')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {projectModal.data.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className={`tech-badge-large ${SOFT_SKILLS.includes(tech) ? 'tech-badge--soft' : 'tech-badge--hard'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  {projectModal.data.codeUrl && (
                    <a
                      href={projectModal.data.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <Github size={20} /> {tc('buttons.see_code')}
                    </a>
                  )}
                  {projectModal.data.gameUrl && (
                    <a
                      href={projectModal.data.gameUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-400 to-purple-500 rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink size={20} /> {tc('buttons.play')}
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog — Affiche */}
      <Dialog
        open={posterModal.isOpen}
        onOpenChange={(open: boolean) => !open && posterModal.close()}
      >
        <DialogContent className="dialog-glass dialog-poster">
          <DialogHeader>
            <DialogTitle className="dialog-title-accent">{t('modals.poster_title')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ImageWithFallback
              src={posterModal.data ?? ''}
              alt="Affiche du projet"
              className="poster-image"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog — Description */}
      <Dialog
        open={descriptionModal.isOpen}
        onOpenChange={(open: boolean) => !open && descriptionModal.close()}
      >
        <DialogContent className="dialog-glass dialog-description">
          <DialogHeader className="dialog-header-bordered">
            <DialogTitle className="dialog-title-large">{descriptionModal.data?.title}</DialogTitle>
            <DialogDescription>{descriptionModal.data?.shortDescription}</DialogDescription>
          </DialogHeader>
          <div className="description-body">{descriptionModal.data?.fullDescription as string}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
