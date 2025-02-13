const gameArea = document.body;

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');

  const size = Math.random() * 100 + 100; 
  const posX = Math.random() * (window.innerWidth - size);
  const posY = Math.random() * (window.innerHeight - size);

  obstacle.style.width = `${size}px`;
  obstacle.style.height = `${size}px`;
  obstacle.style.left = `${posX}px`;
  obstacle.style.top = `${posY}px`;

  gameArea.appendChild(obstacle);

  setTimeout(() => obstacle.remove(), 1500); 
}

function beatEffect() {
  document.querySelectorAll('.obstacle').forEach(obstacle => {
    obstacle.style.transform = 'scale(1.2)';
    setTimeout(() => obstacle.style.transform = 'scale(1)', 100);
  });
}

setInterval(createObstacle, 1000);
setInterval(beatEffect, 500);