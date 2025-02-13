document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    intro.style.opacity = 0;
    setTimeout(() => {
        intro.style.display = 'none';
    }, 800);
  }, 1500);  
});
