/* ========================================
   SUHANI INDUSTRIES - AGGRESSIVE INDUSTRIAL JS
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ===== CONFIGURATION =====
  const CONFIG = {
    whatsappNumber: "919898011309",
    animationDuration: 800,
    debounceDelay: 250,
    counterDuration: 2000,
  };

  // ===== INITIALIZE AOS =====
  AOS.init({
    once: true,
    duration: CONFIG.animationDuration,
    offset: 100,
    easing: "ease-out-cubic",
  });

  // ===== NAVBAR SCROLL BEHAVIOR =====
  const navbar = document.getElementById("mainNavbar");
  const navHeight = 100;

  function handleNavbarScroll() {
    if (window.scrollY > navHeight) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();

  // ===== HERO SWIPER =====
  const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".heroSwiper .swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        AOS.refresh();
      },
    },
  });

  // ===== SERVICES SWIPER =====
  let currentSlide = 1;
  const totalSlides = 5;

  const servicesSwiper = new Swiper(".servicesSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    on: {
      slideChange: function () {
        currentSlide = this.realIndex + 1;
        updateSlideCounter();
      },
    },
  });

  // Custom navigation
  const prevBtn = document.querySelector(".services-nav .nav-btn.prev");
  const nextBtn = document.querySelector(".services-nav .nav-btn.next");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => servicesSwiper.slidePrev());
    nextBtn.addEventListener("click", () => servicesSwiper.slideNext());
  }

  function updateSlideCounter() {
    const currentEl = document.querySelector(".nav-counter .current");
    if (currentEl) {
      currentEl.textContent = String(currentSlide).padStart(2, "0");
    }
  }

  // ===== TESTIMONIALS SWIPER =====
  const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonialsSwiper .swiper-pagination",
      clickable: true,
    },
  });

  // ===== ISOTOPE GALLERY =====
  const galleryGrid = document.querySelector(".gallery-grid");
  let iso;

  if (galleryGrid) {
    imagesLoaded(galleryGrid, function () {
      iso = new Isotope(galleryGrid, {
        itemSelector: ".gallery-item",
        layoutMode: "fitRows",
        percentPosition: true,
        transitionDuration: "0.5s",
      });
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      if (iso) {
        iso.arrange({ filter: filterValue });
      }
    });
  });

  // ===== FANCYBOX INITIALIZATION =====
  if (typeof Fancybox !== "undefined") {
    Fancybox.bind('[data-fancybox="gallery"]', {
      Thumbs: { autoStart: false },
      Toolbar: {
        display: ["zoom", "slideshow", "fullscreen", "download", "close"],
      },
    });
  }

  // ===== COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll(".stat-number");
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    statNumbers.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = CONFIG.counterDuration;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);

        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });

    countersAnimated = true;
  }

  const statsSection = document.getElementById("stats");

  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    statsObserver.observe(statsSection);
  }

  // ===== CUSTOM ACCORDION =====
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const isActive = this.classList.contains("active");

      // Close all accordions
      accordionTriggers.forEach((t) => {
        t.classList.remove("active");
        const c = document.getElementById(t.getAttribute("data-target"));
        if (c) c.classList.remove("show");
      });

      // Open clicked if it wasn't active
      if (!isActive && content) {
        this.classList.add("active");
        content.classList.add("show");
      }
    });
  });

  // ===== DEVICE DETECTION =====
  function isMobileDevice() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.innerWidth <= 768
    );
  }

  // ===== WHATSAPP URL GENERATOR =====
  function getWhatsAppURL(message) {
    const encodedMessage = encodeURIComponent(message);
    if (isMobileDevice()) {
      return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    } else {
      return `https://web.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodedMessage}`;
    }
  }

  // ===== SERVICE BOOKING BUTTONS =====
  const serviceButtons = document.querySelectorAll(".btn-service");

  serviceButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const serviceName = this.getAttribute("data-service");
      const message = `Hi, I am interested in ${serviceName} service. Please provide more details.`;
      const url = getWhatsAppURL(message);
      window.open(url, "_blank");
    });
  });

  // ===== DEBOUNCE FUNCTION =====
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===== RESIZE LISTENER =====
  const handleResize = debounce(function () {
    console.log("Device type:", isMobileDevice() ? "Mobile" : "Desktop");
  }, CONFIG.debounceDelay);

  window.addEventListener("resize", handleResize);

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById("backToTop");

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleBackToTop);

  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // ===== GLITCH TEXT EFFECT =====
  const glitchTexts = document.querySelectorAll(".glitch-text");

  glitchTexts.forEach((text) => {
    text.addEventListener("mouseenter", function () {
      this.style.animation = "glitch 0.3s ease";
      setTimeout(() => {
        this.style.animation = "";
      }, 300);
    });
  });

  // ===== LOG INITIALIZATION =====
  console.log(
    "%c SUHANI INDUSTRIES ",
    "background: #FF0A0A; color: #000; font-family: monospace; font-size: 20px; padding: 10px;",
  );
  console.log(
    "Industrial Website Initialized | Device:",
    isMobileDevice() ? "Mobile" : "Desktop",
  );
});
