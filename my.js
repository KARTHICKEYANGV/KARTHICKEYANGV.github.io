let gameBoard = document.getElementById('gameBoard')
let context = gameBoard.getContext('2d')
let unit = 25;
let width = 500;
let height = 500;
let fillx = 0;
let filly = 0;
let score = 0;
let snake =[
    {x:unit*3 ,y:0},
    {x:unit*2 ,y:0},
    {x:unit ,y:0},
    {x:0 ,y:0}
]
let xVel = 25;
let yVel = 0;
let active =true;

window.addEventListener('keydown',changeDir);

startGame();

function startGame(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,500,500);
    createFood();
    nextMove();
}

function createFood(){
    fillx = Math.floor(Math.random()*width/unit)*unit;
    filly = Math.floor(Math.random()*height/unit)*unit;
}

function clearBoard(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,500,500);
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(fillx,filly,unit,unit);
}

function drawSnake(){
    context.fillStyle = "aqua";
    context.strokeStyle = "#212121"
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,unit,unit);
        context.strokeRect(snakePart.x,snakePart.y,unit,unit);
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head);
    if(snake[0].x==fillx && snake[0].y==filly){
        score +=1;
        createFood();
    }
    else{
    snake.pop();
    }
}

function nextMove(){
    if(active){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        drawSnake();
        moveSnake();
        gameOver();
        nextMove();
    },200)
    }

    else{
        clearBoard();
        context.font = 'bold 50px serif'
        context.fillStyle = 'white'
        context.textAlign = "center"
        context.fillText("Game Over", width/2, height/2)
    }
    
}

function changeDir(event){
    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;
    switch(true){
        case(event.keyCode==LEFT && xVel!=unit):
            xVel = -unit;
            yVel = 0;
            break;
        case(event.keyCode==RIGHT && xVel!=-unit):
            xVel = unit;
            yVel = 0;
            break;
        case(event.keyCode==UP && yVel!=unit):
            xVel = 0;
            yVel = -unit;
            break;
        case(event.keyCode==DOWN && yVel!=-unit):
            xVel = 0;
            yVel = unit;
            break;
        
    }
}

function gameOver(){
    if(snake[0].x<0){
        active = false;
    }
    if(snake[0].x>width){
        active = false;
    }
    if(snake[0].y<0){
        active = false;
    }
    if(snake[0].y>height){
        active = false;
    }
}


