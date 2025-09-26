// Intersection Observer para animações no scroll
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'down';
    this.init();
  }

  init() {
    // Configuração do observer ajustada para mobile
    const isMobile = window.innerWidth <= 768;
    const options = {
      threshold: isMobile ? 0.1 : 0.15,
      rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Verifica se já foi animado
        if (entry.target.hasAttribute('data-animated') || entry.target.classList.contains('animate-in')) {
          return;
        }

        if (entry.isIntersecting) {
          // Adiciona delay pequeno para evitar conflitos
          setTimeout(() => {
            if (!entry.target.hasAttribute('data-animated')) {
              entry.target.classList.add('animate-in');
              entry.target.setAttribute('data-animated', 'true');
              this.observer.unobserve(entry.target);
            }
          }, 50);
        }
      });
    }, options);

    this.observeElements();
  }

  observeElements() {
    const elementsToAnimate = document.querySelectorAll([
      '.diferencial-card',
      '.reason-item',
      '.stat-card',
      '.galeria-item',
      '.parceiro-card',
      '.indicator',
      '.contact-form-container',
      '.contact-item',
      '.cta-card'
    ].join(', '));

    elementsToAnimate.forEach(element => {
      // Pula elementos já processados
      if (element.hasAttribute('data-animated') || element.classList.contains('animate-in')) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

      if (isVisible) {
        element.classList.add('animate-in');
        element.setAttribute('data-animated', 'true');
      } else {
        element.classList.add('animate-on-scroll');
        this.observer.observe(element);
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Inicializa apenas uma vez
if (!window.scrollAnimationsInitialized) {
  window.scrollAnimationsInitialized = true;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.scrollAnimations = new ScrollAnimations();
    });
  } else {
    window.scrollAnimations = new ScrollAnimations();
  }
}