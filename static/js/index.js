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

  const fadeElements = Array.from(document.querySelectorAll('[data-scroll-fade]'));
  if (fadeElements.length > 0) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let fadeFrame = 0;

    const updateScrollFade = () => {
      if (reducedMotion.matches) {
        document.documentElement.classList.remove('scroll-fade-enabled');
        return;
      }

      const viewportHeight = window.innerHeight;
      const fadeDistance = Math.max(120, Math.min(viewportHeight * 0.22, 220));

      fadeElements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const entering = (viewportHeight - bounds.top) / fadeDistance;
        const leaving = bounds.bottom / fadeDistance;
        const opacity = Math.max(0, Math.min(1, entering, leaving));
        element.style.setProperty('--scroll-fade-opacity', opacity.toFixed(3));
      });

      document.documentElement.classList.add('scroll-fade-enabled');
    };

    const scheduleScrollFade = () => {
      if (fadeFrame) return;
      fadeFrame = window.requestAnimationFrame(() => {
        fadeFrame = 0;
        updateScrollFade();
      });
    };

    window.addEventListener('scroll', scheduleScrollFade, { passive: true });
    window.addEventListener('resize', scheduleScrollFade);
    reducedMotion.addEventListener('change', scheduleScrollFade);
    updateScrollFade();
  }

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const previousButton = carousel.querySelector('[data-carousel-previous]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const currentLabel = carousel.querySelector('[data-carousel-current]');
    const totalLabel = carousel.querySelector('[data-carousel-total]');
    let currentIndex = 0;
    let pointerStartX = null;
    let suppressClickUntil = 0;

    if (slides.length === 0) return;
    if (totalLabel) totalLabel.textContent = String(slides.length);

    const showSlide = (requestedIndex) => {
      currentIndex = (requestedIndex + slides.length) % slides.length;
      const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
      const nextIndex = (currentIndex + 1) % slides.length;

      slides.forEach((slide, index) => {
        const active = index === currentIndex;
        slide.classList.toggle('is-active', active);
        slide.classList.toggle('is-prev', index === previousIndex);
        slide.classList.toggle('is-next', index === nextIndex);
        slide.setAttribute('aria-hidden', String(!active));

        slide.querySelectorAll('video').forEach((video) => {
          video.controls = active;
          video.tabIndex = active ? 0 : -1;
          if (!active) video.pause();
        });
      });

      if (currentLabel) currentLabel.textContent = String(currentIndex + 1);
    };

    previousButton?.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton?.addEventListener('click', () => showSlide(currentIndex + 1));

    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (Date.now() < suppressClickUntil) return;
        if (slide.classList.contains('is-prev') || slide.classList.contains('is-next')) {
          showSlide(index);
        }
      });
    });

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
      suppressClickUntil = Date.now() + 300;
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
