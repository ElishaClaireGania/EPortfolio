(function () {
  const SPLASH_TIME = 4000;

  function initMovingFlowers() {
    const splash = document.getElementById("splash-screen");
    if (!splash) return;

    let container = document.querySelector(".moving-flowers-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "moving-flowers-container";
      splash.appendChild(container);
    }

    const colors = ["#b8a3c2", "#d0c4d8", "#9e83b8", "#6d5881"];
    for (let i = 0; i < 60; i++) {
      createFlower(container, colors);
    }
  }

  function createFlower(container, colors) {
    const sizes = [12, 18, 24, 30];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size + 1);
    svg.setAttribute("viewBox", "0 0 55 59");
    svg.classList.add("moving-flower-svg");
    svg.classList.add(`move-type-${Math.floor(Math.random() * 6) + 1}`);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M27.5 0C47.8546 0 29.3435 20.3607 31.8617 21.8357C34.3799 23.3107 42.505 -3.13342 52.6823 14.75C62.8596 32.6334 36.2234 26.55 36.2234 29.5C36.2234 32.45 62.8596 26.3666 52.6823 44.25C42.505 62.1334 34.3799 35.6893 31.8617 37.1643C29.3435 38.6393 47.8546 59 27.5 59C7.14541 59 25.6565 38.6393 23.1383 37.1643C20.6201 35.6893 12.495 62.1334 2.31773 44.25C-7.85956 26.3666 18.7766 32.45 18.7766 29.5C18.7766 26.55 -7.85956 32.6334 2.31773 14.75C12.495 -3.13342 20.6201 23.3107 23.1383 21.8357C25.6565 20.3607 7.14541 0 27.5 0Z",
    );
    path.setAttribute("fill", color);

    svg.appendChild(path);
    svg.style.left = Math.random() * 100 + "%";
    svg.style.top = Math.random() * 100 + "%";
    svg.style.animationDuration = Math.random() * 5 + 5 + "s";
    svg.style.opacity = Math.random() * 0.3 + 0.1;

    container.appendChild(svg);
  }

  function revealHeroContent() {
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
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMovingFlowers();

    setTimeout(() => {
      const splash = document.getElementById("splash-screen");
      if (splash) {
        splash.style.opacity = "0";
        splash.style.pointerEvents = "none";

        setTimeout(() => {
          splash.style.display = "none";
          revealHeroContent();
        }, 800);
      }
    }, SPLASH_TIME);
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll(".home-content p");

  const originalTexts = [];
  paragraphs.forEach((p, index) => {
    originalTexts[index] = p.textContent.trim();
    p.textContent = "";
  });

  let currentParagraph = 0;
  let currentChar = 0;

  function typeWriter() {
    if (currentParagraph < paragraphs.length) {
      const p = paragraphs[currentParagraph];
      const text = originalTexts[currentParagraph];

      p.classList.add("typing-cursor");

      if (currentChar < text.length) {
        p.textContent += text.charAt(currentChar);
        currentChar++;
        setTimeout(typeWriter, 40);
      } else {
        p.classList.remove("typing-cursor");
        currentParagraph++;
        currentChar = 0;
        setTimeout(typeWriter, 600);
      }
    }
  }

  setTimeout(typeWriter, 4800);
});
