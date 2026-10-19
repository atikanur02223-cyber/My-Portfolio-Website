// Navbar

/* =========================
   SCROLL NAVBAR
========================= */

const navbar =
document.getElementById("navbar");

window.addEventListener(
    "scroll",
    () => {

        if(window.scrollY > 50){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    }
);


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
document.getElementById("menuBtn");

const navLinks =
document.getElementById("navLinks");


menuBtn.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("show");

    }
);


/* =========================
   ACTIVE MENU
========================= */

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            document
            .querySelectorAll(".nav-links a")
            .forEach(item =>
                item.classList.remove("active")
            );

            link.classList.add("active");

            navLinks.classList.remove("show");

        }
    );

});



// Hero

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width;
let height;

let particles = [];

let mouse = {
  x: 0.5,
  y: 0.5
};


/* =========================
   CANVAS SIZE
========================= */

function resize() {

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  createParticles();

}

window.addEventListener("resize", resize);


/* =========================
   CREATE PARTICLES
========================= */

function createParticles() {

  particles = [];

  const count =
    window.innerWidth < 600
      ? 500
      : 1100;

  for (let i = 0; i < count; i++) {

    const phi =
      Math.acos(
        1 - 2 * Math.random()
      );

    const theta =
      Math.random() * Math.PI * 2;

    const radius =
      Math.pow(
        Math.random(),
        .18
      );

    particles.push({

      phi: phi,

      theta: theta,

      radius: radius,

      size:
        .4 +
        Math.random() * 1.5,

      alpha:
        .2 +
        Math.random() * .8

    });

  }

}


/* =========================
   ANIMATION
========================= */

let rotation = 0;

function animate() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  rotation += 0.0018;


  const centerX =
    width * 0.5;

  const centerY =
    height * 0.50;

  const radius =
    Math.min(
      width * .30,
      300
    );


  particles.forEach(p => {

    let x =
      Math.sin(p.phi) *
      Math.cos(
        p.theta + rotation
      ) *
      p.radius;

    let y =
      Math.cos(p.phi) *
      p.radius;

    let z =
      Math.sin(p.phi) *
      Math.sin(
        p.theta + rotation
      ) *
      p.radius;


    /* Mouse reaction */

    const tilt =
      (mouse.x - .5) * .6;


    const newY =
      y * Math.cos(tilt)
      -
      z * Math.sin(tilt);

    const newZ =
      y * Math.sin(tilt)
      +
      z * Math.cos(tilt);


    y = newY;
    z = newZ;


    /* Depth */

    const depth =
      (z + 1) / 2;


    const screenX =
      centerX +
      x * radius;

    const screenY =
      centerY +
      y * radius;


    const size =
      p.size *
      (.5 + depth);


    const opacity =
      p.alpha *
      (.15 + depth * .85);


    /*
      Blue → Purple
    */

    const hue =
      190 +
      depth * 90;


    ctx.beginPath();

    ctx.arc(
      screenX,
      screenY,
      size,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      `hsla(
        ${hue},
        100%,
        ${65 + depth * 20}%,
        ${opacity}
      )`;


    ctx.fill();

  });


  requestAnimationFrame(
    animate
  );

}


/* =========================
   MOUSE MOVEMENT
========================= */

window.addEventListener(
  "mousemove",
  e => {

    mouse.x =
      e.clientX /
      window.innerWidth;

    mouse.y =
      e.clientY /
      window.innerHeight;

  }
);


/* =========================
   TOUCH
========================= */

window.addEventListener(
  "touchmove",
  e => {

    mouse.x =
      e.touches[0].clientX /
      window.innerWidth;

    mouse.y =
      e.touches[0].clientY /
      window.innerHeight;

  }
);


resize();

animate();

// 
const cards = document.querySelectorAll(".project-card");
const pagination = document.getElementById("pagination");
const playBtn = document.getElementById("playBtn");

let current = 0;
let autoplay = true;
let interval;


/* Create dots */

cards.forEach((card,index)=>{

    const dot = document.createElement("div");

    dot.classList.add("dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click",()=>{
        current = index;
        updateSlider();
    });

    pagination.appendChild(dot);

});


