//variables
const btnTheme = document.getElementById('themeToggle');


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
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        btnTheme.classList.replace('ri-moon-clear-fill', 'ri-sun-fill');
        //change logo to dark logo
        logoImg.src = "assets/logo/logodark.png";
    } else {
        btnTheme.classList.replace('ri-sun-fill', 'ri-moon-clear-fill');
    }
});
