const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.9;
    }else{
        canvasSize = window.innerHeight * 0.9;
    }

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementsSize = canvasSize / 10;
    startGame()
}

function startGame() {
    game.font = elementsSize + 'px verdana';
    game.textAlign = 'end';

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    

    console.log(mapRowCols);

    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row-1][col-1]], elementsSize * col, elementsSize * row);   
        }    
    } 

}