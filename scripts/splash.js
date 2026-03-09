// Falling Flowers with Loading Bar
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    createFallingFlowers();
    setupSplashScreenRemoval();
  });

  function createFallingFlowers() {
    const fallingContainer = document.querySelector(".falling-flowers");
    if (!fallingContainer) return;

    fallingContainer.innerHTML = "";

    const colors = [
      "#b8a3c2", // --irismist
      "#d0c4d8", // --plumblossom
      "#f0e6f5", // --lightpurple
      "#9e83b8", // --midpurple
    ];

    for (let i = 0; i < 120; i++) {
      createFlowerSVG(fallingContainer, colors, i);
    }
  }

  function createFlowerSVG(container, colors, index) {
    const sizeRandom = Math.random();
    let width, height;

    if (sizeRandom < 0.3) {
      width = 15;
      height = 16;
    } else if (sizeRandom < 0.6) {
      width = 25;
      height = 27;
    } else {
      width = 35;
      height = 37;
    }

    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 55 59");
    svg.setAttribute("fill", "none");
    svg.classList.add("falling-flower-svg");

    // Create path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M27.5 0C47.8546 0 29.3435 20.3607 31.8617 21.8357C34.3799 23.3107 42.505 -3.13342 52.6823 14.75C62.8596 32.6334 36.2234 26.55 36.2234 29.5C36.2234 32.45 62.8596 26.3666 52.6823 44.25C42.505 62.1334 34.3799 35.6893 31.8617 37.1643C29.3435 38.6393 47.8546 59 27.5 59C7.14541 59 25.6565 38.6393 23.1383 37.1643C20.6201 35.6893 12.495 62.1334 2.31773 44.25C-7.85956 26.3666 18.7766 32.45 18.7766 29.5C18.7766 26.55 -7.85956 32.6334 2.31773 14.75C12.495 -3.13342 20.6201 23.3107 23.1383 21.8357C25.6565 20.3607 7.14541 0 27.5 0Z",
    );
    path.setAttribute("fill", color);
    svg.appendChild(path);

    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 5;

    const startPosition = Math.random() * -30 - 5;

    const startRotate = Math.random() * 360;
    const endRotate = startRotate + (Math.random() * 720 + 180);

    svg.style.left = Math.random() * 100 + "%";
    svg.style.top = startPosition + "%";
    svg.style.animationDuration = duration + "s";
    svg.style.animationDelay = delay + "s";
    svg.style.opacity = Math.random() * 0.5 + 0.3;
    svg.style.setProperty("--start-rotate", startRotate + "deg");
    svg.style.setProperty("--end-rotate", endRotate + "deg");
    svg.style.setProperty("--scale", (Math.random() * 0.5 + 0.7).toString());

    container.appendChild(svg);
  }

  function setupSplashScreenRemoval() {
    const splashScreen = document.getElementById("splash-screen");
    if (!splashScreen) return;

    setTimeout(function () {
      splashScreen.style.display = "none";

      const elementsToReveal = [
        document.querySelector(".name-block"),
        document.querySelector(".home-content"),
        document.querySelector(".vertical-line"),
        document.querySelector(".horizontal-line"),
        document.querySelector(".flower-container"),
      ];

      elementsToReveal.forEach((el) => {
        if (el) el.classList.add("reveal-content");
      });
    }, 4800);
  }
})();
