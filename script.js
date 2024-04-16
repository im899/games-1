document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const enemy = document.getElementById('enemy');
    const gameArea = document.getElementById('gameArea');
    const obstacles = document.querySelectorAll('.obstacle');
    const scoreElement = document.getElementById('score');
    let score = 0;

    document.addEventListener('keydown', function(e) {
        movePlayer(e);
    });

    function movePlayer(event) {
        let x = player.offsetLeft;
        let y = player.offsetTop;
        switch(event.key) {
            case 'ArrowUp': y -= 20; break;
            case 'ArrowDown': y += 20; break;
            case 'ArrowLeft': x -= 20; break;
            case 'ArrowRight': x += 20; break;
        }
        x = Math.max(0, Math.min(gameArea.clientWidth - player.clientWidth, x));
        y = Math.max(0, Math.min(gameArea.clientHeight - player.clientHeight, y));
        player.style.left = x + 'px';
        player.style.top = y + 'px';

        checkCollisions();
    }

    function checkCollisions() {
        if (isCollision(player, enemy)) {
            score++;
            scoreElement.textContent = 'Eliminaties: ' + score;
            randomizeEnemy();
        }

        obstacles.forEach(obstacle => {
            if (isCollision(player, obstacle)) {
                alert('Je hebt een obstakel geraakt! Spel wordt gereset.');
                resetGame();
            }
        });
    }

    function isCollision(a, b) {
        return a.offsetLeft < b.offsetLeft + b.offsetWidth &&
               a.offsetLeft + a.offsetWidth > b.offsetLeft &&
               a.offsetTop < b.offsetTop + b.offsetHeight &&
               a.offsetTop + a.offsetHeight > b.offsetTop;
    }

    function resetGame() {
        score = 0;
        scoreElement.textContent = 'Eliminaties: 0';
        randomizeEnemy();
        player.style.left = '10px';
        player.style.top = '10px';
    }

    function randomizeEnemy() {
        const x = Math.floor(Math.random() * (gameArea.clientWidth - enemy.clientWidth));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - enemy.clientHeight));
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
    }

    setInterval(randomizeEnemy, 2000); // Laat de vijand elke 2 seconden van positie veranderen

    // Laat obstakels willekeurig rond bewegen
    setInterval(() => {
        obstacles.forEach(obstacle => {
            let dx = Math.random() * 20 - 10;
            let dy = Math.random() * 20 - 10;
            let newX = Math.max(0, Math.min(gameArea.clientWidth - obstacle.clientWidth, obstacle.offsetLeft + dx));
            let newY = Math.max(0, Math.min(gameArea.clientHeight - obstacle.clientHeight, obstacle.offsetTop + dy));
            obstacle.style.left = newX + 'px';
            obstacle.style.top = newY + 'px';
        });
    }, 1000);
});
