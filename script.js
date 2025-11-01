/* Sélectionner les éléments du DOM
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

// Ajouter un écouteur d'événement pour activer/désactiver le menu
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});*/

// Animation d’apparition au scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85; // point de déclenchement

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible'); // retire si on remonte (facultatif)
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);