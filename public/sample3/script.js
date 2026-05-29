document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupGalleryLightbox();
  setupCopyButtons();
  setupEnquiryForm();
  setupFeedbackForm();
  loadInitialFeedback();
});

function setupNavigation() {
  const nav = document.getElementById("bottom-nav");
  if (!nav) return;

  const items = Array.from(nav.querySelectorAll(".nav-item"));

  items.forEach((item) => {
    const targetId = item.getAttribute("data-target");
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    item.addEventListener("click", () => {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const sections = items
    .map((item) => {
      const id = item.getAttribute("data-target");
      const section = document.getElementById(id);
      return section ? { id, section, item } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = sections.find((s) => s.section === entry.target);
          if (!match) return;
          if (entry.isIntersecting) {
            items.forEach((i) => i.classList.remove("active"));
            match.item.classList.add("active");
          }
        });
      },
      { threshold: 0.4, rootMargin: "-56px 0px -40% 0px" }
    );

    sections.forEach(({ section }) => observer.observe(section));
  }
}

function setupGalleryLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const images = document.querySelectorAll(".gallery-image");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
    });
  });

  function close() {
    lightbox.classList.add("hidden");
    lightboxImg.removeAttribute("src");
  }

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (
      e.target === lightbox ||
      e.target.classList.contains("lightbox-backdrop") ||
      e.target.classList.contains("lightbox-scroll")
    ) {
      close();
    }
  });
}

function setupCopyButtons() {
  const accountNumberEl = document.getElementById("account-number");
  const copyAccountBtn = document.getElementById("copy-account");
  if (copyAccountBtn && accountNumberEl) {
    copyAccountBtn.addEventListener("click", () => {
      const value = accountNumberEl.textContent.trim();
      copyToClipboard(value, copyAccountBtn);
    });
  }

  const profileInput = document.getElementById("profile-link");
  const copyProfileBtn = document.getElementById("copy-profile-link");
  if (copyProfileBtn && profileInput) {
    copyProfileBtn.addEventListener("click", () => {
      copyToClipboard(profileInput.value, copyProfileBtn);
    });
  }
}

function copyToClipboard(text, buttonEl) {
  if (!text) return;
  const original = buttonEl.textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showCopied(buttonEl, original))
      .catch(() => fallbackCopy(text, buttonEl, original));
  } else {
    fallbackCopy(text, buttonEl, original);
  }
}

function fallbackCopy(text, buttonEl, originalLabel) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
    showCopied(buttonEl, originalLabel);
  } catch (e) {
    alert("Copy not supported in this browser.");
  } finally {
    document.body.removeChild(textarea);
  }
}

function showCopied(buttonEl, originalLabel) {
  buttonEl.textContent = "Copied";
  setTimeout(() => {
    buttonEl.textContent = originalLabel;
  }, 1200);
}

function setupEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  const statusEl = document.getElementById("enquiry-status");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);
    if (!validateEnquiryForm(form)) {
      return;
    }

    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
    };

    if (statusEl) {
      statusEl.textContent = "Sending...";
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      if (statusEl) {
        statusEl.textContent = "Thank you. We will get back to you soon.";
      }
      form.reset();
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = "Something went wrong. Please try again later.";
        statusEl.style.color = "#dc2626";
      }
    }
  });
}

function validateEnquiryForm(form) {
  let valid = true;

  const name = form.elements.name.value.trim();
  if (!name) {
    setError("enquiry-name", "Please enter your name.");
    valid = false;
  }

  const email = form.elements.email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError("enquiry-email", "Please enter your email address.");
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError("enquiry-email", "Please enter a valid email address.");
    valid = false;
  }

  const phone = form.elements.phone.value.trim();
  const phonePattern = /^(\+?\d{9,12})$/;
  if (!phone) {
    setError("enquiry-phone", "Please enter your phone number.");
    valid = false;
  } else if (!phonePattern.test(phone)) {
    setError("enquiry-phone", "Enter a valid phone number (9–12 digits).");
    valid = false;
  }

  const message = form.elements.message.value.trim();
  if (!message) {
    setError("enquiry-message", "Please enter a message.");
    valid = false;
  }

  return valid;
}

