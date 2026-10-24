// --- 1. Typewriter Animation for Python Backend Developer ---
const roles = [
  "Python Backend Developer",
  "REST API & Database Engineer",
  "Automation & Scripting Specialist",
  "BCA Final Year Student"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTarget = document.getElementById("typingText");

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingTarget.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 85;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1800; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400; // Pause before typing next word
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingTarget) typeEffect();
});

// --- 2. Mobile Responsive Navbar Toggle ---
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// --- 3. Category Filter for Projects ---
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedFilter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (selectedFilter === "all" || cardCategory === selectedFilter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// --- 4. Contact Form Submission Toast ---
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

if (contactForm && toast) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameVal = document.getElementById("name").value.trim();
    if (toastMsg) {
      toastMsg.textContent = `Thank you, ${nameVal}! Titu Kumar ko aapka message mil gaya.`;
    }

    toast.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  });
}

// --- 5. Active Navbar Link on Scroll ---
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");
    const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

    if (activeLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        activeLink.style.color = "var(--accent-cyan)";
      } else {
        activeLink.style.color = "";
      }
    }
  });
});