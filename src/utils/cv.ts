export function downloadCV(cvPdf: string): void {
  const link = document.createElement('a');
  link.href = cvPdf;
  link.download = 'CV_Camille_LACROIX.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}