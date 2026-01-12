
  const sliderWrapper = document.querySelector(".happy-customer-slider-wrapper");
  const prev = document.getElementById("hcPrev");
  const next = document.getElementById("hcNext");

  const cardWidth = 344; // card width + gap

  next.addEventListener("click", () => {
    sliderWrapper.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    sliderWrapper.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  /* Hover video autoplay */
  document.querySelectorAll(".happy-customer-video").forEach(video => {
    video.addEventListener("mouseenter", () => video.play());
    video.addEventListener("mouseleave", () => video.pause());
  });

    /* Testimonials list filter */
  const filters = document.querySelectorAll('.happy-customer-filter');
  const cards = document.querySelectorAll('.happy-customer-card');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.dataset.filter;

      cards.forEach(card => {
        card.style.display =
          category === 'all' || card.dataset.category === category
          ? 'block'
          : 'none';
      });
    });
  });

