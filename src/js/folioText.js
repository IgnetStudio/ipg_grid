import { mixPhrases } from './text.js';

const first = mixPhrases(".title__dynamic", "_________", "Portfolio");

setTimeout(() => {
    first();
}, 4500);


