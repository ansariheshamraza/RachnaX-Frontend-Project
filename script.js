/**
 * RachnaX Landing Page - Enhanced Interactive Features
 * Includes: Typewriter animation, Active nav highlighting, Vision GSAP animation
 */


// ============================================
// Premium Particle Cursor Trail System
// ============================================

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 50;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isActive = false;
    
    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.targetX = e.clientX - rect.left;
      this.mouse.targetY = e.clientY - rect.top;
      this.isActive = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.isActive = false;
    });

    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticle() {
    if (this.particles.length >= this.maxParticles) return;

    const particle = {
      x: this.mouse.x,
      y: this.mouse.y,
      size: Math.random() * 3 + 1,
      opacity: 0.6,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.01,
      color: this.getParticleColor()
    };

    this.particles.push(particle);
  }

  getParticleColor() {
    const colors = [
      'rgba(139, 92, 246, ',
      'rgba(59, 130, 246, ',
      'rgba(249, 115, 22, '
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  updateParticles() {
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.15;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.15;

    if (this.isActive && Math.random() > 0.7) {
      this.createParticle();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.opacity = p.life * 0.6;
      
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isActive) {
      const gradient1 = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 80
      );
      gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      gradient1.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      this.ctx.fillStyle = gradient1;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      const gradient2 = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 40
      );
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
      gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      this.ctx.fillStyle = gradient2;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.ctx.filter = 'blur(1px)';
    this.particles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + p.opacity + ')';
      this.ctx.fill();
    });
    this.ctx.filter = 'none';
  }

  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }
}

const particleCanvas = document.getElementById('particle-canvas');
if (particleCanvas) {
  new ParticleSystem(particleCanvas);
}


// ============================================
// Micro Dots Animation
// ============================================

function createMicroDots() {
  const microDotsContainer = document.querySelector('.micro-dots');
  if (!microDotsContainer) return;

  const createDot = () => {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: 0;
      animation: dotFade ${duration}s ease-in-out ${delay}s infinite;
      pointer-events: none;
    `;

    microDotsContainer.appendChild(dot);
  };

  for (let i = 0; i < 15; i++) {
    createDot();
  }
}

const microDotsStyle = document.createElement('style');
microDotsStyle.textContent = `
  @keyframes dotFade {
    0%, 100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 0.6;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(microDotsStyle);

createMicroDots();


// ============================================
// Mobile Navigation Toggle
// ============================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});


// ============================================
// Header Scroll Effect
// ============================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});


// ============================================
// Active Navigation Link on Scroll
// ============================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  const headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);


// ============================================
// Scroll Reveal Animation
// ============================================

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);


// ============================================
// Enhanced Cursor Gradient Interaction
// ============================================

const gradientBg = document.getElementById('gradient-bg');

if (gradientBg) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  const animateGradient = () => {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    const x1 = 20 + currentX * 30;
    const y1 = 50 + currentY * 20;
    const x2 = 80 - currentX * 30;
    const y2 = 80 - currentY * 20;
    const x3 = 40 + currentX * 20;
    const y3 = 20 + currentY * 30;

    gradientBg.style.background = `
      radial-gradient(circle at ${x1}% ${y1}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at ${x2}% ${y2}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at ${x3}% ${y3}%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)
    `;

    requestAnimationFrame(animateGradient);
  };

  animateGradient();
}


// ============================================
// Button Ripple Effect
// ============================================

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

if (!document.querySelector('#ripple-animation')) {
  const style = document.createElement('style');
  style.id = 'ripple-animation';
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}


// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const headerHeight = document.getElementById('header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ============================================
// Hide Scroll Indicator on Scroll
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '0.6';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  });
}


// ============================================
// Typewriter Animation for Demo Preview - Multiple Examples
// ============================================

