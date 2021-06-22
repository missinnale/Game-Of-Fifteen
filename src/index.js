
class Puzzle {
    constructor() {
        this.emptyPosition = [];
        this.board = this.buildBoard(4, 4);
    }

    buildBoard(width, height) {
        let board = []
        let nums = Array.from({ length: width * height }, (_, i) => i);
        for (let i = 0; i < width; i++) {
            board.push([])
            for (let j = 0; j < height; j++) {
                random_index = Math.floor(Math.random() * nums.length)
                if (nums[random_index] == 0) {
                    this.emptyPosition = [i, j]
                }
                board[i].push(nums[random_index])
                nums = nums.slice(0, random_index).concat(nums.slice(random_index + 1, nums.length))
            }
        }
        return board;
    }

    parseInput(keyCode, shiftKey) {
        switch (keyCode) {
            case 37:
                this.leftInput(shiftKey);
                break;
            case 38:
                this.upInput(shiftKey);
                break;
            case 39:
                this.rightInput(shiftKey);
                break;
            case 40:
                this.downInput(shiftKey);
                break;
        }
    }

    #moveUp() {
        emptyPosition = this.emptyPosition;
        board = this.board;
        if (emptyPosition[0] == board.length - 1) return;

        this.board[emptyPosition[0]][emptyPosition[1]] = board[emptyPosition[0] + 1][emptyPosition[1]];
        this.board[emptyPosition[0] + 1][emptyPosition[1]] = 0;
        this.emptyPosition = [emptyPosition[0] + 1, emptyPosition[1]];
    }

    upInput(shift) {
        this.#moveUp();

        if (shift) {
            while (this.board[this.board.length - 1][this.emptyPosition[1]] !== 0) {
                this.#moveUp();
            }
        }


    }

    #moveDown() {
        emptyPosition = this.emptyPosition;
        board = this.board;
        if (emptyPosition[0] == 0) return;

        this.board[emptyPosition[0]][emptyPosition[1]] = board[emptyPosition[0] - 1][emptyPosition[1]];
        this.board[emptyPosition[0] - 1][emptyPosition[1]] = 0;
        this.emptyPosition = [emptyPosition[0] - 1, emptyPosition[1]];
    }

    downInput(shift) {
        this.#moveDown();

        if (shift) {
            while (this.board[0][this.emptyPosition[1]] !== 0) {
                this.#moveDown();
            }

        }
    }

    #moveLeft() {
        emptyPosition = this.emptyPosition;
        board = this.board;
        if (emptyPosition[1] == board.length - 1) return;

        this.board[emptyPosition[0]][emptyPosition[1]] = board[emptyPosition[0]][emptyPosition[1] + 1];
        this.board[emptyPosition[0]][emptyPosition[1] + 1] = 0;
        this.emptyPosition = [emptyPosition[0], emptyPosition[1] + 1];
    }

    leftInput(shift) {
        this.#moveLeft();

        if (shift) {
            while (self.board[self.emptyPosition[0]][self.board.length - 1] !== 0) {
                this.#moveLeft();
            }

        }
    }

    #moveRight() {
        emptyPosition = this.emptyPosition;
        board = this.board;
        if (emptyPosition[1] == 0) return;

        this.board[emptyPosition[0]][emptyPosition[1]] = board[emptyPosition[0]][emptyPosition[1] - 1];
        this.board[emptyPosition[0]][emptyPosition[1] - 1] = 0;
        this.emptyPosition = [emptyPosition[0], emptyPosition[1] - 1];
    }

    rightInput(shift) {
        this.#moveRight();

        if (shift) {
            while (self.board[self.emptyPosition[0]][0] !== 0) {
                this.#moveRight();
            }

        }
    }
}


var board_html = document.getElementById("board");
var puzzle = new Puzzle();
console.log(puzzle.board);


function updateBoard() {
    var html = '';
    for (var i = 0; i < puzzle.board.length; i++) {
        html += "<div class='row'>"
        for (var j = 0; j < puzzle.board[i].length; j++) {
            if (puzzle.board[i][j] == 0) {
                html += "<div class='space' id='emptySpace'>  </div>";
            }
            else {
                html += "<div class='space'>" + puzzle.board[i][j] + "</div>"
            }
        }
        html += "</div>"
    }
    board_html.innerHTML = html;
}

updateBoard();


document.addEventListener("keydown", function (e) {
    e.preventDefault();
    console.log("key down: " + e.keyCode);
    puzzle.parseInput(e.keyCode, e.shiftKey);
    updateBoard();
}, false);
