// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const darkModeIcon = document.querySelector('#darkMode-icon');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    // Check for saved dark mode preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.add('bx-sun');
    }

    // Menu icon toggle
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu when a link is clicked
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            
            // Get the target section id from href attribute
            const targetId = this.getAttribute('href');
            
            // Scroll to the target section smoothly
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark/light mode toggle
    if (darkModeIcon) {
        darkModeIcon.addEventListener('click', () => {
            darkModeIcon.classList.toggle('bx-sun');
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (darkModeIcon.classList.contains('bx-sun')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }

    // Function to handle scroll events
    function handleScroll() {
        // Sticky header
        header.classList.toggle('sticky', window.scrollY > 100);
        
        // Active link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initialize ScrollReveal
    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true
    });

    // Apply ScrollReveal animations
    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img, .skills-container, .projects-box, .certifications-container, .experience-container, .contact form', { origin: 'bottom' });
    sr.reveal('.home-content h1, .about-img', { origin: 'left' });
    sr.reveal('.home-content p, .about-content', { origin: 'right' });

    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add "Contact Me" button next to the navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const headerIcons = document.querySelector('.header-icons');
    
    // Create contact button if it doesn't exist
    if (!document.querySelector('.contact-btn')) {
        const contactBtn = document.createElement('a');
        contactBtn.href = '#contact';
        contactBtn.className = 'contact-btn';
        contactBtn.textContent = 'Contact Me';
        
        // Insert before header-icons
        if (navbar && headerIcons) {
            navbar.parentNode.insertBefore(contactBtn, headerIcons);
            
            // Add smooth scroll event listener
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }
});
