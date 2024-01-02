

const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const HighScoreElement = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")

let GameOver = false;
let foodX , foodY;
let snakeX = 5, snakeY = 10; 
let snakeBody = []
let VelocityX = 0 , VelocityY = 0;
let setIntervalId; 
let score = 0;

// Getting the high score from the local storage
let HighScore = localStorage.getItem("high-score") || 0;
HighScoreElement.innerText = `High Score: ${HighScore} `

// Update the High score


// Changing the food position randomly
const changeFoodPosition = () => {
    // Passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver = () => {

    // Clearing the timer and reloading the page on game over; 
    clearInterval(setIntervalId)
    alert("Game Over! Press OK to replay!")
    location.reload(); 
}


const changeDirection = (e) => {

    // Changing the velocity value based on key press
   if(e.key === "ArrowUp" && VelocityY != 1) {
        VelocityX =  0;
        VelocityY = -1;
    } else if(e.key === "ArrowDown" && VelocityY != -1) {
        VelocityX =  0;
        VelocityY =  1;
    }
    else if(e.key === "ArrowLeft" && VelocityX != 1) {
        VelocityX =  -1;
        VelocityY =   0;
    }
    else if(e.key === "ArrowRight" && VelocityX != -1) {
        VelocityX =  1;
        VelocityY =  0;
    }
    initGame()
}

// Mobile Version 
controls.forEach((key)=> {
    key.addEventListener("click", ()=> changeDirection ({key: key.dataset.key })) 

    
})



// Creating the snake food and inserting in the board
const initGame = () => {
    if(GameOver === true) {
        return handleGameOver()
    }


    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`

    // Change the food's position after the snake eats it
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()

    
        snakeBody.push([foodX,foodY]) // Add a body segment after the snake eats the food

        // Increase score 
        score++
        HighScore = score >= HighScore ? score : HighScore

        // Storing high score to local storage with the high-score name
        localStorage.setItem("high-score", HighScore)
        scoreElement.innerText = `Score: ${score}`
        HighScoreElement.innerText = `High Score: ${HighScore} `
        
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {

        // Shifting forward values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i -1]
    }

    snakeBody[0] = [snakeX,snakeY] // Setting first element of the snake body to current snake position



    // Updating the snake's head position based on the current velocity
    snakeX += VelocityX
    snakeY += VelocityY

    // Show the game over alert when the snake colides with the wall
    if(snakeX <= 0 || snakeX > 30 || snakeY <=0 || snakeX>30) {
        GameOver = true; 
    }



    // Create a snake body with these position values
    for(let i=0; i<snakeBody.length; i++) {
       
        
        // Adding a div for each part of the snake's body
        htmlMarkup +=  `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`

        // Show game over when snake hits the body
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            GameOver= true; 
        }
    }   
    playBoard.innerHTML = htmlMarkup
}




changeFoodPosition()

// Move continuously with a single click
setIntervalId = setInterval(initGame,125)

// Moving the snake with an Arrow key click
document.addEventListener("keydown", changeDirection)