const dots = document.querySelectorAll(".dot");


/* Update slider */

function updateSlider(){

    cards.forEach((card,index)=>{

        card.className = "project-card";

        let position =
        (index - current + cards.length) % cards.length;

        if(position === 0){

            card.classList.add("active");

        }else if(position === 1){

            card.classList.add("right");

        }else if(position === cards.length - 1){

            card.classList.add("left");

        }else if(position === 2){

            card.classList.add("far-right");

        }else{

            card.classList.add("far-left");

        }

    });


    dots.forEach((dot,index)=>{

        dot.classList.toggle(
            "active",
            index === current
        );

    });

}


/* Next slide */

function nextSlide(){

    current++;

    if(current >= cards.length){
        current = 0;
    }

    updateSlider();

}


/* Autoplay */

function startAutoplay(){

    clearInterval(interval);

    interval = setInterval(()=>{

        if(autoplay){
            nextSlide();
        }

    },3500);

}


startAutoplay();


/* Play / Pause */

playBtn.addEventListener("click",()=>{

    autoplay = !autoplay;

    playBtn.innerHTML =
        autoplay ? "▶" : "Ⅱ";

});


/* Mouse drag */

let startX = 0;
let isDragging = false;

const track = document.getElementById("projectTrack");

track.addEventListener("mousedown",(e)=>{

    startX = e.clientX;
    isDragging = true;

});


track.addEventListener("mouseup",(e)=>{

    if(!isDragging) return;

    const difference = e.clientX - startX;

    if(Math.abs(difference) > 60){

        if(difference < 0){

            nextSlide();

        }else{

            current--;

            if(current < 0){
                current = cards.length - 1;
            }

            updateSlider();

        }

    }

    isDragging = false;

});


/* Touch swipe */

track.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});


track.addEventListener("touchend",(e)=>{

    const endX = e.changedTouches[0].clientX;

    const difference = endX - startX;

    if(Math.abs(difference) > 50){

        if(difference < 0){

            nextSlide();

        }else{

            current--;

            if(current < 0){
                current = cards.length - 1;
            }

            updateSlider();

        }

    }

});


updateSlider();


/* ================= MODAL DATA ================= */

const services = {

  webdesign: {
    number: "01",
    title: "Premium Web Design",
    description:
      "We create visually striking interfaces that combine modern aesthetics, usability and your unique brand identity.",
    features: [
      "Custom UI/UX",
      "Responsive Design",
      "Modern Animations",
      "Brand-focused Layout",
      "Mobile Optimization"
    ]
  },

  development: {
    number: "02",
    title: "Web Development",
    description:
      "Clean and responsive frontend development focused on performance, usability and scalable structure.",
    features: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
      "Responsive Development"
    ]
  },

  ecommerce: {
    number: "03",
    title: "E-Commerce Websites",
    description:
      "Beautiful online stores designed to showcase products and create a smooth shopping experience.",
    features: [
      "Product Showcase",
      "Shopping Experience",
      "Responsive Store",
      "Product Categories",
      "Conversion-focused UI"
    ]
  },

  business: {
    number: "04",
    title: "Business Websites",
    description:
      "Professional websites that build credibility and help businesses establish a strong digital presence.",
    features: [
      "Business Landing Page",
      "Service Sections",
      "Contact Integration",
      "Mobile Friendly",
      "SEO-ready Structure"
    ]
  },

  optimization: {
    number: "05",
    title: "Website Optimization",
    description:
      "We improve the overall experience of your website by focusing on speed, responsiveness and usability.",
    features: [
      "Speed Optimization",
      "Responsive Fixes",
      "UI Improvements",
      "UX Improvements",
      "Performance"
    ]
  },

  support: {
    number: "06",
    title: "Maintenance & Support",
    description:
      "Keep your website fresh and functional with ongoing updates, fixes and content changes.",
    features: [
      "Content Updates",
      "Bug Fixes",
      "Design Changes",
      "Technical Support",
      "Regular Maintenance"
    ]
  }

};


/* ================= OPEN MODAL ================= */

