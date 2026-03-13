document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const body = document.body;

  const closeMenu = () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    body.style.overflow = "auto";
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
    body.style.overflow = isActive ? "hidden" : "auto";
  });

  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
});
