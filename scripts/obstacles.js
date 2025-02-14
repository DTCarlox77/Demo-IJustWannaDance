const gameArea = document.body;

function createSquare() {
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

  setTimeout(() => {
    obstacle.style.opacity = 1;
    obstacle.classList.add('beated');
    obstacle.classList.add('beated-square');
  }, 500);

  setTimeout(() => obstacle.remove(), 2500); 
}
function createColumn() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle', 'obstacle-column');

  const posX = Math.random() * (window.innerWidth - 100); 
  const moveTo = (Math.random() * 800) - 800; 

  obstacle.style.position = 'absolute';
  obstacle.style.width = '100px';
  obstacle.style.height = '100vh';
  obstacle.style.left = `${posX}px`;
  obstacle.style.top = '0px';
  obstacle.style.transition = 'opacity 0.5s ease-in-out, transform 1s ease-in-out';

  document.body.appendChild(obstacle);

  setTimeout(() => {
    obstacle.style.transform = `translateX(${moveTo}px)`;
    obstacle.classList.add('beated');
    obstacle.style.opacity = 1;
  }, 1000);

  setTimeout(() => {
    obstacle.style.transform = 'translateX(0px)'; 
  }, 2000);

  setTimeout(() => obstacle.remove(), 3000);
}

function beatEffect() {
  document.querySelectorAll('.beated-square').forEach(obstacle => {
    obstacle.style.transform = 'scale(1.2)';
    setTimeout(() => obstacle.style.transform = 'scale(1)', 120);
  });
}

const createSquareInt = setInterval(createSquare, 1200);
const createBeatInt = setInterval(beatEffect, 500);

setTimeout(() => {
  const createColumnInt = setInterval(createColumn, 1500);
  clearInterval(createSquareInt);
}, 34000);