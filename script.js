document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const enemy = document.getElementById('enemy');
    const obstacles = document.querySelectorAll('.obstacle');
    const scoreElement = document.getElementById('score');
    let score = 0;
    let enemySpeed = 1;

    document.addEventListener('keydown', function(e) {
        movePlayer(e);
    });

    setInterval(function() {
        moveEnemy();
        moveObstacles();
    }, 50);

    function movePlayer(event) {
        let x = player.offsetLeft;
        let y = player.offsetTop;
        switch(event.key) {
            case 'ArrowUp': y -= 10; break;
            case 'ArrowDown': y += 10; break;
            case 'ArrowLeft': x -= 10; break;
            case 'ArrowRight': x += 10; break;
        }
        x = Math.max(0, Math.min(gameArea.clientWidth - player.clientWidth, x));
        y = Math.max(0, Math.min(gameArea.clientHeight - player.clientHeight, y));
        player.style.left = x + 'px';
        player.style.top = y + 'px';
        checkCollisions();
    }

    function moveEnemy() {
        let newX = enemy.offsetLeft + (Math.random() * enemySpeed * 2 - enemySpeed);
        let newY = enemy.offsetTop + (Math.random() * enemySpeed * 2 - enemySpeed);
        newX = Math.max(0, Math.min(gameArea.clientWidth - enemy.clientWidth, newX));
        newY = Math.max(0, Math.min(gameArea.clientHeight - enemy.clientHeight, newY));
        enemy.style.left = newX + 'px';
        enemy.style.top = newY + 'px';
    }

    function moveObstacles() {
        obstacles.forEach(obstacle => {
            let newX = obstacle.offsetLeft + (Math.random() * 0.5 - 0.25);
            let newY = obstacle.offsetTop + (Math.random() * 0.5 - 0.25);
            newX = Math.max(0, Math.min(gameArea.clientWidth - obstacle.clientWidth, newX));
            newY = Math.max(0, Math.min(gameArea.clientHeight - obstacle.clientHeight, newY));
            obstacle.style.left = newX + 'px';
            obstacle.style.top = newY + 'px';
        });
    }

    function resetEnemy() {
        const x = Math.floor(Math.random() * (gameArea.clientWidth - enemy.clientWidth));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - enemy.clientHeight));
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
