import { useRef } from 'react';
import { useMatrixCanvas } from './hooks/useMatrixCanvas';
import styles from './CanvasPlayground.module.scss';

export const CanvasPlaygroundView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMatrixCanvas({ canvasRef, fps: 40, cols: 200, charSize: 15 });

  return (
    <div className={styles.container}>
      <h1>Canvas Playground</h1>
      <canvas ref={canvasRef} id="matrixCanvas" className={styles.matrixCanvas} />
      <div className={styles.arc} />
    </div>
  );
};
