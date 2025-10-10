import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 secondes de chargement

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0d1b2a',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px'
      }}
    >
      {/* Planète Saturne avec étoiles scintillantes */}
      <div style={{ position: 'relative', width: '300px', height: '300px' }}>
        {/* Étoiles scintillantes tout autour */}
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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1, 1],
                opacity: [0, 1, 0.3, 1]
              }}
              transition={{ 
                scale: { duration: 0.3, delay: 0.3 + delay },
                opacity: { 
                  duration: duration, 
                  delay: 0.5 + delay, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}
              style={{
                position: 'absolute',
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.8), 0 0 ${size * 6}px rgba(135, 206, 250, 0.4)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Effet croix pour les grandes étoiles */}
              {size > 3 && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '1px',
                    height: `${size * 4}px`,
                    background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), transparent)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${size * 4}px`,
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent)',
                    pointerEvents: 'none'
                  }} />
                </>
              )}
            </motion.div>
          );
        })}

        {/* Planète Saturne avec anneaux derrière */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          zIndex: 2
        }}>
          {/* Anneaux arrière */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotateX(70deg)',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'transparent',
              border: '8px solid transparent',
              borderImage: 'linear-gradient(90deg, rgba(210, 180, 140, 0.4), rgba(245, 222, 179, 0.6), rgba(210, 180, 140, 0.4)) 1',
              boxShadow: '0 0 20px rgba(210, 180, 140, 0.3)',
              zIndex: 1
            }}
          />

          {/* Planète centrale style Saturne */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5deb3 0%, #d2b48c 30%, #c9a66b 60%, #b8986a 100%)',
                boxShadow: '0 0 40px rgba(245, 222, 179, 0.6), inset -15px -15px 30px rgba(0, 0, 0, 0.4), inset 8px 8px 20px rgba(255, 255, 255, 0.3)',
                overflow: 'hidden',
                zIndex: 2
            }}
          >
            {/* Bandes atmosphériques de Saturne */}
            <div style={{
              position: 'absolute',
              top: '30%',
              left: 0,
              right: 0,
              height: '15%',
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1))',
              opacity: 0.5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '12%',
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.08))',
              opacity: 0.6
            }} />
            <div style={{
              position: 'absolute',
              top: '65%',
              left: 0,
              right: 0,
              height: '10%',
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.06))',
              opacity: 0.4
            }} />
          </motion.div>

          {/* Anneaux avant (devant la planète) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotateX(70deg)',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'transparent',
              zIndex: 3,
              clipPath: 'ellipse(50% 50% at 50% 50%)',
              overflow: 'hidden'
            }}
          >
            {/* Anneau intérieur (masquant la partie devant la planète) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: '#0d1b2a'
            }} />
            {/* Bordure des anneaux avant */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              border: '8px solid transparent',
              borderTopColor: 'rgba(210, 180, 140, 0.6)',
              borderLeftColor: 'rgba(245, 222, 179, 0.7)',
              borderRightColor: 'rgba(210, 180, 140, 0.5)',
              boxShadow: '0 -5px 15px rgba(245, 222, 179, 0.4)'
            }} />
          </motion.div>
        </div>
      </div>

      {/* Texte de chargement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '2px'
        }}
      >
        CAMILLE LACROIX
      </motion.div>

      {/* Barre de progression */}
      <motion.div
        style={{
          width: '200px',
          height: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4deeea, #9b59b6, #ff4da6)',
            borderRadius: '10px'
          }}
        />
      </motion.div>

      {/* Sous-titre */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
        style={{
          fontSize: '14px',
          color: '#ccc',
          letterSpacing: '1px'
        }}
      >
        Chargement du portfolio...
      </motion.div>
    </motion.div>
  );
}
