import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '../hooks/useCarousel';

interface Carousel3DProps {
  children: React.ReactNode[];
}

export function Carousel3D({ children }: Carousel3DProps) {
  const totalItems = children.length;
  const { currentIndex, paginate, goTo, getCardStyle } = useCarousel(totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d-wrapper">
        <button
          className="carousel-nav-btn carousel-nav-prev"
          onClick={() => paginate(-1)}
          aria-label="Projet précédent"
        >
          <ChevronLeft size={32} />
        </button>
        <div className="carousel-3d-viewport">
          <div className="carousel-3d-stage">
            {children.map((child, index) => (
              <motion.div
                key={index}
                className={`carousel-3d-card ${index === currentIndex ? '' : 'no-click'}`}
                style={getCardStyle(index)}
                animate={getCardStyle(index)}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => {
                  if (index !== currentIndex) goTo(index);
                }}
              >
                {child}
              </motion.div>
            ))}
          </div>
        </div>

        <button
          className="carousel-nav-btn carousel-nav-next"
          onClick={() => paginate(1)}
          aria-label="Projet suivant"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="carousel-indicators">
        {children.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Aller au projet ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
