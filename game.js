class game {
    constructor() {
        // console.log('create game');

        this.canvas = null;
        this.context = null;

        this.nextCanvas = null;
        this.nextContext = null;

        this.btnStart = null;
        this.status = null;
        this.speed = 500;
        this.init();
        this.eventListener();
        this.loop();
        //this.startGame();
    }
    eventListener() {
        document.addEventListener('keydown', (event) => {
            if (this.status != null) {
                switch (event.key) {
                    case 'ArrowUp':
                        this.brick.rotateBrick();
                        var sound_rotate = new Audio('wing.wav');
                        sound_rotate.play();
                        //console.log('Up');
                        break;
                    case 'ArrowDown':
                        //console.log('Down');
                        this.brick.down();
                        var sound_down = new Audio('swoosh.wav');
                        sound_down.play();
                        break;
                    case 'ArrowLeft':
                        //console.log('Left');
                        this.brick.moveLeft();
                        var sound_rotate = new Audio('wing.wav');
                        sound_rotate.play();
                        //this.draw();
                        break;
                    case 'ArrowRight':
                        //console.log('Right');
                        this.brick.moveRight();
                        var sound_rotate = new Audio('wing.wav');
                        sound_rotate.play();
                        break;
                };
            }
        });
        this.btnStart.addEventListener('click', (event) => {
            let status = event.srcElement.attributes.status.value;
            switch (status) {
                case 'start':
                    this.status = this.startGame();
                    this.btnStart.attributes.status.value = 'stop';
                    this.btnStart.value = "STOP";
                    break;
                default:
                    clearInterval(this.status);
                    this.status = null;
                    this.btnStart.attributes.status.value = 'start';
                    this.btnStart.value = "START";
                    // statements_def
                    break;
            }
        });
    }
    init() {
        this.btnStart = document.getElementById('button_start');

        //create canvas mainScreen
        this.canvas = document.createElement('canvas');
        this.canvas.width = _WIDTH;
        this.canvas.height = _HEIGHT;
        this.context = this.canvas.getContext('2d');
        document.getElementById('mainScreen').appendChild(this.canvas);

        //create canvas nextScreen
        this.nextCanvas = document.createElement('canvas');
        this.nextCanvas.width = _NextWIDTH;
        this.nextCanvas.height = _NextHEIGHT;
        this.nextContext = this.nextCanvas.getContext('2d');
        document.getElementById('nextScreen').appendChild(this.nextCanvas);

        this.board = new board(this);
        this.board.drawBackGround();

        this.brick = new brick(this, 3, 0);
        this.brick.drawBrickMainScreen();

        this.nextBrick = new brick(this, 3, 0);
        this.nextBrick.drawBrickNextScreen();


    }

    createNextBrick() {
        this.nextBrick = new brick(this, 3, 0);
        this.nextBrick.drawBrickNextScreen();
    }

    startNextBrick() {
        this.brick = this.nextBrick;
    }

    startGame() {
        return setInterval(() => {
            // this.block.fall();
            this.brick.fall();
        }, this.speed);
    }

    clearScreen() {
        this.context.clearRect(0, 0, _WIDTH, _HEIGHT);
        this.board.drawBackGround();
    }
    draw() {
        this.clearScreen();
        this.brick.drawBrickMainScreen();
    }
    loop() {
        //console.log('loop');
        this.draw();
        setTimeout(() => this.loop(), 30);
    }
}
var g = new game();