// HTML elements

const body = document.body;
const toggleBtn = document.querySelector('.toggle__btn');
const tooltipBtns = document.querySelectorAll('.widget__info');
const tooltipSpans = document.querySelectorAll('.widget__list-item');
const contentInner = document.querySelector('.content__inner');

// Overlay

for (let i = 0; i < tooltipBtns.length; i++) {
  tooltipBtns[i].addEventListener('mouseover', function () {
    contentInner.classList.add('overlayed');
  });

  tooltipBtns[i].addEventListener('mouseout', function () {
    contentInner.classList.remove('overlayed');
  });
}

for (let i = 0; i < tooltipSpans.length; i++) {
  tooltipSpans[i].addEventListener('mouseover', function () {
    contentInner.classList.add('overlayed');
  });

  tooltipSpans[i].addEventListener('mouseout', function () {
    contentInner.classList.remove('overlayed');
  });
}

window.onload = function () {
  const isDark = localStorage.getItem('darkMode');
  if (isDark === 'true') {
    toggleDark();
  }
};

const toggleDark = function () {
  body.classList.toggle('dark-mode');
};

toggleBtn.addEventListener('click', function () {
  const isDark = body.classList.contains('dark-mode');
  toggleDark();
  localStorage.setItem('darkMode', !isDark);
  if (isDark) {
    document.getElementById('switchOffAudio').play();
  } else {
    document.getElementById('switchOnAudio').play();
  }
});

// Dark mode toggle, as per hour

function isNight() {
  const hour = new Date().getHours();
  return hour > 22 || hour < 6;
}

if (isNight() === true) {
  const isDark = localStorage.getItem('darkMode');
  if (isDark === null) {
    toggleDark();
  }
}
