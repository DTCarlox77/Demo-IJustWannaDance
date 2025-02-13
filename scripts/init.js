document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const audio = new Audio('../assets/songs/bounce_IJustWannaDance.mp3');
  const message = document.querySelector('#message');

  audio.volume = 0.7;
  audio.loop = true;

  audio.addEventListener('canplaythrough', () => {
    executeGame();  
  });

  function executeGame () {
    intro.addEventListener('click', () => {
      message.textContent = 'Espera un momento...';
      setTimeout(() => {
        intro.style.opacity = 0;
        setTimeout(() => {
          loadScripts();
          intro.style.display = 'none';
          audio.play();
          isExecuting = true;
        }, 800);
      }, 1500);
    }, { once: true });
  }

  audio.load(); 

  function loadScripts() {
    const scripts = [
      './scripts/icon.js',
      './scripts/obstacles.js'
    ];

    scripts.forEach(scriptSrc => {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.defer = true;
      document.body.appendChild(script);
    });
  }
});
