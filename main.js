document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference or use system preference
    if (localStorage.getItem('darkMode')) {
        document.body.classList.toggle('dark-mode', localStorage.getItem('darkMode') === 'enabled');
    } else if (darkModeMediaQuery.matches) {
        document.body.classList.add('dark-mode');
    }
    
    // Update icon based on current mode
    updateDarkModeIcon();
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        updateDarkModeIcon();
    });
    
    // Handle system preference changes
    darkModeMediaQuery.addListener(e => {
        if (!localStorage.getItem('darkMode')) {
            document.body.classList.toggle('dark-mode', e.matches);
            updateDarkModeIcon();
        }
    });
    
    function updateDarkModeIcon() {
        const icon = darkModeToggle.querySelector('i');
        if (!icon) return;
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Projects slider
    const slider = document.querySelector('.projects-slider');
    if (slider) {
        const slidesContainer = slider.querySelector('.slides-container');
        const slides = slider.querySelectorAll('.project-slide');
        const dots = slider.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        const slideCount = slides.length;
        
        function goToSlide(index) {
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Next slide
        slider.querySelector('.next').addEventListener('click', () => {
            goToSlide((currentSlide + 1) % slideCount);
        });
        
        // Previous slide
        slider.querySelector('.prev').addEventListener('click', () => {
            goToSlide((currentSlide - 1 + slideCount) % slideCount);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Auto-advance slides (optional)
        let slideInterval = setInterval(() => {
            goToSlide((currentSlide + 1) % slideCount);
        }, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide((currentSlide + 1) % slideCount);
            }, 5000);
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this template, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Scroll animations
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    const projectGrid = document.querySelector('.project-grid');
projectGrid.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    projectGrid.scrollLeft += evt.deltaY;
});

    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});