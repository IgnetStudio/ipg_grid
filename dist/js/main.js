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

// Shuffle letters

class ShuffleLetters {
  constructor(el) {
    this.el = el
    this.chars = '_'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="shuffled">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

function mixPhrases(css, prev, next) {

  const phrases = [next, prev]

  const el = document.querySelector(css)
  const fx = new ShuffleLetters(el)

  let counter = 0
  const callback = () => {
    fx.setText(phrases[counter])
    counter = (counter + 1) % phrases.length
  }
  return callback
}

const first = mixPhrases('.title__dynamic-first', 'I', 'X')
const second = mixPhrases('.title__dynamic-second', 'velop', 'sign')

if (first.length && second.length) {
  const result = () => { first(); second() }
  setInterval(result, 4500)
}

// Carousel
const slides = document.querySelectorAll('.card__container .card');

if (slides.length) {
  let activeSlideIndex = 0;

  const prevButton = document.querySelector('.device__navigation-prev button');
  const nextButton = document.querySelector('.device__navigation-next button');
  const deviceScreen = document.querySelector('.device__glass img');
  const deviceTitle = document.querySelector('.device__meta-title');
  const deviceDescription = document.querySelector('.device__meta-description');
  const deviceBadge = document.querySelector('.device__meta-list');
  const deviceButton = document.querySelector('.device__meta-button');
  const deviceLink = document.querySelector('.device__meta-link');

  slides[0].classList.add('active');
  handleScreenImageChange();
  setMobileOrDesktopScreenSrc();

  prevButton.addEventListener('click', () => handleSlideChange(activeSlideIndex - 1));
  nextButton.addEventListener('click', () => handleSlideChange(activeSlideIndex + 1));

  window.addEventListener('resize', setMobileOrDesktopScreenSrc);

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => handleSlideChange(i))
  })

  function handleSlideChange(newIndex) {
    slides[activeSlideIndex].classList.remove('active');

    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    // increase or decrease
    activeSlideIndex = newIndex;
    slides[activeSlideIndex].classList.add('active');


    handleScreenImageChange();
  }

  function handleScreenImageChange() {
    const slideMobileSrc = slides[activeSlideIndex].getAttribute('data-mobile-src');
    const slideDesktopSrc = slides[activeSlideIndex].getAttribute('data-desktop-src');
    const slideTitle = slides[activeSlideIndex].querySelector('.card__title').innerText;
    const slideDescription = slides[activeSlideIndex].querySelector('.card__description').innerText;
    const slideLabels = slides[activeSlideIndex].querySelectorAll('.widget__list-item');
    const slideLinkText = slides[activeSlideIndex].querySelector('.card__link').innerText;
    const slideLinkHref = slides[activeSlideIndex].querySelector('.card__button').getAttribute('href');

    deviceBadge.innerText = '';
    deviceLink.innerText = '';

    if (slideLabels.length) {
      slideLabels.forEach((label) => {
        const labelElement = document.createElement('li');
        labelElement.classList.add('device__meta-badge');
        labelElement.innerText = label.innerText;

        deviceBadge.appendChild(labelElement);
      })
    }

    if (slideLinkHref) {
      deviceButton.setAttribute('href', slideLinkHref);
      deviceLink.innerText = slideLinkText;
      deviceButton.appendChild(deviceLink);
    }

    deviceTitle.innerText = slideTitle;
    deviceDescription.innerText = slideDescription;

    deviceScreen.setAttribute('desktop-src', slideDesktopSrc);
    deviceScreen.setAttribute('mobile-src', slideMobileSrc);
    setMobileOrDesktopScreenSrc();
  }

  function setMobileOrDesktopScreenSrc() {
    const windowWidth = window.innerWidth;
    const slideMobileSrc = slides[activeSlideIndex].getAttribute('data-mobile-src');
    const slideDesktopSrc = slides[activeSlideIndex].getAttribute('data-desktop-src');

    if (windowWidth < 544) {
      deviceScreen.setAttribute('src', slideMobileSrc);
    } else {
      deviceScreen.setAttribute('src', slideDesktopSrc);
    }
  }
}
