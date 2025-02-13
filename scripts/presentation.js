document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const audio = new Audio('../assets/songs/bounce_IJustWannaDance.mp3');
  const message = document.querySelector('#message');

  audio.volume = 0.7;
  audio.loop = true;

  audio.addEventListener('canplaythrough', () => {
    executeGame();  
  });

  const executeGame = () => {
    intro.addEventListener('click', () => {
      message.textContent = 'Espera un momento...';
      setTimeout(() => {
        intro.style.opacity = 0;
        setTimeout(() => {
          intro.style.display = 'none';
          audio.play();
          loadScripts();
        }, 800);
      }, 1500);
    })
  }

  audio.load(); 

  function loadScripts() {
    const scripts = [
      './scripts/obstacles.js',
      './scripts/icon.js'
    ];

    scripts.forEach(scriptSrc => {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.defer = true;
      document.body.appendChild(script);
    });
  }
});
