(function () {
  "use strict";

  const revealItems = document.querySelectorAll(".reveal");
  const yearEl = document.getElementById("year");
  const siteNav = document.querySelector(".site-nav");
  const navShell = document.querySelector(".nav-shell");
  const navBackdrop = document.querySelector(".nav-backdrop");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileNavQuery = window.matchMedia("(max-width: 600px)");

  const closeMenu = () => {
    if (!siteNav || !navShell || !navToggle) {
      return;
    }

    siteNav.classList.remove("menu-open");
    navShell.classList.remove("menu-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  const openMenu = () => {
    if (!siteNav || !navShell || !navToggle) {
      return;
    }

    siteNav.classList.add("menu-open");
    navShell.classList.add("menu-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  };

  const initMobileNav = () => {
    if (!siteNav || !navShell || !navToggle || !navLinks) {
      return;
    }

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
        return;
      }

      openMenu();
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeMenu);
    }

    document.addEventListener("click", (event) => {
      if (!siteNav.classList.contains("menu-open")) {
        return;
      }

      if (navShell.contains(event.target)) {
        return;
      }

      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    const handleViewportChange = (event) => {
      if (!event.matches) {
        closeMenu();
      }
    };

    if ("addEventListener" in mobileNavQuery) {
      mobileNavQuery.addEventListener("change", handleViewportChange);
      return;
    }

    mobileNavQuery.addListener(handleViewportChange);
  };

  const setYear = () => {
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  const revealWithoutObserver = () => {
    revealItems.forEach((item) => item.classList.add("visible"));
  };

  const initReveal = () => {
    if (!revealItems.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealWithoutObserver();
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  };

  setYear();
  initMobileNav();
  initReveal();
})();
