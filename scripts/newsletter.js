(function () {
  console.log(
    "Newsletter.js loaded",
    document.getElementById("newsletterForm"),
  );

  const EMAILJS_CONFIG = {
    PUBLIC_KEY: "RYooBE-CVZSPN6bBc",
    SERVICE_ID: "service_a1vzs5w",
    NEWSLETTER_TEMPLATE_ID: "template_t999fvj",
  };

  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.getElementById("newsletterForm");
    if (!newsletterForm) {
      console.log("Newsletter form not found");
      return;
    }

    console.log("Newsletter form found, initializing...");

    const modal = createNewsletterModal();
    document.body.appendChild(modal);

    const messageContainer = document.createElement("div");
    messageContainer.className = "newsletter-message-container";
    messageContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000002;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(messageContainer);

    // Add animation styles
    if (!document.querySelector("#newsletter-message-styles")) {
      const style = document.createElement("style");
      style.id = "newsletter-message-styles";
      style.textContent = `
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes messageSlideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(50px);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Remove any existing event listeners by cloning and replacing
    const newForm = newsletterForm.cloneNode(true);
    newsletterForm.parentNode.replaceChild(newForm, newsletterForm);

    newForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("Form submitted");

      const emailInput = document.getElementById("newsletter-email");
      const messageInput = document.getElementById("newsletter-message");

      if (!emailInput || !messageInput) {
        console.log("Input fields not found");
        return;
      }

      const formData = {
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
      };

      console.log("Form data:", formData);

      // Validate form
      if (!formData.email || !formData.message) {
        showNewsletterMessage(
          "error",
          "Please fill in all fields",
          messageContainer,
        );
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showNewsletterMessage(
          "error",
          "Please enter a valid email address",
          messageContainer,
        );
        return;
      }

      // Show confirmation modal
      showNewsletterModal(modal, formData, async (confirmed) => {
        if (confirmed) {
          await sendNewsletterEmail(formData, newForm, messageContainer);
        }
        hideNewsletterModal(modal);
      });
    });
  });

  function createNewsletterModal() {
    const modal = document.createElement("div");
    modal.className = "newsletter-confirm-modal";
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000001;
      font-family: 'Raleway', sans-serif;
    `;

    modal.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #392347 0%, #4a2b5a 100%);
        border-radius: 20px;
        padding: 25px;
        max-width: 420px;
        width: 90%;
        max-height: 85vh;
        border: 2px solid #b8a3c2;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: modalSlideIn 0.3s ease;
        display: flex;
        flex-direction: column;
      ">
        <div style="text-align: center; margin-bottom: 15px; flex-shrink: 0;">
          <svg width="35" height="40" viewBox="0 0 55 59" fill="none" style="margin-bottom: 8px;">
            <path d="M27.5 0C47.8546 0 29.3435 20.3607 31.8617 21.8357C34.3799 23.3107 42.505 -3.13342 52.6823 14.75C62.8596 32.6334 36.2234 26.55 36.2234 29.5C36.2234 32.45 62.8596 26.3666 52.6823 44.25C42.505 62.1334 34.3799 35.6893 31.8617 37.1643C29.3435 38.6393 47.8546 59 27.5 59C7.14541 59 25.6565 38.6393 23.1383 37.1643C20.6201 35.6893 12.495 62.1334 2.31773 44.25C-7.85956 26.3666 18.7766 32.45 18.7766 29.5C18.7766 26.55 -7.85956 32.6334 2.31773 14.75C12.495 -3.13342 20.6201 23.3107 23.1383 21.8357C25.6565 20.3607 7.14541 0 27.5 0Z" fill="#f0e6f5" fill-opacity="0.2"/>
          </svg>
          <h3 style="color: #f0e6f5; margin: 0; font-size: 20px;">Confirm Message</h3>
          <div style="height: 2px; background: linear-gradient(90deg, transparent, #b8a3c2, #f0e6f5, #b8a3c2, transparent); width: 60px; margin: 8px auto;"></div>
        </div>

        <div id="newsletter-modal-content" style="
          background: rgba(109, 88, 129, 0.2); 
          border-radius: 12px; 
          padding: 15px; 
          margin-bottom: 15px; 
          border: 1px solid #b8a3c2;
          overflow-y: auto;
          max-height: 50vh;
          flex: 1;
        ">
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-shrink: 0;">
          <button id="newsletter-modal-cancel" style="
            background: transparent;
            border: 2px solid #b8a3c2;
            color: #f0e6f5;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Raleway', sans-serif;
            transition: all 0.3s ease;
            flex: 1;
            font-size: 15px;
            letter-spacing: 0.5px;
          ">Cancel</button>
          <button id="newsletter-modal-confirm" style="
            background: linear-gradient(135deg, #1b4c16 0%, #2a6b23 100%);
            border: none;
            color: #f0e6f5;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Raleway', sans-serif;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(27, 76, 22, 0.4);
            flex: 1;
            font-size: 15px;
            letter-spacing: 0.5px;
          ">Send ✓</button>
        </div>
      </div>
    `;

    // Add hover styles
    const style = document.createElement("style");
    style.textContent = `
      #newsletter-modal-cancel:hover {
        background: rgba(184, 163, 194, 0.2) !important;
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 8px 20px rgba(184, 163, 194, 0.3) !important;
        border-color: #f0e6f5 !important;
        color: #ffffff !important;
      }

      #newsletter-modal-confirm:hover {
        background: linear-gradient(135deg, #2a6b23 0%, #1b4c16 100%) !important;
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 10px 25px rgba(27, 76, 22, 0.6) !important;
        border: 2px solid #f0e6f5 !important;
      }

      #newsletter-modal-cancel:active {
        transform: translateY(2px) scale(0.98) !important;
        box-shadow: 0 2px 10px rgba(184, 163, 194, 0.2) !important;
      }

      #newsletter-modal-confirm:active {
        transform: translateY(2px) scale(0.98) !important;
        box-shadow: 0 2px 10px rgba(27, 76, 22, 0.3) !important;
      }
    `;
    document.head.appendChild(style);

    return modal;
  }

  function showNewsletterModal(modal, formData, callback) {
    const modalContent = modal.querySelector("#newsletter-modal-content");

    const truncatedMessage =
      formData.message.length > 150
        ? formData.message.substring(0, 150) + "..."
        : formData.message;

    modalContent.innerHTML = `
      <div style="color: #f0e6f5;">
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #b8a3c2;">
          <span style="color: #b8a3c2; font-size: 11px; display: block; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
          <strong style="font-size: 14px; word-break: break-word;">${formData.email}</strong>
        </div>
        <div>
          <span style="color: #b8a3c2; font-size: 11px; display: block; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Message</span>
          <div style="
            background: rgba(57, 35, 71, 0.5); 
            padding: 10px; 
            border-radius: 8px;
            max-height: 150px;
            overflow-y: auto;
            font-size: 13px;
            line-height: 1.5;
            word-wrap: break-word;
            white-space: pre-wrap;
          ">
            ${truncatedMessage}
          </div>
          ${formData.message.length > 150 ? '<p style="margin: 5px 0 0; color: #b8a3c2; font-size: 11px; text-align: right;">Message truncated (full message will be sent)</p>' : ""}
        </div>
      </div>
    `;

    const confirmBtn = modal.querySelector("#newsletter-modal-confirm");
    const cancelBtn = modal.querySelector("#newsletter-modal-cancel");

    const confirmHandler = () => {
      callback(true);
      cleanup();
    };

    const cancelHandler = () => {
      callback(false);
      cleanup();
    };

    const cleanup = () => {
      confirmBtn.removeEventListener("click", confirmHandler);
      cancelBtn.removeEventListener("click", cancelHandler);
    };

    confirmBtn.addEventListener("click", confirmHandler);
    cancelBtn.addEventListener("click", cancelHandler);

    modal.style.display = "flex";
  }

  function hideNewsletterModal(modal) {
    modal.style.display = "none";
  }

  async function sendNewsletterEmail(data, form, messageContainer) {
    const submitBtn = document.getElementById("newsletterSubmit");
    if (!submitBtn) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="cursive-button">Sending...</span>';
    submitBtn.disabled = true;

    const templateParams = {
      from_email: data.email,
      message: data.message,
      time: new Date().toLocaleString(),
      to_email: "elishaclairegania@gmail.com",
    };

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID,
        templateParams,
      );

      console.log("Newsletter email sent successfully!", response);

      showNewsletterMessage(
        "success",
        "Thanks for reaching out! I'll get back to you soon.",
        messageContainer,
      );

      form.reset();
    } catch (error) {
      console.error("Failed to send newsletter email:", error);

      showNewsletterMessage(
        "error",
        "Failed to send message. Please try again or email me directly.",
        messageContainer,
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  function showNewsletterMessage(type, message, container) {
    const messageEl = document.createElement("div");

    const isSuccess = type === "success";
    const bgColor = isSuccess ? "#1b4c16" : "#6d5881";
    const icon = isSuccess ? "✓" : "!";
    const title = isSuccess ? "Thank You!" : "Oops!";

    messageEl.style.cssText = `
      background: linear-gradient(135deg, ${bgColor}, ${isSuccess ? "#2a6b23" : "#392347"});
      color: #f0e6f5;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      font-family: 'Raleway', sans-serif;
      border-left: 4px solid ${isSuccess ? "#f0e6f5" : "#b8a3c2"};
      backdrop-filter: blur(10px);
      animation: messageSlideIn 0.4s ease;
      max-width: 380px;
      width: 100%;
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 15px;
      border: 1px solid rgba(240, 230, 245, 0.2);
      margin-bottom: 10px;
    `;

    messageEl.innerHTML = `
      <div style="
        background: rgba(255,255,255,0.15);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        flex-shrink: 0;
        border: 1px solid rgba(240, 230, 245, 0.3);
      ">${icon}</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; margin-bottom: 6px; font-size: 16px; letter-spacing: 0.3px;">${title}</div>
        <div style="font-size: 14px; opacity: 0.95; line-height: 1.5;">${message}</div>
      </div>
      <button style="
        background: none;
        border: none;
        color: #f0e6f5;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.6;
        padding: 0 5px;
        pointer-events: auto;
        transition: opacity 0.2s ease;
      " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(messageEl);

    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.style.animation = "messageSlideOut 0.3s ease forwards";
        setTimeout(() => {
          if (messageEl.parentNode) messageEl.remove();
        }, 300);
      }
    }, 5000);
  }
})();
