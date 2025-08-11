function animateCounter(element, end, duration) {
  let start = 0;
  let startTime;
  function update(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end;
    }
  }
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.counter');
const options = { threshold: 0.6 };

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const end = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, end, 1800);
      entry.target.classList.add('counted');
    }
  });
}, options);

counters.forEach(counter => {
  observer.observe(counter);
});