function openService(service) {

  const data = services[service];

  document.getElementById("modalNumber").innerText =
    data.number;

  document.getElementById("modalTitle").innerText =
    data.title;

  document.getElementById("modalDescription").innerText =
    data.description;

  document.getElementById("modalFeatures").innerHTML =
    data.features
      .map(feature => `<span>${feature}</span>`)
      .join("");

  document
    .getElementById("serviceModal")
    .classList.add("show");

}


/* ================= CLOSE MODAL ================= */

function closeService() {

  document
    .getElementById("serviceModal")
    .classList.remove("show");

}


/* Close outside */

document
  .getElementById("serviceModal")
  .addEventListener("click", function(e) {

    if (e.target === this) {
      closeService();
    }

  });


/* ESC */

document.addEventListener("keydown", function(e) {

  if (e.key === "Escape") {
    closeService();
  }

});

const steps = document.querySelectorAll(".process-step");
const fill = document.querySelector(".process-line-fill");

function updateProcess() {

  let activeIndex = 0;

  steps.forEach((step, index) => {

    const rect = step.getBoundingClientRect();

    const screenCenter = window.innerHeight * 0.55;

    if (rect.top < screenCenter) {
      activeIndex = index;
    }

  });


  steps.forEach((step, index) => {

    if (index <= activeIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }

  });


  const progress =
    ((activeIndex + 1) / steps.length) * 100;

  fill.style.height = progress + "%";

}


window.addEventListener("scroll", updateProcess);

window.addEventListener("load", updateProcess);

const whatsappForm =
  document.getElementById("whatsappForm");

const projectMessage =
  document.getElementById("projectMessage");

const charCount =
  document.getElementById("charCount");

const formProgress =
  document.getElementById("formProgress");


/* Character Counter */

projectMessage.addEventListener("input", function () {

  charCount.innerText = this.value.length;

});


/* Dynamic Progress */

whatsappForm.addEventListener("input", function () {

  const requiredFields = [
    document.getElementById("clientName"),
    document.getElementById("clientEmail"),
    document.getElementById("projectMessage")
  ];

  let completed = 0;

  requiredFields.forEach(field => {

    if (field.value.trim() !== "") {
      completed++;
    }

  });

  const progress =
    Math.round(
      (completed / requiredFields.length) * 100
    );

  formProgress.innerText = progress + "%";

});

// Process-side




/* ================= WHATSAPP ================= */

whatsappForm.addEventListener("submit", function (e) {

  e.preventDefault();


  const name =
    document.getElementById("clientName").value.trim();

  const email =
    document.getElementById("clientEmail").value.trim();

  const business =
    document.getElementById("businessName").value.trim();

  const service =
    document.getElementById("serviceType").value;

  const message =
    document.getElementById("projectMessage").value.trim();


  /* Selected Budget */

  const budgetElement =
    document.querySelector(
      'input[name="budget"]:checked'
    );

  const budget =
    budgetElement
      ? budgetElement.value
      : "Not specified";


  /* WhatsApp Number */

  const phone =
    "8801789734443";


  /* WhatsApp Message */

  const whatsappMessage = `

🚀 *NEW PROJECT INQUIRY — CODEVA*

━━━━━━━━━━━━━━━━━━

👤 *Client:* ${name}

📧 *Email:* ${email}

🏢 *Business:* ${business || "Not provided"}

💻 *Service:* ${service || "Not specified"}

💰 *Budget:* ${budget}

━━━━━━━━━━━━━━━━━━

📝 *Project Details:*

${message}

━━━━━━━━━━━━━━━━━━

Sent from Codeva Website
`;


  /* Encode */

  const encodedMessage =
    encodeURIComponent(whatsappMessage);


  /* WhatsApp URL */

  const whatsappURL =
    `https://wa.me/${phone}?text=${encodedMessage}`;


  /* Open WhatsApp */

  window.open(
    whatsappURL,
    "_blank"
  );

});


/* =================================
   FOOTER REVEAL
================================= */

const footerReveal = document.querySelectorAll(".codeva-footer .reveal");

const footerObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                footerObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

footerReveal.forEach((item) => {
    footerObserver.observe(item);
});