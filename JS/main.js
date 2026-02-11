// main.js - Fichier JavaScript principal du portfolio
// Toutes fonctionnalités : thème, navigation, animations, modals, WhatsApp, formulaires

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialisé - Version complète');
    
    // ===== INITIALISATION DE TOUTES LES FONCTIONS =====
    initTheme();
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initCounters();
    initTabs();
    initSkillsAnimation();
    initProjectsFilter();
    initBackToTop();
    initSmoothScroll();
    initLoadingScreen();
    initModals();
    initContactForm();
    initNewsletterForm();
    initHamburgerAnimation();
    initScrollIndicator();
    initFormValidation();
    initDownloadCV();
    initYearCopyright();
    initHeroImageAnimation();
    initServiceCardsHover();
    initSkipLink();
    initDynamicStyles();
});

// ===== CONSTANTES GLOBALES =====
const WHATSAPP_NUMBER = '23565799468';

// ===== 1. GESTION DU THÈME =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// ===== 2. NAVIGATION RESPONSIVE =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', 
            hamburger.classList.contains('active').toString()
        );
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== 3. EFFET DE TAPING =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing');
    if (!typingElement) return;
    
    const words = ['Full Stack', 'React', 'Node.js', 'JavaScript', 'TypeScript'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                setTimeout(type, 500);
            }, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 50 : 150;
        setTimeout(type, speed);
    }
    
    setTimeout(type, 1000);
}

