
import { endGame } from "./saveData.js";

// Constants
const GAME_START_HOUR = 6;  // 6 AM start
const GAME_END_HOUR = 22;   // 10 PM end
const GAME_DURATION_MINUTES = 20;  // Real-world duration


// Inject the clock into the html
export function injectClock() {
    const gameUI = document.createElement("div");
    gameUI.innerHTML = `<div id="gameClock" style="background-color: rgba(0, 0, 0, 0.3);padding: 10px;"></div>`
    document.body.appendChild(gameUI);
}

export function setupTimer() {
    injectClock();
    
    // Start the interval to update the clock
    setInterval(updateClockDisplay, 900);
    
    // On page load, set the clock immediately
    document.addEventListener("DOMContentLoaded", updateClockDisplay);
    
}

// Function to calculate in-game time
export function getGameTime() {
    const startTime = parseInt(localStorage.getItem("gameStartTime")); 
    const elapsedRealMillis = Date.now() - startTime;
    
    // Convert real-world elapsed time to in-game time
    const elapsedRealMinutes = elapsedRealMillis / (1000 * 60); // Convert ms to minutes
    const totalGameMinutes = (GAME_END_HOUR - GAME_START_HOUR) * 60; // 16 in-game hours = 960 min
    const inGameMinutesPassed = (elapsedRealMinutes / GAME_DURATION_MINUTES) * totalGameMinutes;
    
    // Calculate current in-game time
    let currentHour = GAME_START_HOUR + Math.floor(inGameMinutesPassed / 60);
    let currentMinute = Math.floor(inGameMinutesPassed % 60);

    // Format time properly (e.g., "6:05 AM", "10:00 PM")
    let period = currentHour >= 12 ? "PM" : "AM";
    let displayHour = currentHour % 12 || 12; // Convert to 12-hour format
    let displayMinute = currentMinute.toString().padStart(2, "0"); // Ensure two digits

    return `${displayHour}:${displayMinute} ${period}`;
}

// Function to calculate the time left as a percentage (from the real world time)
export function getPercentageLeft() {
    const startTime = parseInt(localStorage.getItem("gameStartTime")); 
    const elapsedRealMillis = Date.now() - startTime;
    const elapsedRealMinutes = elapsedRealMillis / (1000 * 60); // Convert ms to minutes
    return (GAME_DURATION_MINUTES-elapsedRealMinutes)/GAME_DURATION_MINUTES; // Return the percentage of time left (1 minute left of total 20 minutes = 1/20)
}

// Fucntion to end game when player runs out of time
export function gameTimeOut() {
    // Checks to make sure it can't retrigger over and over
    if (localStorage.getItem("gameOver")) return;
    localStorage.setItem("gameOver","true");

    endGame(false); // End the game in the database
    
    // Creates a text box to let the user know what happened
    const dialogueBox = document.createElement("div");
    dialogueBox.textContent = "The sun has set...";

    dialogueBox.style.position = "fixed";
    dialogueBox.style.background = "rgba(0, 0, 0)";
    dialogueBox.style.color = "white";
    dialogueBox.style.padding = "20px";
    dialogueBox.style.borderRadius = "10px";
    dialogueBox.style.fontSize = "64px";
    dialogueBox.style.textAlign = "center";
    dialogueBox.style.zIndex = 100;
    document.body.appendChild(dialogueBox);

    // Fades out after 3 seconds and sends player to game over screen
    setTimeout(() => {
        document.body.style.transition = "opacity 2s";
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "../ending-screens/time-out.html";
        }, 2000); // Wait to fade
    }, 3000); // Wait 3 seconds then fade
}

// Update the clock display every second
export function updateClockDisplay() {
    try {
        const clock = document.getElementById("gameClock");
        const time = getGameTime()
        clock.textContent = getGameTime();
        if(getPercentageLeft() <=0) {
            gameTimeOut();
        }
        if (getPercentageLeft() < (1/GAME_DURATION_MINUTES)) { // If one minute remaining
            clock.style.color = "#f00000";
        } else {
            clock.style.color = "#f5e3c3";
        }
    } catch {}
}
