const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    // Active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const categories = card.dataset.category;

      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});
