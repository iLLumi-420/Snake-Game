const snakeSpeed = 5;
var Direction = {x:0 , y:0};
let lastDirection = {x:0 , y:0};
const gameBoard = document.querySelector('.board');
let lastRender = 0 ;
let snakeBody = [{x:11,y:11}];
let snakeFood = randomNumberGenerator();
const results = document.querySelector('.results');
const restartButton = document.querySelector('.ok');

window.requestAnimationFrame(main);

function main(currentTime){
    const seconds = (currentTime - lastRender)/1000;
    window.requestAnimationFrame(main);
    if(seconds < 1/snakeSpeed) return
    lastRender = currentTime;
    render(gameBoard);
    update();

}
function update(){
    
    for(let i = snakeBody.length - 2 ; i >= 0  ; i--){
        snakeBody[i+1] = {...snakeBody[i]};
    }
    const newDirection = getDirection();
  
    snakeBody[0].x += newDirection.x;
    snakeBody[0].y += newDirection.y; 
    lastDirection = newDirection;   
}

function render(gameBoard){
    gameBoard.innerHTML = "";
    snakeBody.forEach(section=>{
    const snakeElement = document.createElement('div');
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
    snakeElement.style.gridRowStart = section.y;
    snakeElement.style.gridColumnStart = section.x;
    })
    const food = document.createElement('div');
    food.classList.add('food');
    gameBoard.appendChild(food);
    food.style.gridRowStart = snakeFood.y ;
    food.style.gridColumnStart = snakeFood.x ;
    afterEating();
    dyingConditions();
}

function afterEating(){
    if(snakeBody[0].x == snakeFood.x && snakeBody[0].y == snakeFood.y){
        snakeFood =  randomNumberGenerator();
        snakeBody.push({x:snakeBody[0].x + 1 , y:snakeBody[0].y + 1});
    }

}
function getDirection(){
    window.addEventListener('keydown', e => {
        switch(e.key){
            case 'ArrowUp': 
                if(lastDirection.y !== 0)break
                Direction = {x:0 , y:-1}
                break;
            case 'ArrowDown':
                if(lastDirection.y !== 0)break
                Direction = {x:0 , y:1}
                break;
            case 'ArrowLeft':
                if(lastDirection.x !== 0)break
                Direction = {x:-1 , y:0}
                break;
            case 'ArrowRight':
                if(lastDirection.x !== 0)break
                Direction = {x:1 , y:0}
                break;
        }
    })
    return Direction;
}
function dyingConditions(){
    for(let i=1; i < snakeBody.length ; i++){
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y){
            results.classList.add('showResults')
            gameBoard.style.display = 'none';
            restartButton.addEventListener('click',()=>{
                window.location = './index.html'
            })
        }
    }
    if(snakeBody[0].x <= 0 ||snakeBody[0].x > 21 || snakeBody[0].y  <= 0 ||snakeBody[0].y > 21){
            results.classList.add('showResults')
            gameBoard.style.display = 'none';
            restartButton.addEventListener('click',()=>{
                window.location = './index.html'
            })
    }
}
function randomNumberGenerator(){
    let randomx =  Math.floor((Math.random()* 21)+1);    
    let randomy =  Math.floor((Math.random()* 21)+1);
    let randomNumber = {x:randomx , y:randomy};
    snakeBody.some(element => {
        if(element.x == randomNumber.x && element.y == randomNumber.y) {
            randomNumber = randomNumberGenerator();
            console.log(randomNumber);
        }
    })
    return randomNumber;
}


