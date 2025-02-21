import { mixPhrases } from './text.js';

const first = mixPhrases(".title__dynamic-first", "I", "X");
const second = mixPhrases(".title__dynamic-second", "velop", "sign");

setInterval(() => {
    first();
    second();
}, 4500);


