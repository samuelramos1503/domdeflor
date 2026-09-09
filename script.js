// ==========================================================================
// DOM DE FLOR - SCRIPT INTERATIVO (CARROSSEL, MENU & MONTADOR DE PEDIDOS)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. MENU MOBILE
  const burger = document.getElementById('burger');
  const navWrapper = document.getElementById('navWrapper');

  if (burger && navWrapper) {
    burger.addEventListener('click', () => {
      const isActive = navWrapper.classList.toggle('active');
      burger.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navWrapper.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navWrapper.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. MONTADOR INTERATIVO DE PEDIDO / PROJETO
  const optionCards = document.querySelectorAll('.option-card');
  const btnSendOrder = document.getElementById('btnSendOrder');

  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const group = card.getAttribute('data-group');
      const siblings = document.querySelectorAll(`.option-card[data-group="${group}"]`);
      siblings.forEach(s => s.classList.remove('active'));
      card.classList.add('active');
    });
  });

  if (btnSendOrder) {
    btnSendOrder.addEventListener('click', () => {
      const activeServico = document.querySelector('.option-card[data-group="servico"].active');
      const activeEstilo = document.querySelector('.option-card[data-group="estilo"].active');
      const activeAdicional = document.querySelector('.option-card[data-group="adicional"].active');

      const servicoVal = activeServico ? activeServico.getAttribute('data-value') : 'Buquê ou Arranjo Floral';
      const estiloVal = activeEstilo ? activeEstilo.getAttribute('data-value') : 'Delicado & Elegante';
      const adicionalVal = activeAdicional ? activeAdicional.getAttribute('data-value') : 'Com Cartão Especial';

      const message = `Ol%C3%A1%2C%20gostaria%20de%20fazer%20uma%20solicita%C3%A7%C3%A3o%20na%20Dom%20de%20Flor!%0A%0A%F0%9F%8D%83%20*Servi%C3%A7o%20Desejado:*%20${encodeURIComponent(servicoVal)}%0A%F0%9F%8C%9F%20*Estilo/Porte:*%20${encodeURIComponent(estiloVal)}%0A%F0%9F%92%9C%20*Adicional/Prefer%C3%AAucia:*%20${encodeURIComponent(adicionalVal)}%0A%0AGostaria%20de%20saber%20valores%20e%20disponibilidade!`;

      const whatsappUrl = `https://wa.me/5531995741327?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 3. CARROSSEL DE REVIEWS (GOOGLE REVIEWS)
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('revPrevBtn');
  const nextBtn = document.getElementById('revNextBtn');
  const dotsContainer = document.getElementById('reviewsDots');

  if (track) {
    const cards = Array.from(track.querySelectorAll('.review-card'));
    let currentIdx = 0;

    if (dotsContainer && dotsContainer.children.length === 0) {
      cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => scrollToIndex(idx));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];

    function scrollToIndex(index) {
      if (cards.length === 0) return;
      if (index < 0) index = 0;
      if (index >= cards.length) index = cards.length - 1;
      currentIdx = index;

      cards[currentIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      if (dots.length > 0) {
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => scrollToIndex(currentIdx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToIndex(currentIdx + 1));
  }

});
