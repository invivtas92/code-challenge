import { useRef } from 'react';
import { useMatrixCanvas } from './hooks/useMatrixCanvas';

export const CanvasPlaygroundView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMatrixCanvas({ canvasRef, fps: 100 });

  return (
    <div>
      <h1>Canvas Playground</h1>
      <canvas ref={canvasRef} id="matrixCanvas" width="800" height="800" />
    </div>
  );
};
