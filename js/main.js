// ===== MAIN JAVASCRIPT FILE =====

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initLoadingScreen();
    initTypingEffect();
    initTabs();
    initSkillsAnimation();
    initProjectsFilter();
    initScrollAnimations();
    initBackToTop();
    initCurrentYear();
    initFormValidation();
    initNewsletterForm();
    initStatsCounter();
    
    // Set active nav link based on scroll position
    updateActiveNavLink();
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Update active nav link
            navLinksItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get current theme from localStorage or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing');
    const texts = ['Full Stack', 'React', 'Vue.js', 'Node.js'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeText, 1000);
}

// ===== TABS =====
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// ===== SKILLS ANIMATION =====
function initSkillsAnimation() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
                entry.target.classList.add('progress-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgresses.forEach(progress => {
        observer.observe(progress);
    });
}

// ===== PROJECTS FILTER =====
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    scrollTriggers.forEach(trigger => {
        observer.observe(trigger);
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CURRENT YEAR =====
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const privacyInput = document.getElementById('privacy');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    const privacyError = document.getElementById('privacy-error');
    
    const submitBtn = document.getElementById('submit-btn');
    const submitLoader = document.getElementById('submit-loader');
    const formMessage = document.getElementById('form-message');
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
            return false;
        }
        nameError.textContent = '';
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Veuillez entrer une adresse email valide';
            return false;
        }
        emailError.textContent = '';
        return true;
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject.length < 3) {
            subjectError.textContent = 'Le sujet doit contenir au moins 3 caractères';
            return false;
        }
        subjectError.textContent = '';
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 10) {
            messageError.textContent = 'Le message doit contenir au moins 10 caractères';
            return false;
        }
        messageError.textContent = '';
        return true;
    }
    
    function validatePrivacy() {
        if (!privacyInput.checked) {
            privacyError.textContent = 'Vous devez accepter la politique de confidentialité';
            return false;
        }
        privacyError.textContent = '';
        return true;
    }
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);
    privacyInput.addEventListener('change', validatePrivacy);
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        const isPrivacyValid = validatePrivacy();
        
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid || !isPrivacyValid) {
            formMessage.textContent = 'Veuillez corriger les erreurs dans le formulaire';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            formMessage.textContent = 'Merci pour votre message! Je vous répondrai dans les plus brefs délais.';
            formMessage.className = 'form-message success';
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, 1500);
    });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button');
        
        if (!emailInput.value.trim()) {
            alert('Veuillez entrer votre adresse email');
            return;
        }
        
        // Show loading state
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Merci pour votre inscription à la newsletter!');
            emailInput.value = '';
            submitBtn.innerHTML = originalHtml;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = count / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}