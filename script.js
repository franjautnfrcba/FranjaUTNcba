document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Cambio de Pestañas Principales
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.tab-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const targetSection = document.getElementById(btn.getAttribute('data-tab'));
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // 2. Sistema de Selección de Preguntas para todas las secciones
  const faqLayouts = document.querySelectorAll('.faq-layout');

  faqLayouts.forEach(layout => {
    const navItems = layout.querySelectorAll('.faq-nav-item');
    const answerCards = layout.querySelectorAll('.faq-answer-card');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        answerCards.forEach(card => card.classList.remove('active'));

        item.classList.add('active');

        const targetId = item.getAttribute('data-target');
        const targetCard = layout.querySelector(`#${targetId}`);
        if (targetCard) {
          targetCard.classList.add('active');
        }
      });
    });
  });

  // 3. Desplegar / Ocultar detalles de cada curso
  const toggleButtons = document.querySelectorAll('.btn-toggle-course');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.course-card');
      if (card) {
        card.classList.toggle('expanded');
      }
    });
  });

});
/* LÓGICA DEL CARRUSEL */
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let carouselInterval;

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide) => slide.classList.remove('active'));
  dots.forEach((dot) => dot.classList.remove('active'));

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide() {
  carouselInterval = setInterval(nextSlide, 5000); // Pasa cada 5 segundos
}

function resetAutoSlide() {
  clearInterval(carouselInterval);
  startAutoSlide();
}

if (slides.length > 0) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index));
      resetAutoSlide();
    });
  });

  startAutoSlide();
}