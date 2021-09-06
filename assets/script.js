"use-strict";

/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

// Themes.
const themes = ["#5468e7", "#e94c2b"];

// Choose random color theme.
let colorTheme = themes[Math.floor(Math.random() * themes.length)];

// This function set random color theme.
function setTheme() {
    // Change css values.
    document.documentElement.style.setProperty("--primary", colorTheme);
}

setTheme();

// Get canvas info from DOM.
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Create block.
function createBlock() {
    let x = Math.floor(Math.random() * (canvas.width - 60));
    x -= (x % 20);
    let y = Math.floor(Math.random() * (canvas.height - 60));
    y -= (y % 20);
    return { x: x, y: y };
}

// Define variables.
let snake = [];
let frames = 0;
let food = createBlock();
let moveDirection = [false, false, false, false];
let gameStarted = false;
let score = 0;
let maxScore = 0;
snake.push(createBlock());

// Controls key events.
window.addEventListener("keydown", function (e) {
    e.preventDefault();
    if (e.keyCode == 38) {
        moveDirection = [true, false, false, false];
        gameStarted = true;
    }
    if (e.keyCode == 40) {
        moveDirection = [false, true, false, false];
        gameStarted = true;
    }
    if (e.keyCode == 37) {
        moveDirection = [false, false, true, false];
        gameStarted = true;
    }
    if (e.keyCode == 39) {
        moveDirection = [false, false, false, true];
        gameStarted = true;
    }
});



// Show snake.
function showSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.beginPath();
        ctx.rect(snake[i].x, snake[i].y, 20, 20);
        ctx.lineWidth = "4";
        ctx.strokeStyle = colorTheme;
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.rect(food.x, food.y, 20, 20);
    ctx.strokeStyle = colorTheme;
    ctx.stroke();
}

// Move snake function.
function moveSnake() {
    // Check if snake eaten the block.
    if (collision(food.x + 10, food.y + 10, snake[0].x + 10, snake[0].y + 10) == true) {
        snake.unshift({ x: food.x, y: food.y });
        food = createBlock();
        score++;
        showScore();
    }
    if (snake.length > 1) {
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
    }
    if (moveDirection[0]) {
        if (snake[0].y > 0) {
            snake[0].y -= 20;
        } else {
            snake[0].y = canvas.height - 20;
        }
    } else if (moveDirection[1]) {
        if (snake[0].y < canvas.height) {
            snake[0].y += 20;
        } else {
            snake[0].y = 0;
        }
    } else if (moveDirection[2]) {
        if (snake[0].x > 0) {
            snake[0].x -= 20;
        } else {
            snake[0].x = canvas.width - 20;
        }
    } else if (moveDirection[3]) {
        if (snake[0].x < canvas.width) {
            snake[0].x += 20;
        } else {
            snake[0].x = 0;
        }
    }
    // Detect collision.
    if (snake.length > 4) {
        for (let i = 2; i < snake.length; i++) {
            if (collision(snake[0].x + 10, snake[0].y + 10, snake[i].x + 10, snake[i].y + 10)) {
                resetGame();
            }
        }
    }
}

// Detect collision between given blocks.
function collision(x1, y1, x2, y2) {
    if (y1 == y2 && (moveDirection[2] || moveDirection[3])) {
        if (Math.abs(x1 - x2) == 20) {
            return true;
        }
    }
    if (x1 == x2 && (moveDirection[0] || moveDirection[1])) {
        if (Math.abs(y1 - y2) == 20) {
            return true;
        }
    }
    return false;
}

// Reset game function.
function resetGame() {
    snake = [createBlock()];
    food = createBlock();
    gameStarted = false;
    frames = 0;
    score = 0;
    document.getElementById("score_id").innerText = score;
}

// This function show score.
function showScore() {
    // Update dom elements.
    document.getElementById("score_id").innerText = score;
    if (score > maxScore) {
        maxScore = score;
        document.getElementById("maxScore_id").innerText = maxScore;
    }
}


draw();

// Draw function.
function draw() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    showSnake();
    if (gameStarted) {
        if (frames % 7 == 0) {
            moveSnake();
            frames = 0;
        }
        frames++;
    }
    window.requestAnimationFrame(draw);
}
