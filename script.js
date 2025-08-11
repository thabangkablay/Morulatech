// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        // alert('Thank you for your message! We will get back to you soon.');
        // contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Service card animation
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length > 0) {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero image alternation
const heroImages = [
    'images/AI.png',
    'images/FullStack.png',
    'images/MobileApp.png',
    'images/Software.jpg',
    'images/RoboticSystem.jpg',
    'images/Iot.png'
];
let heroImageIndex = 0;
const heroImageElement = document.getElementById('hero-image');
if (heroImageElement) {
    setInterval(() => {
        heroImageIndex = (heroImageIndex + 1) % heroImages.length;
        heroImageElement.src = heroImages[heroImageIndex];
    }, 3000);
} 


// From STRIP CHANGES


// Drag-to-scroll for Flowing Images Strip (cleaned and optimized)
document.addEventListener('DOMContentLoaded', function initializeFlowingImagesDrag() {
    const flowingContainer = document.querySelector('.flowing-images-container');
    const flowingRow = document.querySelector('.flowing-images-row');
    if (!flowingContainer || !flowingRow) return;

    // Disable native image dragging for a better UX
    flowingRow.querySelectorAll('img').forEach((img) => {
        img.draggable = false;
    });

    const DRAG_SENSITIVITY = 2.1; // higher = faster horizontal movement
    let isDragging = false;
    let dragStartClientX = 0;
    let dragStartScrollLeft = 0;
    let rafId = null;

    function setCursor(grabbing) {
        flowingContainer.style.cursor = grabbing ? 'grabbing' : 'grab';
    }

    function pauseAnimation() {
        flowingRow.classList.add('paused');
    }

    function resumeAnimation() {
        flowingRow.classList.remove('paused');
    }

    function scheduleScroll(nextClientX) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const deltaX = (nextClientX - dragStartClientX) * DRAG_SENSITIVITY;
            flowingContainer.scrollLeft = dragStartScrollLeft - deltaX;
        });
    }

    function onPointerDown(event) {
        isDragging = true;
        setCursor(true);
        pauseAnimation();
        dragStartClientX = event.clientX;
        dragStartScrollLeft = flowingContainer.scrollLeft;
        if (flowingContainer.setPointerCapture) {
            try { flowingContainer.setPointerCapture(event.pointerId); } catch (_) {}
        }
    }

    function onPointerMove(event) {
        if (!isDragging) return;
        scheduleScroll(event.clientX);
    }

    function onPointerUpOrCancel() {
        if (!isDragging) return;
        isDragging = false;
        setCursor(false);
        resumeAnimation();
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    flowingContainer.addEventListener('pointerdown', onPointerDown);
    flowingContainer.addEventListener('pointermove', onPointerMove);
    flowingContainer.addEventListener('pointerup', onPointerUpOrCancel);
    flowingContainer.addEventListener('pointerleave', onPointerUpOrCancel);
    flowingContainer.addEventListener('pointercancel', onPointerUpOrCancel);

    setCursor(false);
});