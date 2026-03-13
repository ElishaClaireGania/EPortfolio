(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    let pageName = "Home";

    if (path.includes("about")) pageName = "About";
    else if (path.includes("projects") || path.includes("works"))
      pageName = "Works";
    else if (path.includes("contact")) pageName = "Contact";

    const pageNameElement = document.getElementById("loadingPageName");
    if (pageNameElement) {
      pageNameElement.textContent = pageName;
    }

    setTimeout(function () {
      const loadingScreen = document.getElementById("page-loading");
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");

        setTimeout(function () {
          loadingScreen.style.display = "none";
          setTimeout(initFadeInTransitions, 50);
        }, 600);
      }
    }, 3000);
  });
})();

/* ============ FADE IN TRANSITION ============ */
function initFadeInTransitions() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll(".reveal");
  hiddenElements.forEach((el) => observer.observe(el));

  console.log("Fade-in transitions initialized after loading screen");
}
