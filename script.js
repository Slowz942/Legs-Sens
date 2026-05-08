/* =========================================================
   LEGS & SENS — Interactions
   ========================================================= */

(function() {
  'use strict';

  // Header — ombre au scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Fermer le menu après clic sur lien
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Reveal-on-scroll
  const revealTargets = document.querySelectorAll(
    '.section-head, .stat, .audience-card, .service-card, .timeline-item, .method-step, .testimonial, .faq-item, .ressource-block, .contact-grid'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('visible'));
  }

  // FAQ — refermer les autres à l'ouverture (style accordéon)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();

// Lead-magnet (livre blanc)
function handleLeadMagnet(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="email"]');
  const email = input.value.trim();
  if (!email) return false;
  alert("Merci ! Le livre blanc vous sera envoyé à l'adresse " + email + " dès que la version définitive sera prête.");
  input.value = '';
  return false;
}

// Formulaire de contact (placeholder — à brancher sur backend ou Formspree/Netlify Forms)
function handleContact(event) {
  event.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = "Merci, votre demande a bien été enregistrée. Valérie vous recontactera sous 48 heures ouvrées.";
  status.className = 'form-status success';
  event.target.reset();
  return false;
}
