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

  /* Mobile slider movement */
  if (window.innerWidth <= 768) {
    const slider = document.querySelector('.home-press-event-slider');
    slider.style.transform = `translateX(-${event_currentIndex * 100}%)`;
  }
}

/* ================= Touch Swipe Support (Mobile) ================= */

const slider = document.querySelector('.home-press-event-slider');

let startX = 0;
let currentX = 0;
let isDragging = false;

slider.addEventListener('touchstart', (e) => {
  if (window.innerWidth > 768) return;

  startX = e.touches[0].clientX;
  isDragging = true;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDragging || window.innerWidth > 768) return;

  currentX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
  if (!isDragging || window.innerWidth > 768) return;

  const diff = startX - currentX;
  const swipeThreshold = 50;

  if (diff > swipeThreshold) {
    // Swipe left → Next
    event_currentIndex =
      (event_currentIndex + 1) % event_slides.length;
  } else if (diff < -swipeThreshold) {
    // Swipe right → Prev
    event_currentIndex =
      (event_currentIndex - 1 + event_slides.length) % event_slides.length;
  }

  updateSlides();
  isDragging = false;
});


  nextBtn.addEventListener('click', () => {
    event_currentIndex = (event_currentIndex + 1) % event_slides.length;
    updateSlides();
  });

  prevBtn.addEventListener('click', () => {
    event_currentIndex = (event_currentIndex - 1 + event_slides.length) % event_slides.length;
    updateSlides();
  });

  /* 👉 Hover Behavior (NEW) */
event_slides.forEach((slide, index) => {
  slide.addEventListener('mouseenter', () => {
    event_currentIndex = index;
    updateSlides();
  });
});

  updateSlides();


// ================= Floating Action ================= */
document.addEventListener("DOMContentLoaded", () => {
  fetch("components/floating-actions.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
    });
});

function openCallbackForm() {
  alert("Open Call Back Form");
}

