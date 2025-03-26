import * as Timer from "./timer.js";

Timer.injectClock();

// Start the interval to update the clock
setInterval(Timer.updateClockDisplay, 1000);

// On page load, set the clock immediately
document.addEventListener("DOMContentLoaded", Timer.updateClockDisplay);