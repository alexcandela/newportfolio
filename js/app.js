(() => {
  const menuButton = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navLinks");
  const languageToggle = document.getElementById("langToggle");
  const year = document.getElementById("currentYear");

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    nav.classList.remove("is-open");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  // Spanish / English content
  const setLanguage = (language) => {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-es][data-en]").forEach((element) => {
      const value = element.dataset[language];
      if (value !== undefined) element.textContent = value;
    });
    if (languageToggle) {
      languageToggle.setAttribute(
        "aria-label",
        language === "es" ? "Cambiar idioma a inglés" : "Switch language to Spanish"
      );
    }
  };

  if (languageToggle) {
    languageToggle.addEventListener("change", () => {
      setLanguage(languageToggle.checked ? "en" : "es");
    });
  }

  // Subtle reveal on scroll; content remains visible if observer is unavailable.
  const sections = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    sections.forEach((section) => {
      section.classList.add("reveal-ready");
      observer.observe(section);
    });
  }
})();
