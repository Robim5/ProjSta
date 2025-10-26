//variables
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const filterTagsContainer = document.getElementById('filterTags');
const clearFiltersBtn = document.getElementById('clearFilters');


//project completion (when is not connected with an account)
const completedProjects = JSON.parse(localStorage.getItem('completedProjects') || '[]');

//load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.className = 'ri-sun-fill';
    if (logoImg && logoImg.src.includes('logolight')) {
        logoImg.src = logoImg.src.replace('logolight', 'logodark');
    }
}

/*open projects in new tab
document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', () => {
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    })
});
*/

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
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

//completion checkbox
document.querySelectorAll('.completion-checkbox').forEach(checkbox => {
    const projectId = checkbox.dataset.project;
    if (completedProjects.includes(projectId)) {
        checkbox.classList.add('completed');
        checkbox.closest('.card').classList.add('completed');
    }

    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCompleted = checkbox.classList.toggle('completed');
        checkbox.closest('.card').classList.toggle('completed');

        if (isCompleted) {
            if (!completedProjects.includes(projectId)) {
                completedProjects.push(projectId);
            }
        } else {
            const index = completedProjects.indexOf(projectId);
            if (index > -1) {
                completedProjects.splice(index, 1);
            }
        }
        localStorage.setItem('completedProjects', JSON.stringify(completedProjects));
    });
});

//collect all tags from cards
const allTags = new Set();
document.querySelectorAll('.card').forEach(card => {
    const tags = card.dataset.tags.split(',');
    tags.forEach(tag => allTags.add(tag.trim()));
});

//create filter tags
const activeFilters = new Set();
allTags.forEach(tag => {
    const filterTag = document.createElement('div');
    filterTag.className = 'filter-tag';
    filterTag.textContent = tag;
    filterTag.addEventListener('click', () => {
        filterTag.classList.toggle('active');
        if (activeFilters.has(tag)) {
            activeFilters.delete(tag);
        } else {
            activeFilters.add(tag);
        }
        filterCards();
    });
    filterTagsContainer.appendChild(filterTag);
});

//clear filters
clearFiltersBtn.addEventListener('click', () => {
    activeFilters.clear();
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    filterCards();
});

//filter cards based on filters
function filterCards() {
    document.querySelectorAll('.card').forEach(card => {
        if (activeFilters.size === 0) {
            card.style.display = 'block';
        } else {
            const cardTags = card.dataset.tags.split(',').map(t => t.trim());
            const hasAllTags = Array.from(activeFilters).every(filter =>
                cardTags.includes(filter)
            );
            card.style.display = hasAllTags ? 'block' : 'none';
        }
    });
}

//button of cards
document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', () => {
        alert('This project tutorial is coming soon! Stay tuned.');
    });
});