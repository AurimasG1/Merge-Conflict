"use strict";

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

let lastFocusedElement = null;

function getFocusable() {
  return mobileMenu.querySelectorAll(
    'a, button, [tabindex]:not([tabindex="-1"])'
  );
}

function trapFocus(e) {
  if (mobileMenu.hidden) return;
  if (e.key !== "Tab") return;

  const focusable = getFocusable();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function openMobileMenu() {
  lastFocusedElement = document.activeElement;

  mobileMenu.hidden = false;
  mobileMenu.classList.add("active");

  openMenu.setAttribute("aria-expanded", "true");
  openMenu.setAttribute("aria-label", "Close menu");

  document.body.style.overflow = "hidden";

  document.querySelector(".desktop-links").inert = true;

  closeMenu.focus();
}

function closeMobileMenu() {
  mobileMenu.hidden = true;
  mobileMenu.classList.remove("active");

  openMenu.setAttribute("aria-expanded", "false");
  openMenu.setAttribute("aria-label", "Open menu"); // ← added

  document.body.style.overflow = "";

  document.querySelector(".desktop-links").inert = false;

  if (lastFocusedElement) lastFocusedElement.focus();
}

openMenu.addEventListener("click", openMobileMenu);
closeMenu.addEventListener("click", closeMobileMenu);

document.addEventListener("keydown", trapFocus);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !mobileMenu.hidden) {
    closeMobileMenu();
  }
});



