"use strict";
// "use strict"

// // Sliding menu for mobile Home page
// const openMenu = document.getElementById("openMenu");
// const closeMenu = document.getElementById("closeMenu");
// const mobileMenu = document.getElementById("mobileMenu");

// openMenu.addEventListener("click", () => {
//   mobileMenu.classList.add("active");
// });

// closeMenu.addEventListener("click", () => {
//   mobileMenu.classList.remove("active");
// });

// // Contact page activity
// const form = document.querySelector(".contact-form");
// const requiredInputs = form.querySelectorAll(".form-group input");
// const emailInput = document.getElementById("email");

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // submit validation
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   requiredInputs.forEach((input) => {
//     const formGroup = input.parentElement;
//     const errorMessage = formGroup.querySelector(".error-message");

//     // empty field check
//     if (input.value.trim() === "") {
//       formGroup.classList.add("error");
//       errorMessage.textContent = "This field can’t be empty";
//       return;
//     }

//     // email format check
//     if (input === emailInput && !emailRegex.test(input.value)) {
//       formGroup.classList.add("error");
//       errorMessage.textContent = "Please enter a valid email address";
//       return;
//     }

//     // valid field
//     formGroup.classList.remove("error");
//   });
// });

// // remove error while typing
// requiredInputs.forEach((input) => {
//   input.addEventListener("input", () => {
//     input.parentElement.classList.remove("error");
//   });
// });

// const status = document.getElementById("form-status");
// status.textContent = "Message sent successfully!";

"use strict";

// ===== CONTACT FORM =====
const form = document.querySelector(".contact-form");
const formGroups = form.querySelectorAll(".form-group");
const requiredInputs = form.querySelectorAll(".form-group input[required]");
const emailInput = document.getElementById("email");
const status = document.getElementById("form-status");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formIsValid = true;
  let firstErrorInput = null;

  requiredInputs.forEach((input) => {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");

    // empty check
    if (input.value.trim() === "") {
      showError(input, formGroup, errorMessage, "This field can’t be empty");
      formIsValid = false;
      if (!firstErrorInput) firstErrorInput = input;
      return;
    }

    // email check
    if (input === emailInput && !emailRegex.test(input.value)) {
      showError(input, formGroup, errorMessage, "Please enter a valid email address");
      formIsValid = false;
      if (!firstErrorInput) firstErrorInput = input;
      return;
    }

    clearError(input, formGroup);
  });

  if (!formIsValid) {
    status.textContent = "Please fix the errors in the form.";
    firstErrorInput.focus();
    return;
  }

  // success
  if (formIsValid) {
  status.textContent = "Message sent successfully!";
  form.reset();

  status.focus();   // <-- HERE
}

});

// remove error while typing
requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    clearError(input, input.parentElement);
  });
});

// ===== helpers =====
function showError(input, formGroup, errorMessage, message) {
  formGroup.classList.add("error");
  errorMessage.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearError(input, formGroup) {
  formGroup.classList.remove("error");
  input.removeAttribute("aria-invalid");
}
