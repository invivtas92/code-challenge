import { useEffect, useRef } from "react";

interface UseMatrixCanvasProp {
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  fps: number,
  charColor?: string,
  cols?: number
}

function useMatrixCanvas({ canvasRef, fps, charColor = '#0f0', cols = 50 }: UseMatrixCanvasProp) {
  const reqId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const ctx = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
      const width = canvas.width;
      const height = canvas.height;
      const renderIntervalMs = 1000 / fps;
  
      const matrixChars: {
        y: number,
        speed: number
      }[] = [];

      const charSize = width / cols;
  
      for (let i = 0; i < cols; i++) {
        matrixChars[i] = {
          y: Math.random() * height,
          speed: 2 + Math.random() * 3
        };
      }
  
      // set background color
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
  
      let prevTime = 0;
      const drawMatrix: FrameRequestCallback = function(time) {
        if (time - prevTime > renderIntervalMs || prevTime === 0) {
          prevTime = time;
          // semi transparent black rect over the previous frame
          // to create a fading effect (making the prev frames less visible
          // by putting the semi transaprent rect on top)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, width, height);
  
          ctx.fillStyle = charColor;
          ctx.font = `${charSize}px Courier`;
  
          for (let i = 0; i < matrixChars.length; i++) {
            const x = i * charSize;
            const y = matrixChars[i].y;
            // randomise rendering japanese characters and A-Z characters
            // this char will be rendered in canvas and never cleared
            // so next frames  will render different characters on top of
            // existing ones, but with different y positions
            // it doesn't deteriorate the performance since canvas only stores
            // pixels on a single frame of the canvas (does not retain info about previous frames)
            const ch = Math.random() > 0.5 ?
              String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
              : String.fromCharCode(0x30 + Math.floor(Math.random() * 43)) ;

            ctx.fillText(ch, x, y);
            matrixChars[i].y += matrixChars[i].speed;
  
            // set y pos to 0 if it goes beyond the height of the canvas
            if (matrixChars[i].y > height) {
              matrixChars[i].y = 0;
            }
          }
        }
  
        reqId.current = requestAnimationFrame(drawMatrix);
      }
  
      reqId.current = requestAnimationFrame(drawMatrix);
    }

    return () => {
      cancelAnimationFrame(reqId.current);
    };

  }, [canvasRef, charColor, cols, fps]);
};

export { useMatrixCanvas };