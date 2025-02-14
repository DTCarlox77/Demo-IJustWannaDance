let canTakeDamage = true; 

function isTouching(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
      rect1.right < rect2.left || 
      rect1.left > rect2.right ||  
      rect1.bottom < rect2.top ||  
      rect1.top > rect2.bottom  
  );
}

const icon = document.querySelector('#character');
let positionX = window.innerWidth / 4;
let positionY = window.innerHeight / 2;
icon.style.opacity = 1;
let velocityX = 0;
let velocityY = 0;
const speed = 0.9;
const friction = 0.9;
const jumpPower = 30;
const keys = {};
let isJumping = false;
let rotationAngle = 0;
let lastTouchTime = 0;
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === ' ' && !isJumping) jump(e);
});

document.addEventListener('keyup', (e) => keys[e.key] = false);

function jump() {
  if (!isJumping) {
    canTakeDamage = false;
    isJumping = true;

    if (keys['ArrowRight'] || keys['d'] || keys['ArrowLeft'] || keys['a']) {
      velocityX += Math.sign(velocityX || 1) * jumpPower;
    }
    if (keys['ArrowUp'] || keys['w'] || keys['ArrowDown'] || keys['s']) {
      velocityY += Math.sign(velocityY || 1) * jumpPower;
    }

    createJumpEffect(positionX + icon.clientWidth / 2, positionY + icon.clientHeight / 2);

    setTimeout(() => {
      isJumping = false;
      canTakeDamage = true;
    }, 250);
  }
}

function createJumpEffect(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('jump-effect');
  document.body.appendChild(circle);

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  setTimeout(() => {
    circle.remove(); 
  }, 600);
}

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  document.body.appendChild(particle);

  const size = Math.random() * 6 + 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 20 + 10; 
  const translateX = Math.cos(angle) * speed;
  const translateY = Math.sin(angle) * speed;

  let currentOpacity = parseFloat(getComputedStyle(particle).opacity);
  if (currentOpacity > 0) {
    particle.style.opacity = Math.max(0, currentOpacity - 0.2); 
  }

  requestAnimationFrame(() => {
    particle.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.5)`;
    particle.style.opacity = '0';
  });

  setTimeout(() => {
    particle.remove();
  }, 600);
}

function createGlitchEffect() {
  const duration = 300;
  const glitchContainer = document.createElement('div');
  glitchContainer.classList.add('glitch-container');
  document.body.appendChild(glitchContainer);

  const glitchInterval = setInterval(() => {
    const glitch = document.createElement('div');
    glitch.classList.add('glitch');

    const size = Math.random() * 50 + 50; 
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const rotation = Math.random() * 360; 

    glitch.style.width = `${size}px`;
    glitch.style.height = `${size / 4}px`; 
    glitch.style.left = `${posX}px`;
    glitch.style.top = `${posY}px`;
    glitch.style.transform = `rotate(${rotation}deg)`;

    glitchContainer.appendChild(glitch);

    setTimeout(() => glitch.remove(), 100);
  }, 50); 

  setTimeout(() => {
    clearInterval(glitchInterval);
    glitchContainer.remove();
  }, duration);
}

const hit = new Audio('../assets/sfx/hit.wav');
hit.volume = 1;
hit.load();

function takeDamage() {
  if (!canTakeDamage) return;

  hit.currentTime = 0;
  hit.play();

  canTakeDamage = false; 
  icon.classList.add('in-danger');

  let currentOpacity = parseFloat(getComputedStyle(icon).opacity);
  if (currentOpacity > 0) {
    createGlitchEffect(); 
    icon.style.opacity = Math.max(0, currentOpacity - 0.2); 
  }

  if (currentOpacity <= 0.2) {
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  setTimeout(() => {
    canTakeDamage = true; 
    icon.classList.remove('in-danger');
  }, 1000);
}

function createGlitchEffect() {
  const duration = 450;
  const glitchContainer = document.createElement('div');
  glitchContainer.classList.add('glitch-container');
  document.body.appendChild(glitchContainer);

  const glitchInterval = setInterval(() => {
    const glitch = document.createElement('div');
    glitch.classList.add('glitch');

    const height = Math.random() * 20 + 100; 
    const posY = Math.random() * window.innerHeight; 
    const rotation = (Math.random() - 0.5) * 15; 

    glitch.style.height = `${height}px`;
    glitch.style.width = `120vw`; 
    glitch.style.top = `${posY}px`;
    glitch.style.left = `-10vw`;
    glitch.style.transform = `rotate(${rotation}deg)`;

    glitchContainer.appendChild(glitch);

    setTimeout(() => glitch.remove(), 150); 
  }, 45); 

  setTimeout(() => {
    clearInterval(glitchInterval);
    glitchContainer.remove();
  }, duration);
}

function takeDamage() {
  if (!canTakeDamage) return;

  canTakeDamage = false; 
  icon.classList.add('in-danger');

  let currentOpacity = parseFloat(getComputedStyle(icon).opacity);
  if (currentOpacity > 0) {
      createGlitchEffect(); 
      icon.style.opacity = Math.max(0, currentOpacity - 0.2);
  }  

  if (currentOpacity <= 0.2) {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  setTimeout(() => {
    canTakeDamage = true; 
    icon.classList.remove('in-danger');
  }, 1000);
}

function pushBack() {
  const pushForce = 20; 
  velocityX = -Math.sign(velocityX) * pushForce;
  velocityY = -Math.sign(velocityY) * pushForce;
}

function update() {
  if (keys['ArrowRight'] || keys['d']) velocityX += speed;
  if (keys['ArrowLeft'] || keys['a']) velocityX -= speed;
  if (keys['ArrowUp'] || keys['w']) velocityY -= speed;
  if (keys['ArrowDown'] || keys['s']) velocityY += speed;

  velocityX *= friction;
  velocityY *= friction;

  positionX += velocityX;
  positionY += velocityY;

  const maxX = window.innerWidth - icon.clientWidth;
  const maxY = window.innerHeight - icon.clientHeight;

  positionX = Math.max(0, Math.min(positionX, maxX));
  positionY = Math.max(0, Math.min(positionY, maxY));

  if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
    rotationAngle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
  }

  icon.style.transform = `translate(${positionX}px, ${positionY}px) rotate(${rotationAngle}deg)`;

  if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
    createParticle(positionX + icon.clientWidth / 2, positionY + icon.clientHeight / 2);
  }

  document.querySelectorAll('.beated').forEach(obstacle => {
    if (isTouching(icon, obstacle) && canTakeDamage) {
      takeDamage();
      pushBack();
    }
  });

  requestAnimationFrame(update);
}

update();
