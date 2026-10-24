// --- 1. Dynamic Typewriter Animation ---
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
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
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

// --- 4. Real Database Form Submission via FastAPI ---
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

if (contactForm && toast) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toastMsg.textContent = data.message || `Message stored successfully!`;
        toast.classList.add("show");
        contactForm.reset();
      } else {
        toastMsg.textContent = data.detail || "Error saving message. Please check inputs.";
        toast.classList.add("show");
      }
    } catch (err) {
      console.error(err);
      toastMsg.textContent = "Backend server is offline! Run `uvicorn app:app --reload`";
      toast.classList.add("show");
    }

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
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