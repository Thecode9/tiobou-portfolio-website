/* -------------------------------------------------
   Elite Tech-Professional Portfolio Controller
   Tiobou Fofou Milton Raille - Interactions & Animations
   ------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==== Sticky Navigation backdrop change on scroll ====
  const navbar = document.querySelector('.site-nav');
  const handleScrollNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollNavbar);
  handleScrollNavbar(); // Initial run

  // ==== Mobile Menu Navigation Toggle ====
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const isExpanded = navLinksContainer.classList.contains('active');
      navToggle.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Close mobile menu when clicking on links
    const links = navLinksContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // ==== Back to Top Button Actions ====
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==== Scroll Reveal Effects (IntersectionObserver) ====
  const revealElements = document.querySelectorAll('.reveal-element');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to keep scrolling fast and fluid
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==== Navigation Active Link Highlighting on Scroll ====
  const sections = document.querySelectorAll('section, header');
  const navItems = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      if (section.id) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${section.id}`) {
              item.classList.add('active');
            }
          });
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // ==== Form Submission Handling ====
  const contactForm = document.getElementById('portfolioContactForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (contactForm && successModal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload
      
      // Perform form value validation (basic browser-level is active, but we can log details)
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      console.log('Sending Form Submission:', { name, email, message });

      // Trigger modern success overlay popup
      successModal.classList.add('active');
      
      // Reset form fields
      contactForm.reset();
    });
  }

  if (successModal && closeModalBtn) {
    // Close modal when clicking close button
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // Close modal when clicking outside modal box
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

});
