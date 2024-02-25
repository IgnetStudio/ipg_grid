// HTML elements

const body = document.body;
const toggleBtn = document.querySelector('.toggle__btn');
const toggleText = document.querySelector('#toggle');
const tooltipBtns = document.querySelectorAll('.widget__info');
const tooltipSpans = document.querySelectorAll('.widget__list-item');
const contentInner = document.querySelector('.content__inner');
const closeBtns = document.querySelectorAll('.widget__tooltip-close');

// Overlay

for (let i = 0; i < tooltipBtns.length; i++) {
  tooltipBtns[i].addEventListener('mouseover', function () {
    contentInner.classList.add('overlayed');
  });

  tooltipBtns[i].addEventListener('focus', function () {
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

// Toggle dark mode

toggleBtn.addEventListener('click', function () {
  if (toggle.textContent.includes('Dark')) {
    toggle.textContent = 'Light mode';
    document.getElementById('switchOffAudio').play();
  } else {
    toggle.textContent = 'Dark mode';
    document.getElementById('switchOnAudio').play();
  }
});

// Empty function to fix Safari mobile bug

for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener('click', function () {});
}

// Set cookie on dark mode

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
