/**
 * Portfolio Interactivity & Animations
 * Senior Architect Level - Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollProgress();
});

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progress.style.width = scrolled + "%";
    });
}

/**
 * Scroll Reveal Animations
 * Uses Intersection Observer for performance
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Mobile Navigation Toggle
 * Adds accessibility and smoother interaction
 */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.checked = false;
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.checked) {
            toggle.checked = false;
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Handling & Validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic visual feedback
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully. (Simulation)');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}
