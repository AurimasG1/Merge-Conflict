"use strict"

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

openMenu.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

 
// Contact page activity
const form = document.querySelector(".contact-form");
const requiredInputs = form.querySelectorAll(".form-group input");
const emailInput = document.getElementById("email");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// submit validation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  requiredInputs.forEach((input) => {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");

    // empty field check
    if (input.value.trim() === "") {
      formGroup.classList.add("error");
      errorMessage.textContent = "This field can’t be empty";
      return;
    }

    // email format check
    if (input === emailInput && !emailRegex.test(input.value)) {
      formGroup.classList.add("error");
      errorMessage.textContent = "Please enter a valid email address";
      return;
    }

    // valid field
    formGroup.classList.remove("error");
  });
});

// remove error while typing
requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("error");
  });
});