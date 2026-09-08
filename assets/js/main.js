/**
 * Krunal Panchal - Portfolio & Resume Interactive Scripts
 * Pure Vanilla ES6 - Zero external runtime dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollSpy();
  initMetricsCounter();
  initProjectFilter();
  initMessageDrafter();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Management (Dark/Light with LocalStorage)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('kp_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default obsidian dark
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('kp_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById('theme-icon');
  if (!iconSpan) return;
  
  if (theme === 'light') {
    // Show Moon icon for light mode (switch to dark)
    iconSpan.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    iconSpan.parentElement.setAttribute('title', 'Switch to Dark Mode');
  } else {
    // Show Sun icon for dark mode (switch to light)
    iconSpan.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    iconSpan.parentElement.setAttribute('title', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      hamburgerBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '&#9776;';
      });
    });
  }
}

/* ==========================================================================
   3. Scroll Spy & Active Nav Link
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. Animated Metric Counters
   ========================================================================== */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.metric-number[data-target]');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = counter.getAttribute('data-decimal') === 'true';
          const duration = 1600;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            const currentVal = (target * easeOut);

            if (isDecimal) {
              counter.textContent = currentVal.toFixed(1);
            } else {
              counter.textContent = Math.floor(currentVal);
            }

            if (currentStep >= totalSteps) {
              clearInterval(timer);
              counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.35 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   5. Interactive Project Category Filter
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Recruiter Quick Message Drafter (Directs to LinkedIn)
   ========================================================================== */
function initMessageDrafter() {
  const textarea = document.getElementById('recruiter-message');
  const presetChips = document.querySelectorAll('.preset-chip');
  const copyBtn = document.getElementById('copy-msg-btn');
  const sendLinkedinBtn = document.getElementById('send-linkedin-btn');

  const messageTemplates = {
    role: "Hi Krunal, I came across your impressive profile and track record in Android SDK architecture and mobile engineering (>99.9% crash-free across 10M+ sessions). We are currently looking for a Senior Android Developer / Mobile Solutions Architect to lead mobile initiatives at our company. Would you be open to an introductory discussion?",
    consulting: "Hi Krunal, I was reviewing your experience in building high-concurrency mobile architectures, BLE integrations, and KMM SDKs. We have an upcoming mobile architecture challenge and would love to consult with you. Let's connect!",
    quick: "Hi Krunal, I'm reaching out after seeing your portfolio and 250+ launched production apps. I'd love to connect on LinkedIn and stay in touch regarding engineering opportunities."
  };

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const type = chip.getAttribute('data-preset');
      if (textarea && messageTemplates[type]) {
        textarea.value = messageTemplates[type];
      }
    });
  });

  if (copyBtn && textarea) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(textarea.value).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> Copied!`;
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2200);
      });
    });
  }

  if (sendLinkedinBtn) {
    sendLinkedinBtn.addEventListener('click', () => {
      window.open('https://linkedin.com/in/krunalmobile', '_blank', 'noopener,noreferrer');
    });
  }
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
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
