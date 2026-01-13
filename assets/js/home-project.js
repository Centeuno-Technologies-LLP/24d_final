/* ================= Home Projects Slider (Smooth + Animated) ================= */
(function () {
  const track = document.querySelector(".home-projects-track");
  const cards = document.querySelectorAll(".home-project-card");
  const prevBtn = document.querySelector(".home-project-nav.prev");
  const nextBtn = document.querySelector(".home-project-nav.next");

  if (!track || !cards.length) return;

  let autoSlideInterval;
  const gap = 48; // 3rem
  const slideDelay = 3000;

  /* ---------- Smooth scroll with easing ---------- */
  function smoothScrollBy(distance, duration = 600) {
    const start = track.scrollLeft;
    const startTime = performance.now();

    function easeInOut(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      track.scrollLeft = start + distance * easeInOut(progress);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function getSlideWidth() {
    return cards[0].offsetWidth + gap;
  }

  /* ---------- Slide Logic ---------- */
  function slideNext() {
    const slideWidth = getSlideWidth();

    if (
      track.scrollLeft + track.clientWidth >=
      track.scrollWidth - slideWidth
    ) {
      smoothScrollBy(-track.scrollLeft); // loop back
    } else {
      smoothScrollBy(slideWidth);
    }
  }

  function slidePrev() {
    const slideWidth = getSlideWidth();

    if (track.scrollLeft <= 0) {
      smoothScrollBy(track.scrollWidth);
    } else {
      smoothScrollBy(-slideWidth);
    }
  }

  /* ---------- Auto Slide ---------- */
  function startAutoSlide() {
    autoSlideInterval = setInterval(slideNext, slideDelay);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  /* ---------- Button Controls ---------- */
  nextBtn?.addEventListener("click", () => {
    slideNext();
    resetAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    slidePrev();
    resetAutoSlide();
  });

  /* ---------- Pause on Interaction ---------- */
  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);
  track.addEventListener("touchstart", stopAutoSlide);
  track.addEventListener("touchend", startAutoSlide);

  /* ---------- Scroll-based Animation ---------- */
  let ticking = false;

  track.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const center = window.innerWidth / 2;
          const distance = Math.abs(rect.left + rect.width / 2 - center);
          const scale = Math.max(0.92, 1 - distance / 1200);
          card.style.transform = `scale(${scale})`;
          card.style.transition = "transform 0.3s ease";
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ---------- Init ---------- */
  startAutoSlide();
})();