class TypewriterDemo {
  constructor() {
    this.input = document.getElementById('typewriter-input');
    this.loadingState = document.getElementById('loading-state');
    this.outputContent = document.getElementById('output-content');
    
    // Multiple input/output examples
    this.examples = [
      {
        input: "How to grow on Instagram as a student?",
        outputs: [
          {
            icon: "📑",
            text: "<strong>Content Structure:</strong> 5-part series covering time management, focus techniques, and study strategies"
          },
          {
            icon: "🎯",
            text: "<strong>Target Platform:</strong> Instagram Reels + YouTube Shorts (30-60 second format)"
          },
          {
            icon: "📝",
            text: "<strong>Key Points:</strong> Pomodoro technique, distraction elimination, active recall methods, break scheduling"
          },
          {
            icon: "🎬",
            text: "<strong>Script Outline:</strong> Hook (relatable problem) → Value (3 quick tips) → Call-to-action (follow for more)"
          }
        ]
      },
      {
        input: "Create a YouTube video about learning to code",
        outputs: [
          {
            icon: "📋",
            text: "<strong>Content Structure:</strong> Beginner's roadmap with 3 key milestones and practical projects"
          },
          {
            icon: "🎯",
            text: "<strong>Target Platform:</strong> YouTube (8-12 minute tutorial format)"
          },
          {
            icon: "💡",
            text: "<strong>Key Topics:</strong> Choosing first language, building projects, debugging mindset, community resources"
          },
          {
            icon: "🎥",
            text: "<strong>Video Flow:</strong> Personal story → Step-by-step guide → Live coding demo → Next steps"
          }
        ]
      },
      {
        input: "Blog post about productivity tips for remote work",
        outputs: [
          {
            icon: "📝",
            text: "<strong>Content Structure:</strong> 7 actionable tips with real-world examples and implementation steps"
          },
          {
            icon: "🎯",
            text: "<strong>Target Platform:</strong> Medium / Personal Blog (1200-1500 words)"
          },
          {
            icon: "✨",
            text: "<strong>Key Sections:</strong> Morning routine, workspace setup, time blocking, communication boundaries"
          },
          {
            icon: "📊",
            text: "<strong>Article Format:</strong> Intro hook → Problem statement → Solutions with examples → Summary checklist"
          }
        ]
      },
      {
        input: "TikTok series about healthy eating on a budget",
        outputs: [
          {
            icon: "🎬",
            text: "<strong>Content Structure:</strong> 10-part series with quick meal prep hacks and shopping tips"
          },
          {
            icon: "🎯",
            text: "<strong>Target Platform:</strong> TikTok + Instagram Reels (15-30 second clips)"
          },
          {
            icon: "🍳",
            text: "<strong>Key Themes:</strong> Meal planning, budget grocery hauls, 5-ingredient recipes, batch cooking"
          },
          {
            icon: "📱",
            text: "<strong>Video Style:</strong> Fast-paced cuts → Text overlays → Trending audio → Clear CTA"
          }
        ]
      }
    ];
    
    this.currentExampleIndex = 0;
    this.currentIndex = 0;
    this.isTyping = false;
    this.typingSpeed = 80;
    this.pauseBeforeOutput = 1000;
    this.pauseAfterOutput = 4000;
    
    if (this.input) {
      this.startLoop();
    }
  }

  async startLoop() {
    while (true) {
      const example = this.examples[this.currentExampleIndex];
      await this.typeText(example.input);
      await this.showOutput(example.outputs);
      await this.wait(this.pauseAfterOutput);
      await this.clearAll();
      await this.wait(500);
      
      // Move to next example
      this.currentExampleIndex = (this.currentExampleIndex + 1) % this.examples.length;
    }
  }

  typeText(text) {
    return new Promise((resolve) => {
      this.isTyping = true;
      this.currentIndex = 0;
      this.input.value = '';
      
      const typeInterval = setInterval(() => {
        if (this.currentIndex < text.length) {
          this.input.value += text[this.currentIndex];
          this.currentIndex++;
        } else {
          clearInterval(typeInterval);
          this.isTyping = false;
          setTimeout(resolve, this.pauseBeforeOutput);
        }
      }, this.typingSpeed);
    });
  }

  showOutput(outputs) {
    return new Promise((resolve) => {
      this.loadingState.style.display = 'none';
      this.outputContent.style.display = 'flex';
      
      // Clear previous output items
      this.outputContent.innerHTML = '';
      
      // Create new output items
      outputs.forEach((output, index) => {
        const item = document.createElement('div');
        item.className = 'output-item';
        item.innerHTML = `
          <span class="output-icon">${output.icon}</span>
          <span class="output-text">${output.text}</span>
        `;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        this.outputContent.appendChild(item);
        
        setTimeout(() => {
          item.classList.add('show');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          
          if (index === outputs.length - 1) {
            resolve();
          }
        }, index * 200);
      });
    });
  }

