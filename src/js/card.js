const CONTAINER = document.querySelector(".card__wrapper");
const CARDS = document.querySelectorAll("article.card");

const CONFIG = {
    proximity: 40,
    spread: 80,
    blur: 2,
    gap: 32,
    vertical: false,
    opacity: 0
};

const PROXIMITY = 10;

const UPDATE = (event) => {
    // ms this values below, correct?

    // get the angle based on the center point of the card and pointer position
    for (const CARD of CARDS) {
        // Check the card against the proximity and then start updating
        const CARD_BOUNDS = CARD.getBoundingClientRect();
        // Get distance between pointer and outerbounds of card
        if (
            event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
            event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
            event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
            event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
            // If within proximity set the active opacity
            CARD.style.setProperty("--active", 1);
        } else {
            CARD.style.setProperty("--active", CONFIG.opacity);
        }
        const CARD_CENTER = [
            CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
            CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5
        ];
        let ANGLE =
            (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180) /
            Math.PI;
        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
        CARD.style.setProperty("--start", ANGLE + 90);
    }
};

document.body.addEventListener("pointermove", UPDATE);

const RESTYLE = () => {
    CONTAINER.style.setProperty("--gap", CONFIG.gap);
    CONTAINER.style.setProperty("--blur", CONFIG.blur);
    CONTAINER.style.setProperty("--spread", CONFIG.spread);
    CONTAINER.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
    );
};

RESTYLE();
UPDATE();
