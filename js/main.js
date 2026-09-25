/* ============================================
   ProPhy — Shared JavaScript
   ============================================ */

(function () {
  'use strict';

  /* --- Dark Mode --- */
  const THEME_KEY = 'prophy-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Apply immediately to prevent flash
  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle button
    var toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    /* --- Scroll-to-Top --- */
    var scrollBtn = document.querySelector('.scroll-top');
    if (scrollBtn) {
      window.addEventListener('scroll', function () {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });

      scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* --- Header Scroll Shadow --- */
    var header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 10);
      }, { passive: true });
    }

    /* --- Protect images from drag & right-click --- */
    document.querySelectorAll('.protect-image').forEach(function (img) {
      img.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });

    /* --- Scroll Animations --- */
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything
      document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        el.classList.add('animated');
      });
    }
  });
})();
