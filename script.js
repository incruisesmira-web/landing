/* ============================================
   PREMIUM LANDING PAGE SCRIPTS
   Koroleva — Landing Page Development
   ============================================ */

(function () {
    'use strict';

    /* --- DOM Ready --- */
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initHeader();
        initMobileNav();
        initScrollReveal();
        initCounters();
        initFAQ();
        initSmoothScroll();
        initScrollTop();
        initParallax();
    }

    /* ============================================
       HEADER — Scroll Effect
       ============================================ */
    function initHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /* ============================================
       MOBILE NAV
       ============================================ */
    function initMobileNav() {
        const burger = document.getElementById('burger');
        const mobileNav = document.getElementById('mobileNav');
        if (!burger || !mobileNav) return;

        const links = mobileNav.querySelectorAll('.mobile-nav__link');

        burger.addEventListener('click', function () {
            const isOpen = mobileNav.classList.contains('active');

            burger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        links.forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                burger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ============================================
       SCROLL REVEAL — Intersection Observer
       ============================================ */
    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Stagger children if they share a parent
                    var delay = 0;
                    var siblings = entry.target.parentElement.querySelectorAll('.reveal');
                    if (siblings.length > 1) {
                        var index = Array.prototype.indexOf.call(siblings, entry.target);
                        delay = index * 100;
                    }

                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ============================================
       COUNTERS — Animated Numbers
       ============================================ */
    function initCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        var animated = false;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    function animateCounters() {
        var counters = document.querySelectorAll('[data-count]');

        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'), 10);
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);

                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(step);
        });
    }

    /* ============================================
       FAQ — Accordion
       ============================================ */
    function initFAQ() {
        var faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(function (item) {
            var question = item.querySelector('.faq-item__question');
            if (!question) return;

            question.addEventListener('click', function () {
                var isActive = item.classList.contains('active');

                // Close all
                faqItems.forEach(function (other) {
                    other.classList.remove('active');
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    /* ============================================
       SMOOTH SCROLL — Anchor Links
       ============================================ */
    function initSmoothScroll() {
        var links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (href === '#') return;

                var target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                var headerHeight = document.getElementById('header').offsetHeight || 80;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ============================================
       SCROLL TO TOP BUTTON
       ============================================ */
    function initScrollTop() {
        var btn = document.getElementById('scrollTop');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 600) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================
       PARALLAX — Subtle Hero Effect
       ============================================ */
    function initParallax() {
        var heroGradient = document.querySelector('.hero__gradient');
        if (!heroGradient) return;

        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            var rate = scrolled * 0.15;
            heroGradient.style.transform = 'translateY(' + rate + 'px)';
        }, { passive: true });
    }

})();
