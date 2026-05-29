export type Page = 'accueil' | 'cv' | 'contact';

export const PAGES: Record<Page, Page> = {
  accueil: 'accueil',
  cv: 'cv',
  contact: 'contact',
};

export function isValidPage(page: string): page is Page {
  return page in PAGES;
}