// Intersection Observer para animações no scroll
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'down';
    this.init();
  }

  init() {
    // Configuração do observer
    const options = {
      threshold: 0.1, // Trigger quando 10% do elemento estiver visível
      rootMargin: '0px 0px -50px 0px' // Trigger um pouco antes do elemento entrar na tela
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Verifica se o elemento já foi animado antes
        if (entry.target.hasAttribute('data-animated')) {
          return;
        }

        if (entry.isIntersecting && this.scrollDirection === 'down') {
          entry.target.classList.add('animate-in');
          entry.target.setAttribute('data-animated', 'true');
          // Para elementos que só devem animar uma vez
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observeElements();
  }

  observeElements() {
    // Seleciona todos os elementos que devem ter animação no scroll
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
      // Verifica se o elemento já está visível na tela no carregamento
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        // Se já está visível, anima imediatamente
        element.classList.add('animate-in');
        element.setAttribute('data-animated', 'true');
      } else {
        // Se não está visível, adiciona classe inicial e observa
        element.classList.add('animate-on-scroll');
        this.observer.observe(element);
      }
    });

    // Adiciona listener para detectar direção do scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
          this.lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
});

// Para desenvolvimento - reinicializa se a página for recarregada via HMR
if (typeof window !== 'undefined' && window.scrollAnimations) {
  window.scrollAnimations.destroy();
}
window.scrollAnimations = new ScrollAnimations();