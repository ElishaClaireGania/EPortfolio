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

  setTimeout(typeWriter, 1200);
});
