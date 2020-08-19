// Toggle dark mode

const body = document.body;
const toggleBtn = document.querySelector('.toggle__btn');

toggleBtn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
});