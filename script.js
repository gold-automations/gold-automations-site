// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const body = document.body;

navToggle.addEventListener('click', () => {
  const isOpen = body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// Hero glow follows cursor
const heroSection = document.getElementById('heroSection');
const heroGlow = document.getElementById('heroGlow');
if (heroSection && heroGlow) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroGlow.style.transform = `translate(${x - 240}px, ${y - 240}px)`;
  });
}

// Spotlight cursor-follow glow
document.querySelectorAll('.spotlight').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Contact form -> mailto
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const business = document.getElementById('business').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = `Enquiry from ${name}${business ? ' - ' + business : ''}`;
  const bodyLines = [
    `Name: ${name}`,
    business ? `Business: ${business}` : null,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    '',
    message || '(No message provided)'
  ].filter(Boolean);

  const mailto = `mailto:nathangoldautomations@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  window.location.href = mailto;
});
