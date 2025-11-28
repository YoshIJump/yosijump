function buyNow() {
  alert("Thank you! Redirecting to checkout...");
  window.location.href = "https://example.com/checkout";
}

function learnMore() {
  const el = document.getElementById('packages');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else alert("Scroll down to see more details!");
}

function contactUs() {
  alert("Opening email client...");
  window.location.href = "mailto:yosijump@gmail.com";
}

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('sliderDots');
  let currentIndex = 0;
  let slideInterval;

  if (!slides.length || !dotsContainer) return;

  slides.forEach((_, idx) => {
    const dot = document.createElement('span');
    if (idx === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('span'));

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active-dot'));
    slides[index].classList.add('active');
    dots[index].classList.add('active-dot');
    currentIndex = index;
  }

  window.nextSlide = function() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  };

  window.prevSlide = function() {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  };

  function goToSlide(index) { showSlide(index); }
  window.goToSlide = goToSlide;

  function startSlider() { slideInterval = setInterval(window.nextSlide, 4000); }
  function stopSlider() { clearInterval(slideInterval); }

  const heroSection = document.querySelector('.hero');
  heroSection.addEventListener('mouseenter', stopSlider);
  heroSection.addEventListener('mouseleave', startSlider);

  startSlider();
});


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('customBurger');
  const navMenuEl = document.getElementById('navMenu');

  let bsCollapse = null;
  if (window.bootstrap && navMenuEl) {
    bsCollapse = new bootstrap.Collapse(navMenuEl, { toggle: false });
  }

  function setBurgerState(open) {
    if (!burger) return;
    if (open) burger.classList.add('active');
    else burger.classList.remove('active');
  }

  window.toggleMenu = function(force) {
    if (typeof force === 'boolean' && bsCollapse) {
      if (force) bsCollapse.show();
      else bsCollapse.hide();
      setBurgerState(force);
      return;
    }

    if (!bsCollapse) {
      if (navMenuEl) {a
        navMenuEl.classList.toggle('show');
        setBurgerState(navMenuEl.classList.contains('show'));
      }
      return;
    }
    if (navMenuEl.classList.contains('show')) {
      bsCollapse.hide();
      setBurgerState(false);
    } else {
      bsCollapse.show();
      setBurgerState(true);
    }
  };

  if (burger) burger.addEventListener('click', () => window.toggleMenu());

  const navLinks = Array.from(document.querySelectorAll('#navMenu .nav-link'));
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (bsCollapse) bsCollapse.hide();
      else if (navMenuEl) navMenuEl.classList.remove('show');
      setBurgerState(false);
    });
  });
});
