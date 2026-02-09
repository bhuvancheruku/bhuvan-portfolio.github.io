// ========================================
// SPIDER-VERSE JS | v5.0 (Recruiter Tools)
// ========================================

// --- PROJECT DATA ---
const missionData = {
    timetable: {
        title: "TIMETABLE GENERATOR",
        badge: "OFFER RECEIVED",
        desc: "Developed an intelligent timetable generation system using Streamlit and CP-SAT Solver (Google OR-Tools) to automate class scheduling. <br><br><strong>INDUSTRY RECOGNITION:</strong> This tool garnered significant interest, leading to an offer/collaboration opportunity from <strong>Malla Reddy University</strong> and <strong>Digii Campus ERP</strong> (as confirmed by correspondence with Punith Ganadinni). <br><br>Features include conflict resolution, faculty availability mapping, and PDF export.",
        tech: ["Python", "Streamlit", "Google OR-Tools", "Constraint Programming"],
        link: "https://github.com/bhuvancheruku/timetable_builder"
    },
    disease: {
        title: "DISEASE INSIGHTS",
        badge: "AI HEALTH",
        desc: "A comprehensive platform assisting healthcare professionals and the public in understanding disease symptoms, causes, and treatments. Provides data visualization of risk factors and preventive measures.",
        tech: ["Streamlit", "FastAPI", "PostgreSQL", "Chart.js"],
        link: "https://github.com/bhuvancheruku/DiseaseInsight"
    },
    skin: {
        title: "SKIN DISEASE DETECTION",
        badge: "DEEP LEARNING",
        desc: "Built a CNN model using TensorFlow to classify skin diseases from the HAM10000 dataset. Utilized data augmentation to improve accuracy in identifying skin lesions.",
        tech: ["TensorFlow", "OpenCV", "Pandas", "CNN"],
        link: "https://github.com/bhuvancheruku/skin-disease-detection"
    },
    pishield: {
        title: "PI SHIELD: IOT GATEWAY",
        badge: "HARDWARE SEC",
        desc: "Developed a secure IoT gateway that protects smart devices using real-time traffic monitoring and Honeypot traps. The system exposes a decoy to mislead attackers while hiding actual devices.",
        tech: ["Raspberry Pi", "Wireshark", "Flask", "Scapy"],
        link: null 
    },
    cctv: {
        title: "CCTV VULN ASSESSMENT",
        badge: "PEN-TESTING",
        desc: "Conducted an authorized security assessment on a private network. Exploited CCTV camera login pages using brute-force attacks (Hydra/Burp Suite) to demonstrate default credential risks.",
        tech: ["Kali Linux", "Hydra", "Nmap", "Burp Suite"],
        link: null
    },
    quadra: {
        title: "QUADRA ROBOT",
        badge: "ROBOTICS",
        desc: "Built a quadruped robot using Arduino and Triple Axis Accelerometers (ADXL335) to mimic animal movement and balance.",
        tech: ["Arduino", "C++", "IoT Sensors"],
        link: null
    },
    ats: {
        title: "ATS RESUME BUILDER",
        badge: "DEV TOOL",
        desc: "Designed a resume builder that ensures optimal formatting for Applicant Tracking Systems (ATS). Focuses on keyword optimization and clean layouts for machine parsing.",
        tech: ["HTML/CSS", "Python", "Automation"],
        link: null
    }
};

// --- RECRUITER WIDGET TOGGLE ---
const uplinkBtn = document.getElementById("uplinkBtn");
const uplinkMenu = document.getElementById("uplinkMenu");

uplinkBtn.addEventListener("click", () => {
    uplinkMenu.classList.toggle("active");
    const icon = uplinkBtn.querySelector("i");
    if(uplinkMenu.classList.contains("active")) {
        icon.classList.remove("fa-comment-dots");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-comment-dots");
    }
});

// Close widget if clicked outside
document.addEventListener("click", (e) => {
    if (!uplinkBtn.contains(e.target) && !uplinkMenu.contains(e.target)) {
        uplinkMenu.classList.remove("active");
        uplinkBtn.querySelector("i").classList.remove("fa-times");
        uplinkBtn.querySelector("i").classList.add("fa-comment-dots");
    }
});

// --- MODAL LOGIC ---
const modal = document.getElementById("missionModal");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-trigger").forEach(card => {
    card.addEventListener("click", () => {
        const missionId = card.getAttribute("data-id");
        const data = missionData[missionId];

        if(data) {
            document.getElementById("modalTitle").innerText = data.title;
            document.getElementById("modalBadge").innerText = data.badge;
            document.getElementById("modalDesc").innerHTML = data.desc;
            
            const techContainer = document.getElementById("modalTech");
            techContainer.innerHTML = "";
            data.tech.forEach(t => {
                const tag = document.createElement("span");
                tag.className = "tag";
                tag.innerText = t;
                techContainer.appendChild(tag);
            });

            const linkContainer = document.getElementById("modalLinks");
            linkContainer.innerHTML = "";
            if(data.link) {
                const btn = document.createElement("a");
                btn.href = data.link;
                btn.target = "_blank";
                btn.className = "btn glitch-btn";
                btn.innerText = "ACCESS REPO";
                linkContainer.appendChild(btn);
            } else {
                const span = document.createElement("span");
                span.style.color = "#666";
                span.innerText = "CLASSIFIED // NO PUBLIC REPO";
                linkContainer.appendChild(span);
            }
            modal.style.display = "flex";
        }
    });
});

closeModal.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", (e) => { if (e.target == modal) modal.style.display = "none"; });

// --- 3D TILT EFFECT (FIXED) ---
const tiltCards = document.querySelectorAll('.tilt-card, .project-card, .contact-box');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        card.style.transition = 'none';
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / 20) * -1;
        const rotateY = (x - centerX) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    });
});

// --- CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" });
});

// --- HACKER TEXT ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
document.querySelectorAll(".hacker-text, .logo").forEach(element => {
    element.onmouseover = event => {  
        let iteration = 0;
        const originalText = event.target.dataset.value;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) return originalText[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            if(iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    }
});
setTimeout(() => {
    const roleText = document.querySelector('.hacker-text');
    if(roleText) roleText.dispatchEvent(new Event('mouseover'));
}, 1000);

// --- WEB BACKGROUND (DEPTH PARALLAX) ---
const canvas = document.getElementById('spiderVerse');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let mouse = { x: null, y: null, radius: (canvas.height/80) * (canvas.width/80) }

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y;
        this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ff003c';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * (innerWidth - size * 2) + size * 2);
        let y = (Math.random() * (innerHeight - size * 2) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#ff003c';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                let opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(255, 0, 60,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.height/80));
    init();
});

init();
animate();
