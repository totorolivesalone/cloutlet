
gsap.registerPlugin(ScrollTrigger);
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.nav-mobile');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}
function titleParallax(){
     if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to('.hero-title', {
        y: -200,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

}
function taglineSwipe(){
    if (!gsap || !ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);
    const h2 = document.querySelector('.tagline-text h2');
    if (!h2) return;
    
    // Simple bounce swipe
    gsap.fromTo(h2,
        { opacity: 0, x: 150, scale: 0.8 },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.tagline',
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: "play none none reverse",
                scrub: 0.5
            }
        }
    );

}
function servicesScrollTrigger() {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time)=>{
       lenis.raf(time*1000);
    });
    gsap.ticker.lagSmoothing(0);
     const path=document.getElementById("stroke-path");
    const pathLength=path.getTotalLength();
    path.style.strokeDasharray=pathLength;
    path.style.strokeDashoffset=pathLength;
    gsap.to(path,{
        strokeDashoffset:0,
        ease:"none",
        scrollTrigger:{
            trigger: ".services",
            start: "top top",
            end: "bottom bottom",
            scrub:true,

        }
    })
    const largeImages = document.querySelectorAll('.services .row:nth-child(1) .img, .services .row:nth-child(5) .img');
    const smallImages = document.querySelectorAll('.services .row:nth-child(2) .img, .services .row:nth-child(3) .img, .services .row:nth-child(4) .img');
    
    // Large images move more
    gsap.to(largeImages, {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
            trigger: '.services',
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
        }
    });
    
    // Small images move less (creates depth)
    gsap.to(smallImages, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: '.services',
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });
}
function createMarquee() {
    const track = document.querySelector('.track');
[...track.children].forEach(c => track.appendChild(c.cloneNode(true)));
const speed = window.innerWidth < 768 ? 15 : 25;
gsap.to(track, {x: '-50%', duration: speed, ease: "none", repeat: -1});
}

function valuesAnimation(){
    const starSvg = document.querySelector('#svg-star svg');
    const squareSvg = document.querySelector('#svg-square svg');
    const circleSvg = document.querySelector('#svg-circle svg');
    const crossSvg = document.querySelector('#svg-plus svg');
    
    // Star and Circle: Rotate together at same speed
    if (starSvg && circleSvg) {
        const rotationTl = gsap.timeline({repeat: -1});
        rotationTl
            .to(starSvg, {rotation: 360, duration: 3, ease: "power2.inOut"})
            .to(circleSvg, {rotation: -360, duration: 3, ease: "power2.inOut"}, "<"); // "<" means start at same time
    }
    
    // Square and Plus: Pulse together at same time
    if (squareSvg && crossSvg) {
        const pulseTl = gsap.timeline({repeat: -1});
        pulseTl
            .to([squareSvg, crossSvg], {scale: 1.2, duration: 0.5, ease: "power2.out"})
            .to([squareSvg, crossSvg], {scale: 1, duration: 0.5, ease: "power2.in"});
    }
}


function animateContactForm() {
    const form = document.querySelector('.contact form');
    if (!form) return;
    
    // ANIMATE ONLY THE FORM CONTAINER - not individual fields
    gsap.fromTo(form, 
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact',
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none none", // Only play once, no reverse
                markers: false // Set to true to debug
            }
        }
    );
    
    // OPTIONAL: Simple button animation (safe)
    const button = document.querySelector('.contact button');
    if (button) {
        // Hover effect only
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
}



document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    titleParallax();
    taglineSwipe();
    servicesScrollTrigger();
    createMarquee();
    valuesAnimation();
   animateContactForm();
   

   
});