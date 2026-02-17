"use strict";

/* =========================
   MOBILE MENU
========================= */
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

if (openMenu && closeMenu && mobileMenu) {
  openMenu.addEventListener("click", () => {
    mobileMenu.hidden = false;
    openMenu.setAttribute("aria-expanded", "true");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.hidden = true;
    openMenu.setAttribute("aria-expanded", "false");
  });
}

/* =========================
   CONTACT FORM VALIDATION
========================= */
const form = document.querySelector(".contact-form");

if (form) {
  const requiredInputs = form.querySelectorAll("input[required], textarea[required]");
  const emailInput = form.querySelector('input[type="email"]');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasError = false;

    requiredInputs.forEach((input) => {
      removeError(input);

      // Empty check
      if (input.value.trim() === "") {
        showError(input, "This field can’t be empty");
        hasError = true;        
        return;
      }

      // Email check
      if (input === emailInput && !emailRegex.test(input.value.trim())) {
        showError(input, "Please enter a valid email address");
        hasError = true;
      }
    });

    if (!hasError) {
      console.log("Form submitted ✔");
      form.reset();
    }
  });

  // Remove error while typing
  requiredInputs.forEach((input) => {
    input.addEventListener("input", () => removeError(input));
  });
}

/* =========================
   ERROR FUNCTIONS
========================= */
function showError(input, message) {
  input.classList.add("input-error");

  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("error-text")) {
    error = document.createElement("div");
    error.className = "error-text";
    input.after(error);
  }

  error.textContent = message;
}

function removeError(input) {
  input.classList.remove("input-error");

  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-text")) {
    error.remove();
  }
}
