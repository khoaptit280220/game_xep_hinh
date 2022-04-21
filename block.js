class block {
    constructor(game, col, row, color) {
        // console.log('create block')
        this.game = game;
        this.col = col;
        this.row = row;
        this.color = color;
        //this.drawMainScreen;
    }
    drawMainScreen() {
        let _x = this.col * _SIZE;
        let _y = this.row * _SIZE;
        this.game.context.beginPath();
        this.game.context.strokeStyle = this.color;
        this.game.context.rect(_x, _y, _SIZE, _SIZE);
        this.game.context.stroke();

        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(_x + 2, _y + 2, _SIZE - 4, _SIZE - 4);
    }
    drawNextScreen() {
        let _x = this.col * _NextSIZE;
        let _y = this.row * _NextSIZE;
        this.game.nextContext.beginPath();
        this.game.nextContext.strokeStyle = this.color;
        this.game.nextContext.rect(_x, _y, _NextSIZE, _NextSIZE);
        this.game.nextContext.stroke();

        this.game.nextContext.fillStyle = this.color;
        this.game.nextContext.fillRect(_x + 2, _y + 2, _NextSIZE - 4, _NextSIZE - 4);
    }

    // xử lý va chạm trái

    hitLeft() {
        return this.col == 0
    }
    leftCondition() {
        if (!this.hitLeft() && this.game.board.checkEmpty(this.col - 1, this.row)) {
            return true;
        } else return false;
    }
    moveLeft() {
        if (this.leftCondition()) {
            this.col--;
        }
    }

    // xử lý va chạm phải
    hitRight() {
        return this.col == _COLUMS - 1;
    }
    rightCondition() {
        if (!this.hitRight() && this.game.board.checkEmpty(this.col + 1, this.row)) {
            return true;
        } else return false;
    }
    moveRight() {
        if (this.rightCondition()) {
            this.col++;
        }
    }

    // xử lý va chạm rơi.
    hitBottom() {
        return this.row == _ROWS - 1;
    }

    fallCondition() {
        if (!this.hitBottom() && this.game.board.checkEmpty(this.col, this.row + 1)) {
            return true;
        } else return false;
    }
    fall() {
        if (this.fallCondition()) {
            this.row++;
        }
    }

}