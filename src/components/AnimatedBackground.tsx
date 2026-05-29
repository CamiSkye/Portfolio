import { useRef } from 'react';
import { useStarField } from '../hooks/useStarField';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarField(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}