// ===== 4. COMPTEURS ANIMÉS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.textContent;
            const speed = 2000;
            const increment = target / (speed / 100);
            
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCount, 100);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ===== 5. ONGLETS =====
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabBtns.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ===== 6. ANIMATION DES COMPÉTENCES =====
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = `${width}%`;
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== 7. FILTRAGE DES PROJETS =====
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== 8. BOUTON RETOUR EN HAUT =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 9. SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .skill-item, .timeline-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== 10. SCROLL DOUX =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 11. ÉCRAN DE CHARGEMENT =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// ===== 12. MODALS - CORRIGÉ =====
function initModals() {
    const serviceModal = document.getElementById('service-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const showMoreProjectsBtn = document.querySelector('.show-more-projects');
    const hideMoreProjectsBtn = document.querySelector('.hide-more-projects');
    const moreProjectsSection = document.getElementById('more-projects');
    
    const servicesData = {
        development: {
            title: "Développement Web",
            icon: '<i class="fas fa-laptop-code"></i>',
            description: `
                <p>Je crée des sites web et applications sur mesure, conçus pour offrir une expérience utilisateur exceptionnelle tout en garantissant des performances optimales.</p>
                <p>Mes solutions sont développées avec les technologies les plus récentes, en respectant les meilleures pratiques du secteur et en optimisant pour le référencement naturel (SEO).</p>
            `,
            features: [
                "Développement sur mesure selon vos besoins",
                "Sites vitrines, corporate et institutionnels",
                "Applications web complexes et interactives",
                "Architecture microservices scalable",
                "Intégration d'API tierces",
                "Optimisation des performances",
                "Responsive design (mobile first)",
                "Code propre et maintenable",
                "Documentation technique complète",
                "Formation à l'utilisation"
            ],
            technologies: ["HTML5/CSS3", "JavaScript/TypeScript", "React/Vue.js", "Node.js", "PHP/Laravel", "Python/Django"]
        },
        responsive: {
            title: "Applications Responsives",
            icon: '<i class="fas fa-mobile-alt"></i>',
            description: `
                <p>Je développe des applications qui s'adaptent parfaitement à tous les appareils, du desktop au mobile, en passant par les tablettes.</p>
                <p>Mon approche 'mobile-first' garantit une expérience optimale sur tous les supports, avec des performances adaptées à chaque contexte d'utilisation.</p>
            `,
            features: [
                "Design adaptatif (responsive design)",
                "Approche mobile-first",
                "Optimisation des performances mobile",
                "Progressive Web Apps (PWA)",
                "Mode hors ligne disponible",
                "Installation sur l'écran d'accueil",
                "Notifications push",
                "Accès aux fonctionnalités mobiles",
                "Tests sur différents appareils",
                "Optimisation du temps de chargement"
            ],
            technologies: ["CSS Grid/Flexbox", "Media Queries", "Service Workers", "Web App Manifest", "React Native", "Flutter"]
        },
        ecommerce: {
            title: "E-commerce",
            icon: '<i class="fas fa-shopping-cart"></i>',
            description: `
                <p>Je développe des solutions e-commerce complètes qui transforment les visiteurs en clients et optimisent votre chiffre d'affaires en ligne.</p>
                <p>Mes plateformes incluent tous les éléments nécessaires au succès de votre boutique en ligne : catalogue produit avancé, panier intuitif, système de paiement sécurisé, gestion des stocks, et outils d'analyse.</p>
            `,
            features: [
                "Plateformes e-commerce sur mesure",
                "Catalogue produit avec variations",
                "Panier d'achat persistant",
                "Intégration de paiement sécurisée (Stripe, PayPal)",
                "Gestion des stocks en temps réel",
                "Système de promotion et coupons",
                "Interface d'administration complète",
                "Analytics et reporting",
                "Multi-langues et multi-devises",
                "Optimisation pour la conversion"
            ],
            technologies: ["WooCommerce", "PrestaShop", "Shopify", "Magento", "Stripe API", "PayPal API"]
        },
        seo: {
            title: "Optimisation SEO",
            icon: '<i class="fas fa-chart-line"></i>',
            description: `
                <p>J'optimise votre site web pour améliorer sa visibilité sur les moteurs de recherche et attirer plus de visiteurs qualifiés.</p>
                <p>Mon approche combine audit technique, optimisation on-page, création de contenu de qualité et stratégie de netlinking pour des résultats durables.</p>
            `,
            features: [
                "Audit technique SEO complet",
                "Optimisation on-page (balises, contenu)",
                "Recherche et optimisation de mots-clés",
                "Stratégie de contenu éditorial",
                "Optimisation des images et médias",
                "Amélioration de la vitesse de chargement",
                "Stratégie de netlinking",
                "SEO local (Google My Business)",
                "Suivi des positions et analyse",
                "Rapports mensuels détaillés"
            ],
            technologies: ["Google Analytics", "Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog", "GTmetrix"]
        },
        maintenance: {
            title: "Maintenance & Support",
            icon: '<i class="fas fa-cogs"></i>',
            description: `
                <p>Je propose des services de maintenance régulière pour garantir la sécurité, la performance et la disponibilité de votre site web.</p>
                <p>Mes forfaits de maintenance incluent des mises à jour régulières, des sauvegardes automatiques, une surveillance 24/7 et un support technique réactif.</p>
            `,
            features: [
                "Surveillance 24/7 de la disponibilité",
                "Mises à jour de sécurité régulières",
                "Sauvegardes automatiques quotidiennes",
                "Support technique prioritaire",
                "Rapports de performance mensuels",
                "Optimisation continue",
                "Gestion des incidents",
                "Migration et hébergement",
                "Formation continue",
                "Évolutions mineures incluses"
            ],
            technologies: ["Monitoring Uptime", "Backup Systems", "Security Scanners", "Performance Tools", "Ticketing System", "Cloud Hosting"]
        },
        design: {
            title: "UI/UX Design",
            icon: '<i class="fas fa-palette"></i>',
            description: `
                <p>Je conçois des interfaces utilisateur intuitives et des expériences utilisateur engageantes qui maximisent la conversion et la satisfaction des utilisateurs.</p>
                <p>Mon processus de design inclut la recherche utilisateur, le prototypage interactif, les tests utilisateurs et l'itération basée sur les retours.</p>
            `,
            features: [
                "Design d'interface utilisateur (UI)",
                "Expérience utilisateur (UX) optimisée",
                "Recherche et personas utilisateurs",
                "Prototypage interactif",
                "Tests utilisateurs et itérations",
                "Design system et guidelines",
                "Accessibilité (WCAG)",
                "Design responsive",
                "Wireframing et mockups",
                "Animation et micro-interactions"
            ],
            technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Webflow"]
        }
    };
    
    let currentService = 'development';
    
    console.log('Initialisation modals corrigée');
    
    // Gestion des boutons "En savoir plus" - Ouvre UNIQUEMENT le modal
    document.querySelectorAll('.show-service-modal').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            const serviceId = this.getAttribute('data-service');
            console.log('Clic sur "En savoir plus" - Modal seulement pour:', serviceId);
            
            if (serviceId) {
                openServiceModal(serviceId);
            }
            return false;
        }, true);
    });
    
    // Gestion du bouton "Discuter de ce projet" dans le modal
    if (serviceModal) {
        const modalContent = serviceModal.querySelector('.modal-content');
        if (modalContent) {
            const discussBtn = modalContent.querySelector('.modal-cta .btn');
            if (discussBtn) {
                const newDiscussBtn = discussBtn.cloneNode(true);
                discussBtn.parentNode.replaceChild(newDiscussBtn, discussBtn);
                
                newDiscussBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    
                    console.log('Clic sur "Discuter de ce projet" - WhatsApp');
                    
                    closeServiceModal();
                    
                    setTimeout(() => {
                        openWhatsAppForService(currentService);
                    }, 300);
                    
                    return false;
                }, true);
            }
        }
    }
    
    function openServiceModal(serviceId) {
        const service = servicesData[serviceId];
        
        if (!service || !serviceModal) {
            console.error('Service ou modal non trouvé');
            return;
        }
        
        currentService = serviceId;
        
        document.getElementById('modal-service-icon').innerHTML = service.icon;
        document.getElementById('modal-service-title').textContent = service.title;
        document.getElementById('modal-service-description').innerHTML = service.description;
        
        const featuresContainer = document.getElementById('modal-service-features');
        if (featuresContainer) {
            featuresContainer.innerHTML = `
                <h3>Ce que j'inclus dans ce service :</h3>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="service-technologies">
                    <h3>Technologies utilisées :</h3>
                    <div class="tech-tags">
                        ${service.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Modal ouvert pour:', serviceId);
    }
    
    function openWhatsAppForService(serviceId) {
        const serviceMessages = {
            'development': `Bonjour Eratus,\n\nJe viens de consulter votre service de *développement web* dans votre portfolio.\n\nJe suis intéressé(e) par la création d'un site web ou d'une application sur mesure. Pourriez-vous me fournir plus d'informations sur vos tarifs, délais et processus de développement ?\n\nMerci,`,
            'responsive': `Bonjour Eratus,\n\nJe viens de consulter votre service d'*applications responsives* dans votre portfolio.\n\nJ'ai besoin d'une application qui fonctionne parfaitement sur tous les appareils (desktop, tablette, mobile). Pouvez-vous me conseiller sur la meilleure approche et me donner un devis estimatif ?\n\nCordialement,`,
            'ecommerce': `Bonjour Eratus,\n\nJe viens de consulter votre service *e-commerce* dans votre portfolio.\n\nJe souhaite créer une plateforme e-commerce professionnelle avec système de paiement sécurisé. Quelle solution me recommanderiez-vous et quel serait le budget approximatif ?\n\nMerci,`,
            'seo': `Bonjour Eratus,\n\nJe viens de consulter votre service *d'optimisation SEO* dans votre portfolio.\n\nMon site a besoin d'être mieux positionné sur les moteurs de recherche. Proposez-vous des audits SEO complets ? Quel est votre processus d'optimisation ?\n\nCordialement,`,
            'maintenance': `Bonjour Eratus,\n\nJe viens de consulter votre service de *maintenance et support* dans votre portfolio.\n\nJe recherche un service fiable pour la maintenance régulière de mon site web, avec surveillance, sauvegardes et support technique. Pouvez-vous me détailler vos offres ?\n\nCordialement,`,
            'design': `Bonjour Eratus,\n\nJe viens de consulter votre service de *design UI/UX* dans votre portfolio.\n\nJ'ai besoin d'une interface utilisateur intuitive et d'une expérience utilisateur optimisée pour mon application/site web. Pouvez-vous me montrer des exemples de vos réalisations et me donner un devis ?\n\nCordialement,`
        };
        
        const message = serviceMessages[serviceId] || serviceMessages['development'];
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        console.log('WhatsApp ouvert pour service:', serviceId);
        window.open(whatsappURL, '_blank');
    }
    
    function closeServiceModal() {
        if (!serviceModal) return;
        
        serviceModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        document.querySelectorAll('.show-service-modal').forEach(link => {
            link.classList.remove('active');
        });
        
        console.log('Modal fermé');
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeServiceModal();
        });
    }
    
    if (serviceModal) {
        serviceModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeServiceModal();
            }
        });
    }
    
    const modalContent = serviceModal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('active')) {
            closeServiceModal();
        }
    });
    
    if (showMoreProjectsBtn) {
        showMoreProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.display = 'none';
            
            if (moreProjectsSection) {
                moreProjectsSection.style.display = 'block';
                
                setTimeout(() => {
                    moreProjectsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
                
                const projectCards = moreProjectsSection.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100 + 300);
                });
            }
        });
    }
    
    if (hideMoreProjectsBtn) {
        hideMoreProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (moreProjectsSection) {
                moreProjectsSection.style.display = 'none';
                
                if (showMoreProjectsBtn) {
                    showMoreProjectsBtn.style.display = 'inline-flex';
                }
                
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// ===== 13. FORMULAIRE DE CONTACT - REDIRECTION VERS WHATSAPP =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            const submitBtn = document.getElementById('submit-btn');
            const submitLoader = document.getElementById('submit-loader');
            const btnText = submitBtn.querySelector('.btn-text');
            
            submitBtn.disabled = true;
            btnText.style.opacity = '0.5';
            if (submitLoader) submitLoader.style.display = 'inline-flex';
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            const whatsappMessage = `Bonjour Eratus, je viens de votre site portfolio.

*Informations de contact :*
- *Nom :* ${name}
- *Email :* ${email}

*Sujet :*
${subject}

*Message :*
${message}

Je serais ravi de discuter de mon projet avec vous.`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                contactForm.reset();
                
                submitBtn.disabled = false;
                btnText.style.opacity = '1';
                if (submitLoader) submitLoader.style.display = 'none';
                
                showFormMessage('Redirection vers WhatsApp...', 'success');
            }, 1000);
        }
    });
}

