/**
 * Personal Template - Stable & Optimized
 *
 * Perbaikan:
 * - Aman jika PureCounter tidak tersedia
 * - Aman jika AOS tidak tersedia
 * - Aman jika Typed.js tidak tersedia
 * - Aman jika Waypoint tidak tersedia
 * - Aman jika Swiper tidak tersedia
 * - Aman jika GLightbox tidak tersedia
 * - Aman jika Isotope / imagesLoaded tidak tersedia
 * - Event listener tidak error jika element tidak ada
 * - Animasi tetap ringan dan smooth
 */

(function () {
  "use strict";

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    scope.querySelectorAll(selector);


  /* =========================================================
     SCROLLED HEADER
  ========================================================= */

  function toggleScrolled() {
    const body = document.body;
    const header = $("#header");

    if (!header) return;

    const isSticky =
      header.classList.contains("scroll-up-sticky") ||
      header.classList.contains("sticky-top") ||
      header.classList.contains("fixed-top");

    if (!isSticky) return;

    if (window.scrollY > 100) {
      body.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
    }
  }

  window.addEventListener(
    "scroll",
    toggleScrolled,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    toggleScrolled
  );


  /* =========================================================
     MOBILE NAV
  ========================================================= */

  const mobileNavToggleBtn =
    $(".mobile-nav-toggle");

  function mobileNavToggle() {
    document.body.classList.toggle(
      "mobile-nav-active"
    );

    if (!mobileNavToggleBtn) return;

    mobileNavToggleBtn.classList.toggle(
      "bi-list"
    );

    mobileNavToggleBtn.classList.toggle(
      "bi-x"
    );
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener(
      "click",
      mobileNavToggle
    );
  }


  /* =========================================================
     MOBILE NAV LINKS
  ========================================================= */

  $$("#navmenu a").forEach((navLink) => {
    navLink.addEventListener(
      "click",
      function () {

        if (
          document.body.classList.contains(
            "mobile-nav-active"
          )
        ) {
          mobileNavToggle();
        }

      }
    );
  });


  /* =========================================================
     MOBILE DROPDOWN
  ========================================================= */

  $$(".navmenu .toggle-dropdown").forEach(
    (toggle) => {

      toggle.addEventListener(
        "click",
        function (e) {

          e.preventDefault();
          e.stopPropagation();

          const parent = this.parentNode;

          if (parent) {
            parent.classList.toggle(
              "active"
            );
          }

          if (this.nextElementSibling) {
            this.nextElementSibling.classList.toggle(
              "dropdown-active"
            );
          }

        }
      );

    }
  );


  /* =========================================================
     PRELOADER
  ========================================================= */

  const preloader =
    $("#preloader");

  if (preloader) {

    window.addEventListener(
      "load",
      function () {

        preloader.remove();

      }
    );

  }


  /* =========================================================
     SCROLL TOP
  ========================================================= */

  const scrollTop =
    $(".scroll-top");

  function toggleScrollTop() {

    if (!scrollTop) return;

    if (window.scrollY > 100) {

      scrollTop.classList.add(
        "active"
      );

    } else {

      scrollTop.classList.remove(
        "active"
      );

    }

  }

  if (scrollTop) {

    scrollTop.addEventListener(
      "click",
      function (e) {

        e.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }

  window.addEventListener(
    "scroll",
    toggleScrollTop,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    toggleScrollTop
  );


  /* =========================================================
     AOS
  ========================================================= */

  function initAOS() {

    if (
      !window.AOS ||
      typeof window.AOS.init !==
        "function"
    ) {
      return;
    }

    window.AOS.init({

      duration: 500,

      easing:
        "cubic-bezier(0.25, 0.46, 0.45, 0.94)",

      once: true,

      mirror: false,

      offset: 80,

      delay: 0

    });

  }


  /* =========================================================
     TYPED.JS
  ========================================================= */

  function initTyped() {

    const selectTyped =
      $(".typed");

    if (
      !selectTyped ||
      !window.Typed ||
      typeof window.Typed !==
        "function"
    ) {
      return;
    }

    let typedStrings =
      selectTyped.getAttribute(
        "data-typed-items"
      );

    if (!typedStrings) return;

    typedStrings =
      typedStrings
        .split(",")
        .map(function (item) {
          return item.trim();
        })
        .filter(Boolean);

    if (!typedStrings.length) {
      return;
    }

    new window.Typed(
      selectTyped,
      {

        strings:
          typedStrings,

        loop: true,

        typeSpeed: 100,

        backSpeed: 50,

        backDelay: 2000,

        smartBackspace: true

      }
    );

  }


  /* =========================================================
     PURE COUNTER
  ========================================================= */

  function initPureCounter() {

    /*
     * PERBAIKAN UTAMA:
     *
     * Jangan menggunakan:
     *
     * new PureCounter();
     *
     * karena jika library PureCounter belum
     * dimuat, browser akan menghasilkan:
     *
     * ReferenceError:
     * PureCounter is not defined
     */

    if (
      !window.PureCounter ||
      typeof window.PureCounter !==
        "function"
    ) {
      return;
    }

    try {

      new window.PureCounter();

    } catch (error) {

      console.warn(
        "PureCounter gagal diinisialisasi:",
        error
      );

    }

  }


  /* =========================================================
     SKILLS ANIMATION
  ========================================================= */

  function initSkillsAnimation() {

    const skillsAnimation =
      $$(".skills-animation");

    if (
      !skillsAnimation.length ||
      !window.Waypoint ||
      typeof window.Waypoint !==
        "function"
    ) {
      return;
    }

    skillsAnimation.forEach(
      (item) => {

        new window.Waypoint({

          element: item,

          offset: "80%",

          handler: function () {

            const progress =
              $$(".progress .progress-bar", item);

            progress.forEach(
              (el) => {

                const value =
                  el.getAttribute(
                    "aria-valuenow"
                  );

                if (!value) return;

                requestAnimationFrame(
                  function () {

                    el.style.width =
                      value + "%";

                  }
                );

              }
            );

            /*
             * Jalankan sekali saja.
             * Setelah animasi skills tampil,
             * Waypoint tidak perlu terus berjalan.
             */

            this.destroy();

          }

        });

      }
    );

  }


  /* =========================================================
     SWIPER
  ========================================================= */

  function initSwiper() {

    if (
      !window.Swiper ||
      typeof window.Swiper !==
        "function"
    ) {
      return;
    }

    $$(".init-swiper").forEach(
      function (swiperElement) {

        const configElement =
          $(".swiper-config", swiperElement);

        if (!configElement) {
          return;
        }

        let config;

        try {

          config =
            JSON.parse(
              configElement
                .textContent
                .trim()
            );

        } catch (error) {

          console.error(
            "Swiper config error:",
            error
          );

          return;
        }

        try {

          if (
            swiperElement.classList.contains(
              "swiper-tab"
            ) &&
            typeof window
              .initSwiperWithCustomPagination ===
              "function"
          ) {

            window
              .initSwiperWithCustomPagination(
                swiperElement,
                config
              );

          } else {

            new window.Swiper(
              swiperElement,
              config
            );

          }

        } catch (error) {

          console.error(
            "Swiper initialization error:",
            error
          );

        }

      }
    );

  }


  /* =========================================================
     GLIGHTBOX
  ========================================================= */

  function initGLightbox() {

    if (
      !window.GLightbox ||
      typeof window.GLightbox !==
        "function"
    ) {
      return;
    }

    /*
     * Tidak perlu menjalankan GLightbox
     * jika halaman tidak mempunyai
     * elemen .glightbox.
     */

    if (!$(".glightbox")) {
      return;
    }

    try {

      window.GLightbox({

        selector:
          ".glightbox"

      });

    } catch (error) {

      console.warn(
        "GLightbox initialization error:",
        error
      );

    }

  }


  /* =========================================================
     ISOTOPE
  ========================================================= */

  function initIsotope() {

    if (
      !window.Isotope ||
      typeof window.Isotope !==
        "function" ||
      !window.imagesLoaded ||
      typeof window.imagesLoaded !==
        "function"
    ) {
      return;
    }

    $$(".isotope-layout").forEach(
      function (isotopeItem) {

        const container =
          $(".isotope-container", isotopeItem);

        if (!container) {
          return;
        }

        const layout =
          isotopeItem.getAttribute(
            "data-layout"
          ) || "masonry";

        const filter =
          isotopeItem.getAttribute(
            "data-default-filter"
          ) || "*";

        const sort =
          isotopeItem.getAttribute(
            "data-sort"
          ) || "original-order";

        let isotopeInstance =
          null;


        /* =====================================================
           WAIT FOR IMAGES
        ===================================================== */

        window.imagesLoaded(
          container,
          function () {

            try {

              isotopeInstance =
                new window.Isotope(
                  container,
                  {

                    itemSelector:
                      ".isotope-item",

                    layoutMode:
                      layout,

                    filter:
                      filter,

                    sortBy:
                      sort

                  }
                );

            } catch (error) {

              console.error(
                "Isotope initialization error:",
                error
              );

            }

          }
        );


        /* =====================================================
           FILTER
        ===================================================== */

        $$(".isotope-filters li", isotopeItem)
          .forEach(
            function (filterButton) {

              filterButton.addEventListener(
                "click",
                function () {

                  const active =
                    $(
                      ".isotope-filters .filter-active",
                      isotopeItem
                    );

                  if (active) {

                    active.classList.remove(
                      "filter-active"
                    );

                  }

                  this.classList.add(
                    "filter-active"
                  );

                  if (!isotopeInstance) {
                    return;
                  }

                  isotopeInstance.arrange({

                    filter:
                      this.getAttribute(
                        "data-filter"
                      ) || "*"

                  });

                }
              );

            }
          );

      }
    );

  }


  /* =========================================================
     INITIALIZE
  ========================================================= */

  function init() {

    initAOS();

    initTyped();

    initPureCounter();

    initSkillsAnimation();

    initGLightbox();

    initSwiper();

    initIsotope();

    toggleScrolled();

    toggleScrollTop();

  }


  /* =========================================================
     DOM READY
  ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }


  /* =========================================================
     LOAD FALLBACK
  ========================================================= */

  /*
   * Beberapa library eksternal bisa menggunakan
   * defer / async. Jadi kita cek lagi setelah
   * seluruh halaman selesai dimuat.
   */

  window.addEventListener(
    "load",
    function () {

      initAOS();

      initTyped();

      initPureCounter();

      initSkillsAnimation();

      initGLightbox();

      initSwiper();

      initIsotope();

    },
    {
      once: true
    }
  );

})();