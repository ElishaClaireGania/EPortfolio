(function () {
  const EMAILJS_CONFIG = {
    PUBLIC_KEY: "RYooBE-CVZSPN6bBc",
    SERVICE_ID: "service_a1vzs5w",
    TEMPLATE_ID: "template_gm5sgk2",
  };

  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");
    if (!contactForm) return;

    const modal = createCustomModal();
    document.body.appendChild(modal);

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        from_name: document.getElementById("user-name").value.trim(),
        phone: document.getElementById("user-phone").value.trim(),
        from_email: document.getElementById("user-email").value.trim(),
        message: document.getElementById("user-message").value.trim(),
      };

      if (!validateForm(formData)) return;

      showCustomModal(modal, formData, async (confirmed) => {
        if (confirmed) {
          await sendEmail(formData, contactForm);
        }
        hideCustomModal(modal);
      });
    });
  });

  function createCustomModal() {
    const modal = document.createElement("div");
    modal.className = "custom-confirm-modal";
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

        <div id="modal-content" style="
          background: rgba(109, 88, 129, 0.2); 
          border-radius: 12px; 
          padding: 15px; 
          margin-bottom: 15px; 
          border: 1px solid #b8a3c2;
          overflow-y: auto;
          max-height: 50vh;
          flex: 1;
        ">
          <!-- Content will be inserted here dynamically -->
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-shrink: 0;">
          <button id="modal-cancel" style="
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
          <button id="modal-confirm" style="
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

    const style = document.createElement("style");
    style.textContent = `
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
      
      #modal-content::-webkit-scrollbar {
        width: 5px;
      }
      #modal-content::-webkit-scrollbar-track {
        background: rgba(184, 163, 194, 0.2);
        border-radius: 10px;
      }
      #modal-content::-webkit-scrollbar-thumb {
        background: #b8a3c2;
        border-radius: 10px;
      }

      #modal-cancel:hover {
        background: rgba(184, 163, 194, 0.2) !important;
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 8px 20px rgba(184, 163, 194, 0.3) !important;
        border-color: #f0e6f5 !important;
        color: #ffffff !important;
      }

      #modal-confirm:hover {
        background: linear-gradient(135deg, #2a6b23 0%, #1b4c16 100%) !important;
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 10px 25px rgba(27, 76, 22, 0.6) !important;
        border: 2px solid #f0e6f5 !important;
      }

      #modal-cancel:active {
        transform: translateY(2px) scale(0.98) !important;
        box-shadow: 0 2px 10px rgba(184, 163, 194, 0.2) !important;
      }

      #modal-confirm:active {
        transform: translateY(2px) scale(0.98) !important;
        box-shadow: 0 2px 10px rgba(27, 76, 22, 0.3) !important;
      }
    `;
    document.head.appendChild(style);

    return modal;
  }

  function showCustomModal(modal, formData, callback) {
    const modalContent = modal.querySelector("#modal-content");

    const truncatedMessage =
      formData.message.length > 150
        ? formData.message.substring(0, 150) + "..."
        : formData.message;

    modalContent.innerHTML = `
      <div style="color: #f0e6f5;">
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #b8a3c2;">
          <span style="color: #b8a3c2; font-size: 11px; display: block; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
          <strong style="font-size: 15px; word-break: break-word;">${formData.from_name}</strong>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #b8a3c2;">
          <span style="color: #b8a3c2; font-size: 11px; display: block; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
          <strong style="font-size: 14px; word-break: break-word;">${formData.from_email}</strong>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #b8a3c2;">
          <span style="color: #b8a3c2; font-size: 11px; display: block; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span>
          <strong style="font-size: 14px;">${formData.phone}</strong>
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

    const messageBox = modalContent.querySelector(
      'div[style*="overflow-y: auto"]',
    );
    if (messageBox) {
      messageBox.style.cssText += `
        scrollbar-width: thin;
        scrollbar-color: #b8a3c2 rgba(57, 35, 71, 0.5);
      `;
    }

    const confirmBtn = modal.querySelector("#modal-confirm");
    const cancelBtn = modal.querySelector("#modal-cancel");

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

  function hideCustomModal(modal) {
    modal.style.display = "none";
  }

  function validateForm(data) {
    if (!data.from_name || !data.phone || !data.from_email || !data.message) {
      alert("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.from_email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (data.phone.length < 5) {
      alert("Please enter a valid phone number");
      return false;
    }

    return true;
  }

  async function sendEmail(data, form) {
    const loadingAlert = showLoadingAlert();

    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      phone: data.phone,
      message: data.message,
      time: new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
      );

      console.log("Email sent successfully!", response);
      if (loadingAlert) loadingAlert.close();
      alert("Message sent successfully!\n\nI'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      if (loadingAlert) loadingAlert.close();
      alert(
        "Failed to send message.\n\n" +
          "Please try again or email me directly at:\n" +
          "elishaclairegania@gmail.com",
      );
    }
  }

  function showLoadingAlert() {
    const loadingDiv = document.createElement("div");
    loadingDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--midnightorchid, #392347);
      color: var(--lightpurple, #f0e6f5);
      padding: 20px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 1000000;
      font-family: var(--bodytext_buttons, 'Raleway', sans-serif);
      text-align: center;
      border: 2px solid var(--lightpurple, #f0e6f5);
      backdrop-filter: blur(10px);
      animation: fadeIn 0.3s ease;
    `;

    loadingDiv.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
        <div class="spinner" style="
          width: 40px;
          height: 40px;
          border: 4px solid rgba(240, 230, 245, 0.3);
          border-top: 4px solid var(--lightpurple, #f0e6f5);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <p style="margin: 0; font-size: 16px; font-weight: 500;">Sending your message...</p>
      </div>
    `;

    document.body.appendChild(loadingDiv);

    if (!document.querySelector("#loading-alert-styles")) {
      const style = document.createElement("style");
      style.id = "loading-alert-styles";
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -60%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
      `;
      document.head.appendChild(style);
    }

    return {
      close: function () {
        if (loadingDiv && loadingDiv.parentNode) {
          loadingDiv.remove();
        }
      },
    };
  }
})();
