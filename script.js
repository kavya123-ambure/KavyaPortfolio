// code for text typing text for about.html and index.html

function changeAboutMeText(){
  
    const aboutMeElement = document.querySelector('.about-me');

    if(!aboutMeElement)return;
    const aboutMeTexts = ["Tech Enthusiast","Web Developer","Frontend Developer"];
    const typingSpeed = 100; // in millispeed
    const eraseSpeed = 50; // in millispeed
    const pauseTime=1500;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type(){
        const currentText = aboutMeTexts[textIndex];
        if(!isDeleting && charIndex < currentText.length){
            aboutMeElement.textContent +=currentText[charIndex];
            charIndex++;
            setTimeout(type,typingSpeed);
        }

        /*Erasing*/
        else if(isDeleting && charIndex >0){
            aboutMeElement.textContent = currentText.substring(0,charIndex-1);
            charIndex--;
            setTimeout(type,eraseSpeed);

        }

        else{
            isDeleting=!isDeleting;
            if(!isDeleting){
                textIndex = (textIndex +1)%
                aboutMeTexts.length;
            }
            setTimeout(type,pauseTime);
        }
    }

    type();


}
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.about-me')) {
        changeAboutMeText();
    }
});

// code for darkmode light mode

document.addEventListener('DOMContentLoaded',function(){
   
    const darkModeToggle=document.getElementById('darkmode-toggle');
    const body = document.body;
    const imgElement=document.querySelector('#mode');
     darkModeToggle.addEventListener('click',()=>{
        body.classList.toggle('dark-mode');
        const currentMode = body.classList.contains('dark-mode') ? 'Dark' : 'Light';
        if (currentMode === 'Dark') {
            imgElement.src = 'images/sun.gif'; // Switch to sun icon for dark mode
        } else {
            imgElement.src = 'images/night.gif'; // Switch to night icon for light mode
        }
         
     })

    
});
// code for progressbar circular bar tool progress and animated classlist

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('animated');
                const progress = target.dataset.progress ; 

                if (target.classList.contains("progress-bar")) {
                    target.style.width = `${progress}%`; // This will work if CSS has transition
                }

                if (target.classList.contains("progress-circle")) {
                    let start = 0;
                    const progressValue = target.querySelector('.progress-value');
                    if (!progressValue) return;
                    
                    const interval = setInterval(() => {
                        if (start >= progress) {
                            clearInterval(interval);
                        } else {
                            start++;
                            target.style.background = `conic-gradient(rgb(43, 216, 247) ${start * 3.6}deg, rgb(212, 33, 248) 0deg)`;
                            progressValue.textContent = `${start}%`;
                        }
                    }, 20);
                }

                if (target.classList.contains("tool-progress")) {
                    const progressValue = target.querySelector('.progress-value');
                    if (!progressValue) return;
                    
                    let start = 0;

                    // Smooth width animation
                    target.style.width = `${progress}%`;

                    // Progress value animation
                    const interval = setInterval(() => {
                        if (start >= progress) {
                            clearInterval(interval);
                        } else {
                            start++;
                            progressValue.textContent = `${start}%`;
                        }
                    }, 20);
                }

// line
                observer.unobserve(target);
            }
        });
    });

    document.querySelectorAll(".progress-bar, .progress-circle, .tool-progress, .animate").forEach(element => observer.observe(element));

    
});


// code for certification line which is used in about.html
// Certifications Line Animation
document.addEventListener("DOMContentLoaded", () => {
    const progressLine = document.querySelector(".progress-line");
    const lineAnimation = document.querySelector(".line-animation");
    const certifications = document.querySelectorAll(".certification");

    if (!progressLine || !lineAnimation || certifications.length === 0) return;

    function createDots() {
        certifications.forEach((cert, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            lineAnimation.appendChild(dot);
            dot.style.top = `${cert.offsetTop - lineAnimation.offsetTop}px`;
        });
    }
    createDots();

    function updateLineHeight() {
        const contentContainer = document.querySelector(".content-container");
        if (!contentContainer) return;
        lineAnimation.style.height = contentContainer.clientHeight + "px";
    }
    updateLineHeight();
    window.addEventListener("resize", updateLineHeight);

    window.addEventListener("scroll", () => {
        let progressHeight = 0;
        const viewportHeight = window.innerHeight;

        certifications.forEach((cert, index) => {
            const certTop = cert.getBoundingClientRect().top;
            if (certTop < viewportHeight / 2) {
                progressHeight = cert.offsetTop - lineAnimation.offsetTop + cert.clientHeight / 2;
                document.querySelectorAll(".dot")[index].style.opacity = "1";
            } else {
                document.querySelectorAll(".dot")[index].style.opacity = "0";
            }
        });

        progressLine.style.height = `${progressHeight}px`;
    });
});

// magical star cursor
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('swirl-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let particles = [];

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        createParticles(3); // Higher density near cursor
    });

    document.addEventListener('touchmove', (e) => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        createParticles(3);
    });

    function createParticles(count) {
        for (let i = 0; i < count; i++) {
            let angle = Math.random() * Math.PI * 1;
            let distance = Math.random() * 10; // Close to cursor initially
            let offsetX = Math.cos(angle) * distance;
            let offsetY = Math.sin(angle) * distance;
            particles.push(new Particle(mouse.x + offsetX, mouse.y + offsetY));
        }
    }

    function drawStar(ctx, x, y, radius, points = 5, inset = 0.5) {
        ctx.beginPath();
        let angle = Math.PI / points;
        for (let i = 0; i < points * 2; i++) {
            let r = i % 2 === 0 ? radius : radius * inset;
            let xPos = x + Math.cos(i * angle) * r;
            let yPos = y + Math.sin(i * angle) * r;
            ctx.lineTo(xPos, yPos);
        }
        ctx.closePath();
        ctx.fill();
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.speedX = (Math.random() - 0.5) * 4; // Slightly faster
            this.speedY = (Math.random() - 0.5) * 4;
            this.opacity = 1;
            this.trailFactor = Math.random() * 0.2 + 0.8; // Gradually slow down
        }

        update() {
            this.x += this.speedX * this.trailFactor;
            this.y += this.speedY * this.trailFactor;
            this.opacity -= 0.02;
            this.size = Math.max(0, this.size - 0.1);

            // Particles spread as they move (creating an arrow effect)
            this.speedX *= 1.02;
            this.speedY *= 1.02;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            drawStar(ctx, this.x, this.y, this.size);
            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.opacity > 0 && p.size > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});

(function() {
    emailjs.init("z7-E81pc_pDKkg8cN"); // Public key from EmailJS
  })();

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const now = new Date();
  const formattedTime = now.toLocaleString(); // Example: 4/23/2025, 7:32:00 PM
  document.getElementById("time").value = formattedTime;


    emailjs.sendForm("service_vfdewdn", "template_366nten", this)
      .then(function() {
        alert("Message sent successfully!");
      }, function(error) {
        alert("Failed to send message: " + error.text);
      });
  });
