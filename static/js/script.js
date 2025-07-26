// Typewriter Animation Function
function typewriterEffect(element, text, typingSpeed = 80, backspaceSpeed = 40, delay = 1200) {
    if (!element) return;
    let i = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        if (!isDeleting) {
            currentText = text.substring(0, i + 1);
            element.textContent = currentText;
            i++;
            if (i === text.length) {
                setTimeout(() => { isDeleting = true; type(); }, delay);
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            currentText = text.substring(0, i - 1);
            element.textContent = currentText;
            i--;
            if (i === 0) {
                isDeleting = false;
                setTimeout(type, delay / 2);
            } else {
                setTimeout(type, backspaceSpeed);
            }
        }
    }
    type();
}

// Responsive Smooth Scrolling Function
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    const navbar = document.getElementById('navbar');
    if (targetElement && navbar) {
        // Always recalculate navbar height for responsive layouts
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    if (heroTitle && heroDescription) {
        const titleText = heroTitle.textContent;
        const descText = heroDescription.textContent;
        typewriterEffect(heroTitle, titleText, 80, 40, 1200);
        setTimeout(() => {
            typewriterEffect(heroDescription, descText, 60, 30, 1000);
        }, 800);
    }

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                if (href === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (href === '#about') {
                    smoothScrollTo('about-section');
                } else if (href === '#intro') {
                    smoothScrollTo('intro-section');
                } else if (href === '#contact') {
                    smoothScrollTo('footer-content');
                }
            }
        });
    });

    // Optional: Recalculate scroll on window resize for dynamic navbars
    window.addEventListener('resize', () => {
        // No action needed unless you have a dynamic navbar/menu
    });
});