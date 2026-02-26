// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
const navLinks = [...document.querySelectorAll(".nav__link")];

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // close on click
  navLinks.forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // close outside
  document.addEventListener("click", (e) => {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Active section highlight
const sections = [...document.querySelectorAll("main section[id]")];
const byId = (id) => document.querySelector(`a[href="#${id}"]`);

const ioActive = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = byId(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("is-active"));
      link.classList.add("is-active");
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 });

sections.forEach(s => ioActive.observe(s));

// Reveal on scroll
const revealables = document.querySelectorAll(".card, .section__head, .hero__copy, .hero__aside");
revealables.forEach(el => el.classList.add("reveal"));

const ioReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("is-in");
  });
}, { threshold: 0.12 });

revealables.forEach(el => ioReveal.observe(el));

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();