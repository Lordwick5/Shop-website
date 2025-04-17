const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  
});
