// Carousel

const slides = document.querySelectorAll('.card__container .card');

if (slides.length) {
    let activeSlideIndex = 0;

    const prevButton = document.querySelector('.device__navigation-prev button');
    const nextButton = document.querySelector('.device__navigation-next button');
    const deviceScreen = document.querySelector('.device__glass img');
    const deviceTitle = document.querySelector('.device__meta-title');
    const deviceDescription = document.querySelector('.device__meta-description > p');
    const deviceBadge = document.querySelector('.device__meta-list');
    const deviceButton = document.querySelector('.device__meta-button');
    const deviceLink = document.querySelector('.device__meta-link');
    // @LM might be useful in the future
    // const deviceBookmark = document.querySelector('.card__bookmark');

    slides[0].classList.add('active');
    handleScreenImageChange();
    setMobileOrDesktopScreenSrc();

    prevButton.addEventListener('click', () => handleSlideChange(activeSlideIndex - 1));
    nextButton.addEventListener('click', () => handleSlideChange(activeSlideIndex + 1));

    // @LM check it out
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            handleSlideChange(activeSlideIndex - 1)
        } else if (event.key === "ArrowRight") {
            handleSlideChange(activeSlideIndex + 1)
        }
    });


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
        const slideDescription = slides[activeSlideIndex].querySelector('.card__description p').innerText;
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
            // prependChild should be used in this case
            // (due to svg polygon before it)
            // but it won't work as expected
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
