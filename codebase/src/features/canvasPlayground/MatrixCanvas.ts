import { MatrixCanvas } from "./MatrixCanvas.interface";

interface MatrixOptions {
  fps: number;
  charColor: string;
  cols: number;
  charSize: number;
}

interface MatrixChar {
  char: string;
  opacity: number;
}

type MatrixOnDrawCallback = (reqId: number) => void;
type ReqAnimationFrame = (callback: (time: number) => void) => number;

export class MatrixCanvasImpl implements MatrixCanvas {
  #canvasRef: HTMLCanvasElement;
  #canvasCtx: CanvasRenderingContext2D;
  #matrixOptions: MatrixOptions;
  #onDraw: MatrixOnDrawCallback;
  #reqAnimationFrame: ReqAnimationFrame;

  #width = 0;
  #height = 0;
  #columns = 0;
  #rows = 0;
  #renderIntervalMs: number;
  #prevDrawTime = 0;

  #rainIndex: number[] = [];
  #matrixChars: MatrixChar[][] = []; 

  constructor(canvasRef: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D, options: MatrixOptions, onDraw: MatrixOnDrawCallback, reqAnimationFrame: ReqAnimationFrame ) {
    this.#canvasRef = canvasRef;
    this.#canvasCtx = canvasCtx;
    this.#matrixOptions = options;
    this.#onDraw = onDraw;
    this.#reqAnimationFrame = reqAnimationFrame;
    this.#renderIntervalMs = 1000 / options.fps;

    this.init();
  }

  init() {
    const { charSize } = this.#matrixOptions;

    this.#width = this.#canvasRef.clientWidth;
    this.#height = this.#canvasRef.clientHeight;
    this.#canvasRef.width = this.#canvasRef.clientWidth;
    this.#canvasRef.height = this.#canvasRef.clientHeight;

    this.#columns = Math.floor(this.#width / charSize);
    this.#rows = Math.floor(this.#height / charSize);

    /**
     * fill 2D array with default vals if undefined, leave as is if already defined
     * so on resize, we don't lose the existing chars and their positions and opacities
    */ 
    for (let r = 0; r < this.#rows; r++) {
      for (let c = 0; c < this.#columns; c++) {
        if (!this.#matrixChars[r]) {
          this.#matrixChars[r] = [];
        }

        if (!this.#matrixChars[r][c]) {
          this.#matrixChars[r][c] = {
            char: '',
            opacity: 0
          };
        }
      }
    }

    /**
     * fill rainIndex with random row indices indicating row position of matrix drops
     * in each col. Leave as is if already defined, so on resize, we don't lose existing
     * positions of matrix drops
     */
    for (let i = 0; i < this.#columns; i++) {
      if (this.#rainIndex[i] === undefined as unknown as number) {
        this.#rainIndex[i] = Math.floor(Math.random() * this.#rows); // key: colindex, val: rowindex
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
    this.#canvasCtx.clearRect(0, 0, this.#width, this.#height);
    // set background color
    this.#canvasCtx.fillStyle = 'black';
    this.#canvasCtx.globalAlpha = 1;
    this.#canvasCtx.fillRect(0, 0, this.#width, this.#height);
  }

  /**
   * Updates matrixChars 2D array by adding new characters on rows specified in
   * rainIndex and updating opacity of previous characters, then incrementing the 
   * row index in rainIndex for the next draw.
   */
  #updateMatrixBoard() {
    for (let i = 0; i < this.#rainIndex.length; i++) {
      const rowIndex = this.#rainIndex[i];
      const colIndex = i;
      const ch = this.#generateChar();
      this.#matrixChars[rowIndex][colIndex] = {
        char: ch,
        opacity: 1
      };

      for (let j = 1; j <= 10; j++) {
        const prevRowIndex = rowIndex - j < 0 ? this.#rows + (rowIndex - j) : rowIndex - j;
        const opacity = this.#matrixChars[prevRowIndex][colIndex].opacity;
        this.#matrixChars[prevRowIndex][colIndex].opacity = opacity <= 0 ? 0 : opacity - 0.1;
      }

      this.#rainIndex[i] = this.#rainIndex[i] >= this.#rows - 1 ? 0 : this.#rainIndex[i] + 1;  
    }
  }

  #drawChars() {
    const { charSize, charColor } = this.#matrixOptions;

    this.#canvasCtx.fillStyle = charColor;
    this.#canvasCtx.font = `${charSize}px Courier`;

    for (let r = 0; r < this.#rows; r++) {
      for (let c = 0; c < this.#columns; c++) {
        this.#canvasCtx.globalAlpha = this.#matrixChars[r][c].opacity;
        this.#canvasCtx.fillText(this.#matrixChars[r][c].char, c * charSize, (r + 1) * charSize);
      }
    }
  }

  draw = (time: number) => {
    if (time - this.#prevDrawTime > this.#renderIntervalMs || this.#prevDrawTime === 0) {
      this.#prevDrawTime = time;

      this.#drawBg();
      this.#updateMatrixBoard();
      this.#drawChars();
    }
  
    const reqId = this.#reqAnimationFrame(this.draw);
    this.#onDraw(reqId);
  }
}

export type { MatrixOptions, MatrixOnDrawCallback, ReqAnimationFrame };