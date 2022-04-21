class brick {
    constructor(game, col, row) {
        //  console.log('create brick');
        this.game = game;
        this.col = col;
        this.row = row;
        this.data = [];
        this.blocks = [];
        this.randomBrick();
    }
    randomBrick() {
        this.data = [];
        let index = Math.floor(Math.random() * 7);
        this.data = _BaseBrick[index];
    }
    buildBrick() {
        this.blocks = [];
        for (let r = 0; r < this.data.length; r++) {
            for (let c = 0; c < this.data[0].length; c++) {
                if (this.data[r][c] == x) {
                    let bl = new block(this.game, this.col + c, this.row + r, _colorBlock)
                    this.blocks.push(bl);
                }
            }
        }
    }

    // vẽ khối brick lên next screen

    drawBrickNextScreen() {
        this.game.board.resetNextData();
        for (let r = 0; r < this.data.length; r++) {
            for (let c = 0; c < this.data[0].length; c++) {
                if (this.data[r][c] == x) {
                    this.game.board.nextData[r + 1][c + 1] = x;
                }
            }
        }
    }

    // vẽ khối brick lên main screen
    drawBrickMainScreen() {
        this.buildBrick();
        this.blocks.forEach((bl) => bl.drawMainScreen());
    }

    // xử lý xoay khối brick

    rotateBrick() {
        let canRotate = true;
        let _newBrick = [];
        for (let c = 0; c < this.data[0].length; c++) {
            let _r = [];
            for (let r = this.data.length - 1; r >= 0; r--) {
                _r.push(this.data[r][c]);
            }
            _newBrick.push(_r);
        }
        let oldCol = this.col;
        if ((this.col + _newBrick[0].length) > (_COLUMS - 1)) {
            this.col = _COLUMS - _newBrick[0].length;
        }
        if ((this.row + _newBrick.length) < _ROWS) {
            for (let _r = 0; _r < _newBrick.length; _r++) {
                for (let _c = 0; _c < _newBrick[0].length; _c++) {
                    if (_newBrick[_r][_c] == x) {
                        if (!this.game.board.checkEmpty(this.col + _c, this.row + _r)) {
                            canRotate = false;
                            break;
                        }
                    }
                }
            }
        } else {
            canRotate = false;
        }
        if (canRotate) {
            this.data = _newBrick;
        } else {
            this.col = oldCol;
        }
        this.buildBrick();
    }

    // xử lý va chạm trái của brick

    canMoveLeft() {
        for (let i = 0; i < this.blocks.length; i++) {
            if (!this.blocks[i].leftCondition()) {
                // canfall = false;
                return false;
                break;
            }
        }
        return true;
    }
    moveLeft() {
        if (this.canMoveLeft()) {
            this.col--;
            this.buildBrick();
        }
    }

    // xử lý va chạm phải của brick


    canMoveRight() {
        for (let i = 0; i < this.blocks.length; i++) {
            if (!this.blocks[i].rightCondition()) {
                // canfall = false;
                return false;
                break;
            }
        }
        return true;
    }
    moveRight() {
        if (this.canMoveRight()) {
            this.col++;
            this.buildBrick();
        }
    }

    // xử lý va chạm rơi của brick
    canFall() {
        //let canfall = true;
        for (let i = 0; i < this.blocks.length; i++) {
            if (!this.blocks[i].fallCondition()) {
                // canfall = false;
                return false;
                break;
            }
        }
        return true;
    }
    fall() {
        if (this.canFall()) {
            this.row++;
            this.buildBrick();
        } else {
            this.appendToBoard();
            this.game.board.updateBoard();
            this.game.startNextBrick();
            this.game.createNextBrick();
        }
    }
    down() {
        while (this.canFall()) {
            this.fall();
        }
    }

    // giữ lại các khối brick khi chạm đáy và cập nhật lại bảng board
    appendToBoard() {
        for (let i = 0; i < this.blocks.length; i++) {
            let c = this.blocks[i].col;
            let r = this.blocks[i].row;
            this.game.board.data[r][c] = x;
        }
    }
}