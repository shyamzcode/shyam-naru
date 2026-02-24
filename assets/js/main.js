(function () {
  "use strict";

  const revealItems = document.querySelectorAll(".reveal");
  const yearEl = document.getElementById("year");

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
  initReveal();
})();
