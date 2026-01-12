/* ================= HEADER BLUR ON SCROLL ================= */
const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ================= MOBILE NAV ================= */
const toggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.forEach(nav => nav.classList.toggle("open"));
});

/* ================= HERO CAROUSEL ================= */
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;
let carouselInterval;

/* Create dots */
slides.forEach((_, index) => {
  const dot = document.createElement("button");
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    goToSlide(index);
    resetInterval();
  });
});

const dots = dotsContainer.querySelectorAll("button");

function goToSlide(index) {
  slides[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active");

  currentIndex = index;

  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  goToSlide(nextIndex);
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 6000); // luxury pacing
}

function resetInterval() {
  clearInterval(carouselInterval);
  startCarousel();
}

startCarousel();

/* ================= COUNTER ANIMATION ================= */
const counters = document.querySelectorAll(".counter-item h3");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const isCurrency = el.textContent.includes("$");
      let count = 0;
      const increment = target / 80;

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          el.textContent = isCurrency
            ? `$${count.toFixed(1)}M`
            : `${Math.floor(count)}+`;
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = isCurrency
            ? `$${target}M`
            : `${target}+`;
        }
      };

      updateCounter();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));

/* ================= Slider Button ================= */
document.querySelectorAll(".slider-btn").forEach(button => {
  button.addEventListener("click", () => {
    const slider = document.getElementById(button.dataset.target);
    const scrollAmount = slider.clientWidth * 0.8;

    slider.scrollBy({
      left: button.classList.contains("next") ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  });
});

/* ================= Home Projects Auto Slider ================= */
const projectsTrack = document.querySelector(".home-projects-track");
const projectsCards = document.querySelectorAll(".home-project-card");
const projectsPrevBtn = document.querySelector(".home-project-nav.prev");
const projectsNextBtn = document.querySelector(".home-project-nav.next");

if (projectsTrack && projectsCards.length > 0) {
  let projectsAutoInterval;

  function autoSlideProjects() {
    projectsTrack.scrollBy({
      left: projectsCards[0].offsetWidth,
      behavior: "smooth"
    });
  }

  function startAutoSlide() {
    projectsAutoInterval = setInterval(autoSlideProjects, 3000);
  }

  function resetAutoSlide() {
    clearInterval(projectsAutoInterval);
    startAutoSlide();
  }

  // Auto-slide on load
  startAutoSlide();

  // Reset interval on manual button click
  if (projectsPrevBtn) {
    projectsPrevBtn.addEventListener("click", resetAutoSlide);
  }
  if (projectsNextBtn) {
    projectsNextBtn.addEventListener("click", resetAutoSlide);
  }
}

/* ================= Our Process ================= */
const steps = document.querySelectorAll(".process-step");

const stepObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

steps.forEach(step => stepObserver.observe(step));

/* ================= Home Press Events ================= */


  const event_slides = document.querySelectorAll('.home-press-event-slide');
  const prevBtn = document.querySelector('.home-press-event-nav.prev');
  const nextBtn = document.querySelector('.home-press-event-nav.next');

  let event_currentIndex = 1;

  function updateSlides() {
    event_slides.forEach(slide => slide.classList.remove('active'));
    event_slides[event_currentIndex].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    event_currentIndex = (event_currentIndex + 1) % event_slides.length;
    updateSlides();
  });

  prevBtn.addEventListener('click', () => {
    event_currentIndex = (event_currentIndex - 1 + event_slides.length) % event_slides.length;
    updateSlides();
  });

  updateSlides();