  clearAll() {
    return new Promise((resolve) => {
      this.input.value = '';
      
      const items = this.outputContent.querySelectorAll('.output-item');
      items.forEach(item => {
        item.classList.remove('show');
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      });
      
      setTimeout(() => {
        this.outputContent.style.display = 'none';
        this.loadingState.style.display = 'flex';
        resolve();
      }, 300);
    });
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize typewriter when page loads
window.addEventListener('load', () => {
  new TypewriterDemo();
});


// ============================================
// GSAP Animations
// ============================================

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Vision Section Animation - Letter by Letter Fade Up
  const visionSection = document.querySelector('.vision');
  const visionTitle = document.querySelector('.vision .section-title');
  const visionStatement = document.querySelector('.vision-statement');

  if (visionSection && visionTitle && visionStatement) {
    // Animate title
    gsap.fromTo(visionTitle,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: visionSection,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Store original text
    const text = visionStatement.textContent.trim();
    
    // Clear and prepare for letter animation
    visionStatement.innerHTML = '';
    visionStatement.style.minHeight = '3em'; // Prevent layout shift
    
    // Split into letters and create spans
    const letters = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'vision-letter';
      span.style.cssText = 'display: inline-block; opacity: 0; transform: translateY(20px);';
      
      // Handle spaces
      if (char === ' ') {
        span.style.width = '0.3em';
      }
      
      visionStatement.appendChild(span);
      return span;
    });

    // Create ScrollTrigger animation
    ScrollTrigger.create({
      trigger: visionSection,
      start: 'top center+=100',
      onEnter: () => {
        // Animate letters with stagger
        gsap.to('.vision-letter', {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
          delay: 0.3
        });
      },
      onLeaveBack: () => {
        // Reset animation when scrolling back up
        gsap.to('.vision-letter', {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.01
        });
      }
    });
  }

  // Before vs After Divider Animation
  const dividerLine = document.querySelector('.divider-line');
  
  if (dividerLine) {
    const updateDividerAnimation = () => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        gsap.fromTo('.divider-line',
          {
            scaleX: 0,
            opacity: 0
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.before-after',
              start: 'top center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      } else {
        gsap.fromTo('.divider-line',
          {
            scaleY: 0,
            opacity: 0
          },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.before-after',
              start: 'top center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    };

    updateDividerAnimation();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        updateDividerAnimation();
      }, 250);
    });
  }

  // Animate comparison items with stagger
  gsap.fromTo('.comparison-item',
    {
      opacity: 0,
      x: -20
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.comparison-container',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Roadmap - Animate roadmap cards with fade-up and stagger
  gsap.fromTo('.roadmap-card',
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.roadmap',
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact Section - Fade in animation
  const creatorCard = document.querySelector('.creator-card');
  
  if (creatorCard) {
    gsap.fromTo(creatorCard,
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
}


// ============================================
// Performance Optimization
// ============================================

function debounce(func, wait = 10) {
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

const debouncedReveal = debounce(revealOnScroll, 10);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedReveal);


// ============================================
// Accessibility Enhancements
// ============================================

if (navToggle) {
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navToggle.click();
    }
  });
}

const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
};

if (navMenu) {
  trapFocus(navMenu);
}


// ============================================
// Reduce Motion for Accessibility
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-base', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
  
  if (particleCanvas) {
    particleCanvas.style.display = 'none';
  }
}


// ============================================
// Profile Image Handler
// ============================================

// Configuration: Set your profile image URL here
const PROFILE_IMAGE_URL = 'profile.png'; // Profile image filename

const avatarImage = document.getElementById('avatar-image');
const avatarPlaceholder = document.getElementById('avatar-placeholder');

if (avatarImage && avatarPlaceholder && PROFILE_IMAGE_URL) {
  // Set the image source
  avatarImage.src = PROFILE_IMAGE_URL;
  
  // Show image when loaded, hide placeholder
  avatarImage.onload = function() {
    avatarImage.style.display = 'block';
    avatarPlaceholder.style.display = 'none';
  };
  
  // If image fails to load, keep showing placeholder
  avatarImage.onerror = function() {
    avatarImage.style.display = 'none';
    avatarPlaceholder.style.display = 'flex';
    console.warn('Profile image failed to load. Showing placeholder instead.');
  };
} else if (avatarPlaceholder) {
  // No image URL provided, show placeholder
  avatarPlaceholder.style.display = 'flex';
}


// ============================================
// Console Message
// ============================================

console.log('%c🚀 RachnaX Landing Page', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with modern web technologies', 'color: #64748b; font-size: 14px;');
console.log('%c✨ Enhanced with typewriter animation & active nav', 'color: #3b82f6; font-size: 12px;');
