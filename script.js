document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Dynamic Mobile Navigation Menu Toggle
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');

  // Create and inject hamburger button for mobile view
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'mobile-toggle';
  mobileToggle.setAttribute('aria-label', 'Toggle Menu');
  mobileToggle.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="3" y1="12" x2="21" y2="12" class="line-mid"></line>
      <line x1="3" y1="6" x2="21" y2="6" class="line-top"></line>
      <line x1="3" y1="18" x2="21" y2="18" class="line-bot"></line>
    </svg>
  `;
  navContainer.insertBefore(mobileToggle, navLinks);

  // Toggle mobile menu visibility
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('open');
  });

  /* ==========================================================================
     2. Smooth Scrolling for Internal Links
     ========================================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Ignore dummy anchor links without matching element
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('open');

        // Smooth scroll to section with header offset
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     3. Active Link Highlighting on Scroll (Scrollspy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const correspondingNavLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (correspondingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingNavLink.classList.add('active-link');
        } else {
          correspondingNavLink.classList.remove('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ==========================================================================
     4. Interactive Modal Popup for CTA & Card Buttons
     ========================================================================== */
  // Create Modal element dynamically
  const modal = document.createElement('div');
  modal.className = 'custom-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close Modal">&times;</button>
      <div class="modal-body">
        <span class="modal-badge">✨ Showcase Feature</span>
        <h3 class="modal-title">Project Details</h3>
        <p class="modal-desc">This interactive module displays detailed project documentation, assets, or live demo previews.</p>
        <button class="btn btn-primary modal-action-btn">Got it</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = modal.querySelector('.modal-close');
  const modalActionBtn = modal.querySelector('.modal-action-btn');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');

  function openModal(title, description) {
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  [modalOverlay, modalClose, modalActionBtn].forEach(element => {
    element.addEventListener('click', closeModal);
  });

  // Attach dynamic popup actions to card links & buttons without fixed targets
  const cardLinks = document.querySelectorAll('.card-link');
  cardLinks.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const parentHeading = card.parentElement.querySelector('h3').textContent;
      const parentText = card.parentElement.querySelector('p').textContent;
      openModal(parentHeading, parentText);
    });
  });

  // Secondary CTA button interaction
  const secondaryBtn = document.querySelector('.btn-secondary');
  if (secondaryBtn) {
    secondaryBtn.addEventListener('click', (e) => {
      if (secondaryBtn.getAttribute('href') === '#about' && !document.querySelector('#about')) {
        e.preventDefault();
        openModal('Tech Stack Overview', 'Frontend Architecture: HTML5, Modern CSS Grid & Flexbox, Dynamic Vanilla JS ES6+.');
      }
    });
  }

});
                          
