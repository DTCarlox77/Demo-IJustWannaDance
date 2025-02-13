document.addEventListener('DOMContentLoaded', () => {
  const icon = document.querySelector('#character');
  let positionX = window.innerWidth / 2;
  let positionY = window.innerHeight / 2;
  let velocityX = 0;
  let velocityY = 0;
  const speed = 1.2;
  const friction = 0.9;
  const jumpPower = 15;
  const keys = {};
  let isJumping = false;
  let rotationAngle = 0;
  let lastTouchTime = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ' && !isJumping) jump();
  });

  document.addEventListener('keyup', (e) => keys[e.key] = false);

  document.addEventListener('touchstart', (e) => {
    let currentTime = new Date().getTime();
    let timeDiff = currentTime - lastTouchTime;

    if (timeDiff < 300) {
      jump();
    }

    lastTouchTime = currentTime;

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', (e) => {
    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 30) velocityX += speed; 
      else if (deltaX < -30) velocityX -= speed;
    } else {
      if (deltaY > 30) velocityY += speed;
      else if (deltaY < -30) velocityY -= speed;
    }
  });

  function jump() {
    if (!isJumping) {
      isJumping = true;
      velocityX += Math.sign(velocityX || 1) * jumpPower;
      velocityY += Math.sign(velocityY || 1) * jumpPower;
      setTimeout(() => isJumping = false, 250);
    }
  }

  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);

    particle.style.left = `${x - 2}px`;
    particle.style.top = `${y}px`;

    setTimeout(() => {
      particle.style.opacity = '0';
      setTimeout(() => particle.remove(), 500);
    }, 400);
  }

  function update() {

    if (keys['ArrowRight']) velocityX += speed;
    if (keys['ArrowLeft']) velocityX -= speed;
    if (keys['ArrowUp']) velocityY -= speed;
    if (keys['ArrowDown']) velocityY += speed;

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

    requestAnimationFrame(update);
  }

  update();
});
