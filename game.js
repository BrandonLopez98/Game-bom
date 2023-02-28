const canvas = document.querySelector('#game');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');


const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;
const playerPosition = {
    x: undefined,
    y:undefined
}
let variable = 0;
const giftPosition = {
    x: undefined,
    y: undefined
}

let bombasPosition = []

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);
window.addEventListener('keydown',moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

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

    bombasPosition = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) =>{            
            let emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            
            if (col == "O") {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({posX, posY});
                }
            }else if (col == "I") {
                if (!giftPosition.x && !giftPosition.y) {
                    giftPosition.x = posX
                    giftPosition.y = posY
                    console.log({posX, posY});
                }
            }else if (col == "X") {
                bombasPosition.push({
                    x: posX,
                    y: posY
                })
            }
            game.fillText(emoji, posX, posY);   
        } )
    });
    movePlayer();
}
function movePlayer() {

    const colicionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const colicionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const colicion = colicionX && colicionY;

    if (colicion) {
        console.log('super, pasaste de nivel');
    }

    const bombaCollision = bombasPosition.find(bomba =>{
        const bombaCollisionX = bomba.x.toFixed(1) == playerPosition.x.toFixed(1);
        const bombaCollisionY = bomba.y.toFixed(1) == playerPosition.y.toFixed(1);
        return bombaCollisionX && bombaCollisionY;
    })

    if (bombaCollision) {
        console.log('conduzca bien ');
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);    
}
function moveByKeys(event) {
    switch (event.code) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
    
        case 'ArrowRight':
            moveRight();
            break;
            
        case 'ArrowDown':
            moveDown();
            break;

        default:
            break;
    }
}
function moveUp() {
 console.log('arriba');   
 if ((playerPosition.y - elementsSize) < elementsSize-1) {
    console.log('no se puede');
 }else{
    playerPosition.y -= elementsSize;
    startGame();
 }
 
}
function moveLeft() {
    console.log('izquierda');   
    if ((playerPosition.x - elementsSize) < elementsSize-1) {
        console.log('no se puede');
     }else{
        playerPosition.x -= elementsSize;
        startGame();
     }
}
function moveRight() {
 console.log('derecha');
 if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('no se puede');
 }else{
    playerPosition.x += elementsSize;
    startGame();
 }
}
function moveDown() {
    console.log('abajo');  
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('no se puede');
     }else{
        playerPosition.y += elementsSize;
        startGame();
     }
}




