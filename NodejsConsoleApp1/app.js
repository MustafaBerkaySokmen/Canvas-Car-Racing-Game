// Define the canvas and context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;
document.body.appendChild(canvas);

// Define the game variables
let carX = 175;
let carY = 500;
let lane = 2; // 1: left, 2: middle, 3: right
let speed = 3;
let score = 0;
let gameOver = false;

// Define the road variables
let roadY = 0;
let roadColor = '#696969';

// Define the obstacle variables
let obstacles = [];
let obstacleColor = '#ff0000';

// Listen for arrow key presses
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' && lane > 1) {
        lane--;
        carX -= 50;
    } else if (event.code === 'ArrowRight' && lane < 3) {
        lane++;
        carX += 50;
    }
});

// Spawn a new obstacle
function spawnObstacle() {
    let obstacleX = Math.floor(Math.random() * 3) * 50 + 50;
    let obstacleY = -50;
    obstacles.push({ x: obstacleX, y: obstacleY });
}

// Check for collisions between the car and obstacles
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        if (obstacle.x === carX && obstacle.y >= carY - 50 && obstacle.y <= carY) {
            gameOver = true;
            break;
        }
    }
}

// Draw the road
function drawRoad() {
    ctx.fillStyle = roadColor;
    ctx.fillRect(0, roadY, canvas.width, canvas.height);
}

// Draw the car
function drawCar() {
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(carX, carY, 50, 50);
}

// Draw the obstacles
function drawObstacles() {
    ctx.fillStyle = obstacleColor;
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        ctx.fillRect(obstacle.x, obstacle.y, 50, 50);
    }
}

// Update the game
function update() {
    if (gameOver) {
        alert(`Game over! Your score is ${score}.`);
        return;
    }

    // Update the road
    roadY += speed;
    if (roadY >= 50) {
        roadY = 0;
        roadColor = roadColor === '#696969' ? '#808080' : '#696969';
        score++;
        spawnObstacle();
    }

    // Update the obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.y += speed;
        if (obstacle.y >= canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }

    // Check for collisions
    checkCollisions();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game objects
    drawRoad();
    drawCar();
    drawObstacles();

    // Update the game
    requestAnimationFrame(update);
}

// Start the game loop
update();
