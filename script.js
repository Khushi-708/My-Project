document.addEventListener("DOMContentLoaded", () => {

    // ================== LOADER FUNCTIONALITY ==================
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
    });

    // ================== NAVBAR (HAMBURGER MENU) ==================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ================== LIGHT/DARK MODE TOGGLE ==================
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme
    const set_theme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeToggle.checked = true;
        } else {
            themeToggle.checked = false;
        }
    }

    // Check for saved theme in localStorage
    if (currentTheme) {
        set_theme(currentTheme);
    } else {
        // If no theme saved, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        set_theme(prefersDark ? 'dark' : 'light');
    }

    // Event listener for the toggle switch
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            set_theme('dark');
        } else {
            set_theme('light');
        }
    });

    // ================== ANIMATED COUNTER ==================
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let hasAnimated = false; // Flag to ensure animation runs only once

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const stepTime = 20; // Update every 20ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        hasAnimated = true; // Set flag to true after animation starts
    };

    // Use Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                startCounters();
                observer.unobserve(entry.target); // Optional: Stop observing after animation
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
});