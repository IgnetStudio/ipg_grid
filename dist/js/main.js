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
const result = () => { first(); second() }
setInterval(result, 4500)