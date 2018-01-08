const keypress = require('keypress');
const clear = require('cli-clear');

class T3Board {
  constructor() {
    this.board = new Array(3);
    this.board.fill(new Array(3));
    this.currentTurn = true; // true = x, false = o
    this.cursorPos = [0, 0];
  }

  init() {
    this.drawBoard();
    this.handleKeypress();
  }

  handleKeypress() {
    keypress(process.stdin);

    process.stdin.on('keypress', (ch, key) => {
      if (key && key.name === 'w') {
        process.stdin.pause();
        this.cursorPos[1] = (this.cursorPos[1] - 1) % 3;
      } else if (key && key.name === 'a') {
        process.stdin.pause();
        this.cursorPos[1] = (this.cursorPos[0] - 1) % 3;
      } else if (key && key.name === 's') {
        process.stdin.pause();
        this.cursorPos[1] = (this.cursorPos[1] + 1) % 3;
      } else if (key && key.name === 'd') {
        process.stdin.pause();
        this.cursorPos[1] = (this.cursorPos[0] + 1) % 3;
      }
    });

    process.stdin.resume();
  }

  drawBoard() {
    clear();

    console.log('┌─────────────┐\n' +
                '│ Tic-Tac-Toe │\n' +
                '└─────────────┘');

    const [y, x] = this.cursorPos;
    this.board.forEach((row, r) => {
      let line = '';
      row.forEach((col, c) => {
        if (y === c && x === r) line += '[';
        else line += ' ';

        if (col) line += col;
        else line += '.';

        if (y === c && x === r) line += ']';
        else line += ' ';
      });
      console.log(line);
    });
  }
}

const t3 = new T3Board();
t3.init();
