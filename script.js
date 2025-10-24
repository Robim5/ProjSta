//variables
const themeToggle = document.getElementById('themeToggle');
const logoImg = document.getElementById('logoImg');
const body = document.body;
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

//load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.className = 'ri-sun-fill';
    if (logoImg && logoImg.src.includes('logolight')) {
        logoImg.src = logoImg.src.replace('logolight', 'logodark');
    }
}

//open projects in new tab
document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', () => {
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    })
});

//toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        themeToggle.className = 'ri-sun-fill';
        if (logoImg && logoImg.src.includes('logolight')) {
            logoImg.src = logoImg.src.replace('logolight', 'logodark');
        }
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.className = 'ri-moon-clear-fill';
        if (logoImg && logoImg.src.includes('logodark')) {
            logoImg.src = logoImg.src.replace('logodark', 'logolight');
        }
        localStorage.setItem('theme', 'light');
    }
});

//header scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//back to top
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//io for fade in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

//smooth scroll for navigation link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


//paralax effect hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});