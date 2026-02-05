// ========================================
// SPIDER-MAN THEMED PORTFOLIO - JAVASCRIPT
// Interactive Effects & Animations
// ========================================

// ===== NAVBAR FUNCTIONALITY =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===== TYPEWRITER EFFECT =====
const typewriter = document.getElementById('typewriter');
const texts = [
    'Computer Science Graduate',
    'Risk Assessment Specialist',
    'Cybersecurity Professional',
    'Data Analysis Expert',
    'Internal Controls Specialist'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// Start typewriter effect
setTimeout(type, 1000);

// ===== SPIDER WEB CANVAS ANIMATION =====
const canvas = document.getElementById('spiderWeb');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Web nodes
class WebNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 46, 46, 0.35)';
        ctx.fill();
    }
}

// Create web nodes
const nodes = [];
const nodeCount = 50;

for (let i = 0; i < nodeCount; i++) {
    nodes.push(new WebNode(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    ));
}

// Animation loop
function animateWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(255, 46, 46, ${0.12 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateWeb);
}

animateWeb();

// ===== MOUSE INTERACTION WITH WEB =====
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Attract nodes to mouse
    nodes.forEach(node => {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
            node.vx += dx * 0.00005;
            node.vy += dy * 0.00005;
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function reveal() {
    const reveals = document.querySelectorAll('.skill-card, .stat-item, .contact-card, .about-card, .project-placeholder');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal');
            setTimeout(() => {
                element.classList.add('active');
            }, 100);
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== PARTICLE EFFECT ON CLICK =====
function createWebSplash(x, y) {
    const particleCount = 20;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#e23636';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particles.push({ element: particle, x, y, vx, vy, life: 1 });
    }

    function animateParticles() {
        let allDead = true;

        particles.forEach(p => {
            if (p.life > 0) {
                allDead = false;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // gravity
                p.life -= 0.02;

                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';
                p.element.style.opacity = p.life;
            }
        });

        if (!allDead) {
            requestAnimationFrame(animateParticles);
        } else {
            particles.forEach(p => p.element.remove());
        }
    }

    animateParticles();
}

document.addEventListener('click', (e) => {
    createWebSplash(e.clientX, e.clientY);
});

// ===== HERO BUTTONS ANIMATION =====
const heroButtons = document.querySelectorAll('.btn');
heroButtons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const spiderBadge = document.querySelector('.spider-badge');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }

    if (spiderBadge) {
        spiderBadge.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// ===== SKILL CARDS HOVER EFFECT =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `translateY(-10px) scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== SPIDER WEB TRAIL ON MOUSE MOVE =====
let webTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    webTrail.push({ x: e.clientX, y: e.clientY, age: 0 });

    if (webTrail.length > maxTrailLength) {
        webTrail.shift();
    }
});

function drawWebTrail() {
    // This is handled by the canvas animation
    webTrail.forEach((point, index) => {
        point.age++;
        if (point.age > 30) {
            webTrail.splice(index, 1);
        }
    });

    requestAnimationFrame(drawWebTrail);
}

drawWebTrail();

// ===== EASTER EGG - SPIDER-MAN QUOTE =====
let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            const quotes = [
                "With great power comes great responsibility!",
                "I'm just your friendly neighborhood developer!",
                "Whatever comes our way, whatever battle we have raging inside us, we always have a choice.",
                "The greatest power has always been the power to choose.",
                "Not everyone is meant to make a difference. But for me, the choice to lead an ordinary life is no longer an option."
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            alert(randomQuote);
            clickCount = 0;
        }
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c🕷️ Spider-Man Portfolio', 'color: #e23636; font-size: 24px; font-weight: bold;');
console.log('%cWith great skills comes great responsibility!', 'color: #2b4c7e; font-size: 16px;');
console.log('%cDeveloped with ❤️ and webs', 'color: #e23636; font-size: 14px;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(reveal, 50);
window.removeEventListener('scroll', reveal);
window.addEventListener('scroll', debouncedReveal);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===== INITIALIZE =====
console.log('Spider-Man Portfolio initialized successfully! 🕷️');
