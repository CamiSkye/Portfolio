import { useTranslation } from 'react-i18next';

import Sensibilisation from '../assets/AfficheErinyes.jpg';
import Relax from '../assets/AfficheRelax.jpg';
import AfficheSkyndar from '../assets/AfficheSkyndar.jpg';
import Folio1 from '../assets/folio_1.jpg';
import Folio2 from '../assets/folio_2.jpg';
import Folio3 from '../assets/folio_3.jpg';
import Form1 from '../assets/formation_1.jpg';
import Form2 from '../assets/formation_2.jpg';
import Form3 from '../assets/formation_3.jpg';
import logo from '../assets/logo.png';
import erinyes from '../assets/Logo_Erinyes.png';
import nemesis from '../assets/nemesis.png';
import calendarImage from '../assets/skyndar.jpg';
import SkyndarVideo from '../assets/Skyndar_Video.mp4';
import massageImage from '../assets/softrelax.jpg';
import shootingGameImage from '../assets/tir.jpg';
import vss from '../assets/vss.jpg';
import type { Project } from '../types/project';

export const SOFT_SKILLS = [
  'Leadership',
  'Communication',
  'Autonomie',
  'Créativité',
  'Adaptabilité',
  'Assertivité',
  'FeedBack',
  'Sens du collectif',
  'Sensibilisation',
  'Esprit critique',
  'Scrum Master',
];

export function useProjects() {
  const { t } = useTranslation('home');

  const projects: Project[] = [
    // ─── Projets informatiques ───────────────────────────────────────────────
    {
      id: 5,
      title: t('projects.erinyes_info.title'),
      shortDescription: t('projects.erinyes_info.short'),
      fullDescription: t('projects.erinyes_info.full'),
      image: erinyes,
      poster: Sensibilisation,
      codeUrl: 'https://github.com/CamiSkye/erinyes',
      category: 'informatique',
      technologies: ['HTML', 'CSS', 'React', 'Autonomie', 'Créativité', 'FeedBack', 'Leadership'],
      detailsContent: { type: 'url', content: 'https://erinyes.fr' },
    },
    {
      id: 1,
      title: t('projects.skyndar.title'),
      shortDescription: t('projects.skyndar.short'),
      fullDescription: t('projects.skyndar.full'),
      image: calendarImage,
      poster: AfficheSkyndar,
      codeUrl: 'https://github.com/CamiSkye/skyndar',
      category: 'informatique',
      technologies: ['C#', 'WPF', 'PHP', 'CSS', 'HTML', 'SQL', 'Scrum Master', 'Adaptabilité'],
      detailsContent: { type: 'mixed', content: [{ type: 'video', src: SkyndarVideo }] },
    },
    {
      id: 2,
      title: t('projects.softrelax.title'),
      shortDescription: t('projects.softrelax.short'),
      fullDescription: t('projects.softrelax.full'),
      image: massageImage,
      poster: Relax,
      codeUrl: 'https://github.com/CamiSkye/SoftRelax',
      category: 'informatique',
      technologies: ['HTML', 'CSS', 'PHP', 'MySQL', 'FeedBack', 'Esprit critique'],
      detailsContent: { type: 'text', content: t('projects.softrelax.full') },
    },
    {
      id: 6,
      title: t('projects.portfolio.title'),
      shortDescription: t('projects.portfolio.short'),
      fullDescription: t('projects.portfolio.full'),
      image: logo,
      poster: '',
      codeUrl: 'https://github.com/CamiSkye/Portfolio',
      category: 'informatique',
      technologies: ['HTML', 'CSS', 'JS', 'React', 'Autonomie', 'Créativité'],
      detailsContent: {
        type: 'mixed',
        content: [
          { type: 'image', src: Folio1 },
          { type: 'image', src: Folio2 },
          { type: 'image', src: Folio3 },
        ],
      },
    },

    // ─── Projets humains ─────────────────────────────────────────────────────
    {
      id: 4,
      title: t('projects.nemesis.title'),
      shortDescription: t('projects.nemesis.short'),
      fullDescription: t('projects.nemesis.full'),
      image: vss,
      poster: nemesis,
      codeUrl: '',
      category: 'humaine',
      technologies: [
        'Leadership',
        'Communication',
        'Sens du collectif',
        'Créativité',
        'Assertivité',
      ],
      detailsContent: {
        type: 'mixed',
        content: [
          { type: 'image', src: Form1 },
          { type: 'image', src: Form2 },
          { type: 'image', src: Form3 },
        ],
      },
    },
    {
      id: 7,
      title: t('projects.erinyes_humain.title'),
      shortDescription: t('projects.erinyes_humain.short'),
      fullDescription: t('projects.erinyes_humain.full'),
      image: erinyes,
      poster: Sensibilisation,
      codeUrl: '',
      category: 'humaine',
      technologies: ['Leadership', 'Sensibilisation', 'Sens du collectif', 'Créativité'],
      detailsContent: {
        type: 'mixed',
        content: [
          { type: 'image', src: Form1 },
          { type: 'image', src: Form2 },
          { type: 'image', src: Form3 },
        ],
      },
    },

    // ─── Mini jeux ───────────────────────────────────────────────────────────
    {
      id: 3,
      title: t('projects.shooting_game.title'),
      shortDescription: t('projects.shooting_game.short'),
      fullDescription: t('projects.shooting_game.full'),
      image: shootingGameImage,
      poster:
        'https://images.unsplash.com/photo-1745223676002-b881b2a19089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjByZXRybyUyMHBvc3RlcnxlbnwxfHx8fDE3NjAwMDE3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      codeUrl: 'https://github.com/CamiSkye/Jeu-de-tir',
      gameUrl: '../../game/tir/index.html',
      category: 'minijeu',
      technologies: ['HTML', 'JavaScript', 'CSS', 'Canvas API'],
      detailsContent: { type: 'text', content: t('projects.shooting_game.full') },
    },
  ];

  const projectsByCategory = {
    informatique: projects.filter((p) => p.category === 'informatique'),
    humaine: projects.filter((p) => p.category === 'humaine'),
    minijeu: projects.filter((p) => p.category === 'minijeu'),
  };

  return { projects, projectsByCategory };
}
