document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const audio = new Audio('../assets/songs/bounce_IJustWannaDance.mp3');
  const message = document.querySelector('#message');

  audio.volume = 1;
  audio.loop = true;

  audio.addEventListener('canplaythrough', () => {
    executeGame();  
  });

  function executeGame () {
    intro.addEventListener('click', () => {
      message.textContent = 'Espera un momento...';
      setTimeout(() => {
        intro.style.opacity = 0;
        loadScripts();
        setTimeout(() => {
          intro.style.display = 'none';
          audio.play();
          isExecuting = true;
          hideTitle();
        }, 800);
      }, 1500);
    }, { once: true });
  }

  audio.load(); 

  function hideTitle() {
    const title = document.querySelector('#title');
    setTimeout(() => {
      title.classList.add('hidden'); 
    }, 2000);
  }

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