// ===== 14. VALIDATION DU FORMULAIRE DE CONTACT =====
function validateContactForm() {
    let isValid = true;
    
    clearErrors();
    
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError('name', 'Veuillez entrer votre nom');
        isValid = false;
    }
    
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('email', 'Veuillez entrer votre email');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('email', 'Veuillez entrer un email valide');
        isValid = false;
    }
    
    const subject = document.getElementById('subject');
    if (!subject.value.trim()) {
        showError('subject', 'Veuillez entrer un sujet');
        isValid = false;
    }
    
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('message', 'Veuillez entrer votre message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }
    
    const privacy = document.getElementById('privacy');
    if (!privacy.checked) {
        showError('privacy', 'Vous devez accepter la politique de confidentialité');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    const fields = document.querySelectorAll('.form-input, .form-textarea');
    fields.forEach(field => {
        field.classList.remove('error');
    });
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

// ===== 15. NEWSLETTER =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        
        if (input.value && input.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(input.value.trim())) {
                showNewsletterMessage('Merci pour votre inscription à la newsletter !', 'success');
                input.value = '';
            } else {
                showNewsletterMessage('Veuillez entrer un email valide', 'error');
            }
        } else {
            showNewsletterMessage('Veuillez entrer votre email', 'error');
        }
    });
    
    function showNewsletterMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `newsletter-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#2ecc71' : '#ff4757'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        }, 3000);
    }
}

// ===== 16. ANIMATION HAMBURGER =====
function initHamburgerAnimation() {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        
        const lines = this.querySelectorAll('.hamburger-line');
        if (this.classList.contains('open')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'rotate(0) translate(0, 0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
}

// ===== 17. INDICATEUR DE SCROLL =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

// ===== 18. VALIDATION DES FORMULAIRES EN TEMPS RÉEL =====
function initFormValidation() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();
        
        if (!value) {
            showError(fieldId, 'Ce champ est requis');
            return false;
        }
        
        if (fieldId === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(fieldId, 'Veuillez entrer un email valide');
                return false;
            }
        }
        
        if (fieldId === 'message' && value.length < 10) {
            showError(fieldId, 'Le message doit contenir au moins 10 caractères');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function clearFieldError(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    }
}

// ===== 19. TÉLÉCHARGEMENT DU CV =====
function initDownloadCV() {
    const downloadBtns = document.querySelectorAll('[download]');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const notification = document.createElement('div');
            notification.className = 'download-notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Téléchargement du CV démarré...</span>
            `;
            notification.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 20px;
                background-color: #0066cc;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                animation: slideInUp 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutDown 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });
}

