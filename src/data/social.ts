export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail';
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:clacroix@et.esiea.fr',
    icon: 'mail',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/CamiSkye',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lacroix-camille/',
    icon: 'linkedin',
  },
];
