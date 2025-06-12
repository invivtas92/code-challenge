import { MatrixOnDrawCallback, MatrixOptions, ReqAnimationFrame } from "./MatrixCanvas";
import { MatrixCanvas } from "./MatrixCanvas.interface";

export class MatrixCanvasAlt implements MatrixCanvas {
  #canvasRef: HTMLCanvasElement;
  #canvasCtx: CanvasRenderingContext2D;
  #matrixOptions: MatrixOptions;
  #onDraw: MatrixOnDrawCallback;
  #reqAnimationFrame: ReqAnimationFrame;

  #width = 0;
  #height = 0;
  #prevDrawTime = 0;
  #renderIntervalMs: number;

  #matrixChars: {
    y: number,
    speed: number
  }[] = [];
  #charSize = 0;

  constructor(canvasRef: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, options: MatrixOptions, onDraw: MatrixOnDrawCallback, reqAnimationFrame: ReqAnimationFrame ) {
    this.#canvasRef = canvasRef;
    this.#canvasCtx = canvasCtx;
    this.#matrixOptions = options;
    this.#onDraw = onDraw;
    this.#reqAnimationFrame = reqAnimationFrame;
    this.#renderIntervalMs = 1000 / options.fps;

    this.init();
    this.#canvasCtx.fillStyle = 'black';
    this.#canvasCtx.fillRect(0, 0, this.#width, this.#height);
  }
  
  init() {
    const { cols } = this.#matrixOptions;

    this.#width = this.#canvasRef.clientWidth;
    this.#height = this.#canvasRef.clientHeight;
    this.#canvasRef.width = this.#canvasRef.clientWidth;
    this.#canvasRef.height = this.#canvasRef.clientHeight;

    this.#charSize = this.#width / cols;
    for (let i = 0; i < cols; i++) {
      if (!this.#matrixChars[i]) {
        this.#matrixChars[i] = {
          y: Math.random() * this.#height,
          speed: 2 + Math.random() * 3
        };
      }
    }
  }

  /**
   * @returns a random japanese characteer or 0-9 or A-Z or : - \@
   */
  #generateChar(): string {
    return Math.random() > 0.5 ?
      String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
      : String.fromCharCode(0x30 + Math.floor(Math.random() * 43));
  }

  #drawBg() {
    // apply transparent background on top of previous frame to make everything previously rendered
    // in the canvas to be 5% more transparent
    this.#canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.#canvasCtx.fillRect(0, 0, this.#width, this.#height);
  }

  #drawCharsAndUpdateMatrixboard() {
    this.#canvasCtx.fillStyle = this.#matrixOptions.charColor;
    this.#canvasCtx.font = `${this.#charSize}px Courier`;

    for (let i = 0; i < this.#matrixChars.length; i++) {
      const x = i * this.#charSize;
      const y = this.#matrixChars[i].y;
      const ch = this.#generateChar();

      this.#canvasCtx.fillText(ch, x, y);
      this.#matrixChars[i].y += this.#matrixChars[i].speed;
  
      // set y pos to 0 if it goes beyond the height of the canvas
      if (this.#matrixChars[i].y > this.#height) {
        this.#matrixChars[i].y = 0;
      }
    }
  }

  draw = (time: number) => {
    if (time - this.#prevDrawTime > this.#renderIntervalMs || this.#prevDrawTime === 0) {
      this.#prevDrawTime = time;

      this.#drawBg();
      this.#drawCharsAndUpdateMatrixboard();
    }
  
    const reqId = this.#reqAnimationFrame(this.draw);
    this.#onDraw(reqId);
  };
}