// ===== 20. YEAR COPYRIGHT =====
function initYearCopyright() {
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// ===== 21. ANIMATIONS DE L'IMAGE HERO =====
function initHeroImageAnimation() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'scale(1.05) rotate(1deg)';
            heroImage.style.transition = 'transform 0.3s ease';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'scale(1) rotate(0)';
        });
    }
}

// ===== 22. ANIMATION DES CARTES DE SERVICE =====
function initServiceCardsHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== 23. GESTION DU SKIP LINK =====
function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.querySelector('main') || document.querySelector('#main-content') || document.querySelector('section:first-of-type');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });
    }
}

// ===== 24. AJOUT D'ANIMATIONS CSS DYNAMIQUES =====
function initDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideOutDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100%); opacity: 0; }
        }
        
        .error {
            border-color: #ff4757 !important;
            background-color: rgba(255, 71, 87, 0.05) !important;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== FONCTIONS GLOBALES =====
window.showServiceModal = function(serviceId) {
    const event = new Event('click');
    const modalLink = document.querySelector(`[data-service="${serviceId}"]`);
    if (modalLink) modalLink.dispatchEvent(event);
};

window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
};

window.toggleTheme = function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.click();
};

// ===== DÉTECTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// ===== PERFORMANCE =====
window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page chargée en ' + loadTime + 'ms');
    
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ===== SUPPORT DES ANCIENS NAVIGATEURS =====
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
                                               }
