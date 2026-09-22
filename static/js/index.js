document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.querySelector('[data-scroll-top]');

  if (scrollButton) {
    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const updateScrollButton = () => {
      scrollButton.classList.toggle('visible', window.scrollY > 300);
    };

    window.addEventListener('scroll', updateScrollButton, { passive: true });
    updateScrollButton();
  }

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const previousButton = carousel.querySelector('[data-carousel-previous]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const currentLabel = carousel.querySelector('[data-carousel-current]');
    const totalLabel = carousel.querySelector('[data-carousel-total]');
    let currentIndex = 0;
    let pointerStartX = null;

    if (slides.length === 0) return;
    if (totalLabel) totalLabel.textContent = String(slides.length);

    const showSlide = (requestedIndex) => {
      currentIndex = (requestedIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        const active = index === currentIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));

        if (!active) {
          slide.querySelectorAll('video').forEach((video) => video.pause());
        }
      });

      if (currentLabel) currentLabel.textContent = String(currentIndex + 1);
    };

    previousButton?.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton?.addEventListener('click', () => showSlide(currentIndex + 1));

    carousel.addEventListener('keydown', (event) => {
      if (event.target.closest('video')) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(currentIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(currentIndex + 1);
      }
    });

    carousel.addEventListener('pointerdown', (event) => {
      pointerStartX = event.clientX;
    });

    carousel.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const distance = event.clientX - pointerStartX;
      pointerStartX = null;

      if (Math.abs(distance) < 60) return;
      showSlide(currentIndex + (distance < 0 ? 1 : -1));
    });

    carousel.addEventListener('pointercancel', () => {
      pointerStartX = null;
    });

    showSlide(0);
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    document.querySelectorAll('video').forEach((video) => video.pause());
  });
});
