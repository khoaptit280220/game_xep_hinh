class board {
    constructor(game) {
        this.game = game;
        this.data = [
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _]
        ];
        this.nextData = [
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _]
        ];
        this.score = 0;
        this.level = 0;
    }

    // đưa nextData về null
    resetNextData() {
        for (let r = 0; r < this.nextData.length; r++) {
            for (let c = 0; c < this.nextData[0].length; c++) {
                this.nextData[r][c] = _;
            }
        }
    }
    checkEmpty(c, r) {
        if (this.data[r][c] == _) return true;
        else return false;
    }
    drawBackGround() {
        // this.resetNextData();
        this.drawMainScreen();
        this.drawNextScreen();
    }

    drawMainScreen() {
        for (let r = 0; r < this.data.length; r++) {
            for (let c = 0; c < this.data[0].length; c++) {
                let cl = _colorBackGround;
                if (this.data[r][c] == x) {
                    cl = _colorBlock;
                }
                let bl = new block(this.game, c, r, cl);
                bl.drawMainScreen();
            }
        }
    }
    drawNextScreen() {
        for (let r = 0; r < this.nextData.length; r++) {
            for (let c = 0; c < this.nextData[0].length; c++) {
                let cl = _colorBackGround;
                if (this.nextData[r][c] == x) {
                    cl = _colorBlock;
                }
                let bl = new block(this.game, c, r, cl);
                bl.drawNextScreen();
            }
        }
    }

    // kiểm tra nếu hàng nào đã full thì trả về true;
    checkFullRow(r) {
        let fullRow = true;
        for (let c = 0; c < this.data[r].length; c++) {
            if (this.data[r][c] == _) {
                fullRow = false;
                break;
            }
        }
        return fullRow;
    }
    checkEndGame() {
        let endGame = false;
        for (let c = 0; c < this.data[0].length; c++) {
            if (this.data[0][c]) {
                endGame = true;
                break;
            }
        }
        return endGame;
    }

    updateBoard() {
        for (let r = 0; r < _ROWS; r++) {
            if (this.checkFullRow(r)) {
                // nếu hàng full 
                this.data.splice(r, 1); //thì xóa hàng đó.
                this.data.unshift([_, _, _, _, _, _, _, _, _, _]); // cập nhật thêm 1 hàng mới sau khi đã xóa
                this.score++;
                var sound_point = new Audio('point.wav');
                sound_point.play();
            }
        }
        if (this.checkEndGame()) {
            clearInterval(this.game.status);
            const endgameElement = document.getElementById('end-game')
            endgameElement.classList.remove('hide-endgame');
            endgameElement.classList.add('show-endgame');
            var sound_die = new Audio('die.wav');
                sound_die.play();
        }
        if (this.score < 20) {
            this.level = 0;
            this.game.speed = 500;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 20 && this.score < 40) {
            this.level = 1;
            this.game.speed = 400;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 40 && this.score < 50) {
            this.level = 2
            this.game.speed = 300;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 50 && this.score < 60) {
            this.level = 3;
            this.game.speed = 200;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 60 && this.score < 70) {
            this.level = 4;
            this.game.speed = 250;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 70 && this.score < 80) {
            this.level = 5;
            this.game.speed = 200;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 80 && this.score < 90) {
            this.level = 6;
            this.game.speed = 150;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        } else if (this.score >= 90) {
            this.level = 7;
            this.game.speed = 100;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        }
        document.getElementById('txt_level').value = this.level;
        document.getElementById('txt_score').value = this.score;
    }
}