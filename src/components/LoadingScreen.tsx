import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../styles/loading.css';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Planète Saturne avec étoiles */}
      <div className="loading-planet-wrapper">
        {/* Étoiles scintillantes — styles dynamiques conservés inline */}
        {Array.from({ length: 30 }).map((_, index) => {
          const angle = (index * 360) / 30 + Math.random() * 20;
          const distance = 80 + Math.random() * 70;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const size = Math.random() * 4 + 2;
          const delay = Math.random() * 1.5;
          const duration = 1.5 + Math.random() * 1.5;

          return (
            <motion.div
              key={`star-${index}`}
              className="loading-star"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 1, 1], opacity: [0, 1, 0.3, 1] }}
              transition={{
                scale: { duration: 0.3, delay: 0.3 + delay },
                opacity: {
                  duration,
                  delay: 0.5 + delay,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
              }}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: `0 0 ${size * 3}px rgba(255,255,255,0.8), 0 0 ${size * 6}px rgba(135,206,250,0.4)`,
              }}
            >
              {size > 3 && (
                <>
                  <div className="loading-star-cross-v" style={{ height: `${size * 4}px` }} />
                  <div className="loading-star-cross-h" style={{ width: `${size * 4}px` }} />
                </>
              )}
            </motion.div>
          );
        })}

        {/* Planète */}
        <div className="loading-planet-container">
          <motion.div
            className="loading-ring-back"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          <motion.div
            className="loading-planet-body"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="loading-band loading-band--1" />
            <div className="loading-band loading-band--2" />
            <div className="loading-band loading-band--3" />
          </motion.div>

          <motion.div
            className="loading-ring-front"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="loading-ring-front-inner" />
            <div className="loading-ring-front-border" />
          </motion.div>
        </div>
      </div>

      {/* Texte */}
      <motion.div
        className="loading-name"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        CAMILLE LACROIX
      </motion.div>

      {/* Barre de progression */}
      <motion.div className="loading-progress-track">
        <motion.div
          className="loading-progress-bar"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Sous-titre */}
      <motion.div
        className="loading-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
      >
        Chargement du portfolio...
      </motion.div>
    </motion.div>
  );
}
