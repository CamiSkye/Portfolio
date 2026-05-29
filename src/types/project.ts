export type MediaItem = {
  type: 'image' | 'video';
  src: string;
};

export type TextContent = {
  type: 'text';
  content: string;
};

export type MixedContent = {
  type: 'mixed';
  content: MediaItem[];
};

export type URLContent = {
  type: 'url';
  content: string;
};

export type ProjectCategory = 'informatique' | 'humaine' | 'minijeu';

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: React.ReactNode;
  image: string;
  poster: string;
  codeUrl: string;
  gameUrl?: string;
  category: ProjectCategory;
  technologies: string[];
  detailsContent: MixedContent | TextContent | URLContent;
}