function setupFeedbackForm() {
  const form = document.getElementById("feedback-form");
  const statusEl = document.getElementById("feedback-status");
  const stars = Array.from(document.querySelectorAll("#rating-stars .star"));
  const ratingInput = document.getElementById("feedback-rating");

  if (stars.length && ratingInput) {
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const value = Number(star.dataset.value || "0");
        ratingInput.value = String(value);
        stars.forEach((s) => {
          const sValue = Number(s.dataset.value || "0");
          s.classList.toggle("active", sValue <= value);
        });
      });
    });
  }

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);

    const isValid = validateFeedbackForm(form);
    if (!isValid) {
      return;
    }

    const payload = {
      name: form.elements.name.value.trim(),
      comment: form.elements.comment.value.trim(),
      rating: Number(form.elements.rating.value),
    };

    if (statusEl) {
      statusEl.textContent = "Adding feedback...";
      statusEl.style.color = "#16a34a";
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const created = await response.json();
      appendFeedback(created);
      form.reset();
      if (ratingInput && stars.length) {
        ratingInput.value = "0";
        stars.forEach((s) => s.classList.remove("active"));
      }
      if (statusEl) {
        statusEl.textContent = "Thank you for your feedback!";
        statusEl.style.color = "#16a34a";
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent =
          "Unable to save feedback right now. Please try again later.";
        statusEl.style.color = "#dc2626";
      }
    }
  });
}

function validateFeedbackForm(form) {
  let valid = true;

  const name = form.elements.name.value.trim();
  if (!name) {
    setError("feedback-name", "Please enter your name.");
    valid = false;
  }

  const comment = form.elements.comment.value.trim();
  if (!comment) {
    setError("feedback-comment", "Please enter a comment.");
    valid = false;
  }

  const rating = Number(form.elements.rating.value);
  if (!rating || rating < 1 || rating > 5) {
    setError("feedback-rating", "Please select a rating.");
    valid = false;
  }

  return valid;
}

function clearErrors(form) {
  const errorEls = form.querySelectorAll(".error-message");
  errorEls.forEach((el) => {
    el.textContent = "";
  });
}

function setError(inputId, message) {
  const errorSpan = document.querySelector(`.error-message[data-for="${inputId}"]`);
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

async function loadInitialFeedback() {
  const listEl = document.getElementById("feedback-list");
  if (!listEl) return;

  try {
    const response = await fetch("/api/feedback");
    if (!response.ok) {
      throw new Error("Failed to load feedback");
    }
    const feedback = await response.json();
    listEl.innerHTML = "";
    feedback.forEach(appendFeedback);
  } catch (error) {
    listEl.innerHTML = "<p style=\"font-size:0.85rem;color:#6b7280;\">Feedback will appear here once submitted.</p>";
  }
}

function appendFeedback(entry) {
  const listEl = document.getElementById("feedback-list");
  if (!listEl) return;

  const card = document.createElement("div");
  card.className = "feedback-card";

  const header = document.createElement("div");
  header.className = "feedback-header";

  const nameEl = document.createElement("span");
  nameEl.className = "feedback-name";
  nameEl.textContent = entry.name || "Anonymous";

  const starsEl = document.createElement("span");
  starsEl.className = "feedback-stars";
  const rating = Number(entry.rating || 0);
  const fullStars = "★".repeat(Math.max(0, Math.min(5, rating)));
  const emptyStars = "☆".repeat(Math.max(0, 5 - rating));
  starsEl.textContent = fullStars + emptyStars;

  header.appendChild(nameEl);
  header.appendChild(starsEl);

  const commentEl = document.createElement("p");
  commentEl.className = "feedback-comment";
  commentEl.textContent = entry.comment || "";

  card.appendChild(header);
  card.appendChild(commentEl);
  listEl.prepend(card);
}

