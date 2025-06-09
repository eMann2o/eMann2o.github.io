const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navList = document.querySelector('ul');
const navLinks = document.querySelectorAll('ul li a');

function toggleMenu() {
    const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
    menuIcon.setAttribute('aria-expanded', !isExpanded);
    closeIcon.setAttribute('aria-expanded', isExpanded);
    navList.classList.toggle('active');
}

menuIcon.addEventListener('click', toggleMenu);
closeIcon.addEventListener('click', toggleMenu);

// Close menu when clicking on a link or outside
document.addEventListener('click', (e) => {
  // Close when clicking a link
  if (e.target.closest('ul li a')) {
      if (window.innerWidth <= 768) {
          navList.classList.remove('active');
          menuIcon.setAttribute('aria-expanded', 'false');
          closeIcon.setAttribute('aria-expanded', 'true');
      }
      
      // Set active link
      navLinks.forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
  }
  
  // Close when clicking outside
  if (window.innerWidth <= 768 && 
      !e.target.closest('.navbar') && 
      navList.classList.contains('active')) {
      navList.classList.remove('active');
      menuIcon.setAttribute('aria-expanded', 'false');
      closeIcon.setAttribute('aria-expanded', 'true');
  }
});

// Keyboard navigation
navLinks.forEach(link => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content h3", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".intro__image", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".intro__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".intro__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".intro__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".intro__grid", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".intro__content h4", {
  ...scrollRevealOption,
  delay: 2500,
});
ScrollReveal().reveal(".intro__flex div", {
  ...scrollRevealOption,
  delay: 3000,
  interval: 500,
});

ScrollReveal().reveal(".journey__grid > div > div", {
  ...scrollRevealOption,
  interval: 500,
});

const mixer = mixitup(".portfolio__grid");

ScrollReveal().reveal(".banner__content .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".banner__content p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".banner__btn", {
  ...scrollRevealOption,
  delay: 1000,
});



ScrollReveal().reveal(".blog__card", {
  ...scrollRevealOption,
  interval: 500,
});
