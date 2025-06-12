import { useEffect, useRef } from "react";
import { MatrixCanvas } from "../MatrixCanvas.interface";
import { MatrixCanvasImpl } from "../MatrixCanvas";
// import { MatrixCanvasAlt } from "../MatrixCanvasAlt";

interface UseMatrixCanvasProp {
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  fps: number,
  charColor?: string,
  cols?: number,
  charSize?: number
}

function useMatrixCanvas({ canvasRef, fps, charColor = '#0f0', cols = 50, charSize = 14 }: UseMatrixCanvasProp) {
  const reqId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    let matrixCanvas: MatrixCanvas | undefined;
    if (canvas !== null) {
      const ctx = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
      /**
       * This approach clears the canvas on every frame so every frame is rendered from scratch.
       * This is more aligned to how canvas works in other places like in android or in webgl.
       * However, it increases complexity since to achieve the same effect as the previous
       * approach we need to keep track of all the trailing effects to be rendered in each frame.
       */
      matrixCanvas ??= new MatrixCanvasImpl(canvas, ctx, {
        charColor,
        charSize,
        cols,
        fps
      }, (reqAnimationFrameId) => {
        reqId.current = reqAnimationFrameId;
      }, requestAnimationFrame.bind(window));

      /**
       * This approach renders transparent black rectangle over the previous frame on every frame
       * to create a fading effect, making the previous frames less visible which gives the
       * trailing effect since the previous frames are not cleared.
       */
      // matrixCanvas ??= new MatrixCanvasAlt(canvas, ctx, {
      //   charColor,
      //   charSize,
      //   cols,
      //   fps
      // }, (reqAnimationFrameId) => {
      //   reqId.current = reqAnimationFrameId;
      // }, requestAnimationFrame.bind(window));
      
      matrixCanvas.draw(0);

      window.addEventListener('resize', () => {
        if (matrixCanvas) {
          matrixCanvas.init();          
        }
      });
    }

    return () => {
      cancelAnimationFrame(reqId.current);
    };

  }, [canvasRef, charColor, charSize, cols, fps]);
};

export { useMatrixCanvas };