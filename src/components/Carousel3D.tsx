import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Carousel3DProps {
  children: React.ReactNode[];
}

export function Carousel3D({ children }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = children.length;

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = totalItems - 1;
      if (nextIndex >= totalItems) nextIndex = 0;
      return nextIndex;
    });
  };

  // Calculer la position et la transformation pour chaque carte
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const absoluteDiff = Math.abs(diff);
    
    // Position en cercle
    let position = diff;
    if (diff > totalItems / 2) position = diff - totalItems;
    if (diff < -totalItems / 2) position = diff + totalItems;

    // Calculer les transformations
    const rotateY = position * 45; // Rotation en Y pour l'effet 3D
    const translateX = position * 350; // Espacement horizontal
    const translateZ = -absoluteDiff * 300; // Profondeur
    const scale = absoluteDiff === 0 ? 1 : Math.max(0.6, 1 - absoluteDiff * 0.2);
    const opacity = absoluteDiff > 2 ? 0 : Math.max(0.3, 1 - absoluteDiff * 0.3);
    const zIndex = totalItems - absoluteDiff;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  if (children.length === 0) return null;

  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d-wrapper">
        {/* Bouton précédent */}
        <button
          className="carousel-nav-btn carousel-nav-prev"
          onClick={() => paginate(-1)}
          aria-label="Projet précédent"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Zone du carousel avec perspective */}
        <div className="carousel-3d-viewport">
          <div className="carousel-3d-stage">
            {children.map((child, index) => (
              <motion.div
                key={index}
                className={`carousel-3d-card ${index === currentIndex ? '' : 'no-click'}`}
                style={getCardStyle(index)}
                animate={getCardStyle(index)}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => {
                  if (index !== currentIndex) {
                    const diff = index - currentIndex;
                    if (Math.abs(diff) > totalItems / 2) {
                      paginate(diff > 0 ? -1 : 1);
                    } else {
                      paginate(diff > 0 ? 1 : -1);
                    }
                  }
                }}
              >
                {child}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bouton suivant */}
        <button
          className="carousel-nav-btn carousel-nav-next"
          onClick={() => paginate(1)}
          aria-label="Projet suivant"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Indicateurs */}
      <div className="carousel-indicators">
        {children.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              const diff = index - currentIndex;
              if (Math.abs(diff) > totalItems / 2) {
                paginate(diff > 0 ? -1 : 1);
              } else {
                paginate(diff > 0 ? 1 : -1);
              }
            }}
            aria-label={`Aller au projet ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}