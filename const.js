//main screen
const _WIDTH = 200;
const _HEIGHT = 400;
const _COLUMS = 10;
const _ROWS = 20;
const _SIZE = 20;
//next screen
const _NextWIDTH = 90;
const _NextHEIGHT = 75;
const _NextCOLUMS = 6;
const _NextROWS = 5;
const _NextSIZE = 15;
// board
const _ = null;
const x = "x";
const _colorBackGround = 'grey';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const _colorBlock = getRandomColor();

const _BaseBrick = [
    [
        [x, x, x, x]
    ],
    [
        [x, x],
        [x, x]
    ],
    [
        [x, x, x],
        [_, _, x]
    ],
    [
        [x, x, x],
        [x, _, _]
    ],
    [
        [x, _],
        [x, x],
        [_, x]
    ],
    [
        [_, x],
        [x, x],
        [x, _]
    ],
    [
        [x, x, x],
        [_, x, _]
    ]
];