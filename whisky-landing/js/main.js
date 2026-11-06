(function () {
  "use strict";

  // Мерцающие блики в Hero
  const heroGlints = document.querySelector(".hero__glints");

  if (heroGlints) {
    const glintPositions = [
      [86, 47],
      [96, 68],
      [82, 81],
      [76, 35],
      [88, 18],
    ];

    glintPositions.forEach(function (position) {
      const glint = document.createElement("span");

      glint.className = "hero__glint";

      glint.style.setProperty("--x", position[0] + "%");
      glint.style.setProperty("--y", position[1] + "%");

      glint.style.setProperty(
        "--size",
        (5 + Math.random() * 5).toFixed(1) + "px",
      );

      glint.style.setProperty(
        "--duration",
        (3.2 + Math.random() * 3.8).toFixed(2) + "s",
      );

      glint.style.setProperty("--delay", (-Math.random() * 7).toFixed(2) + "s");

      heroGlints.appendChild(glint);
    });
  }

  const menuToggle = document.querySelector(".site-header__menu-toggle");
  const navigation = document.querySelector(".site-header__nav");
  const navLinks = document.querySelectorAll(".site-header__link");

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Открыть меню" : "Закрыть меню",
      );
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // Accessible FAQ accordion: multiple answers can stay open.
  document.querySelectorAll(".faq-item__question").forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".faq-item");
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      item.classList.toggle("is-open", !isOpen);
    });
  });

  // Demo form behavior. Replace this handler with a CRM/API endpoint for production.
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  if (form && formMessage) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      formMessage.textContent = name
        ? "Спасибо, " +
          name +
          "! Заявка заполнена. Подключите форму к CRM, чтобы получать обращения."
        : "Спасибо! Заявка заполнена. Подключите форму к CRM, чтобы получать обращения.";
      form.reset();
    });
  }

  // Keep the date picker from suggesting a date in the past.
  const dateInput = document.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10);
    dateInput.min = localDate;
  }
})();

// Golden cursor spotlight
document.querySelectorAll('.hero__note').forEach((note) => {

  note.addEventListener('pointermove', (event) => {
    // Не запускаем эффект на сенсорных экранах
    if (event.pointerType === 'touch') return;

    const rect = note.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    note.style.setProperty('--glow-x', `${x}px`);
    note.style.setProperty('--glow-y', `${y}px`);

    note.classList.add('is-glowing');
  });

  note.addEventListener('pointerleave', () => {
    note.classList.remove('is-glowing');
  });

});
