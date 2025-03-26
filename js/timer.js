// Constants
const GAME_START_HOUR = 6;  // 6 AM start
const GAME_END_HOUR = 22;   // 10 PM end
const GAME_DURATION_MINUTES = 20;  // Real-world duration

// Load or initialize start time
export function setStartTime( ) {
    localStorage.setItem("gameStartTime", Date.now()); // Store real start time
}

// Inject the clock into the html
export function injectClock() {
    const gameUI = document.createElement("div");
    gameUI.innerHTML = `<div id="gameClock"></div>`
    document.body.appendChild(gameUI);
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

// Update the clock display every second
export function updateClockDisplay() {
    document.getElementById("gameClock").textContent = getGameTime();
}


export function pauseGame() {
    localStorage.setItem("pausedTime", Date.now()); // Store the pause timestamp
}

export function resumeGame() {
    if (localStorage.getItem("pausedTime")) {
        let pausedDuration = Date.now() - parseInt(localStorage.getItem("pausedTime"));
        let newStartTime = parseInt(localStorage.getItem("gameStartTime")) + pausedDuration;
        localStorage.setItem("gameStartTime", newStartTime); // Adjust start time
        localStorage.removeItem("pausedTime"); // Remove pause record
    }
}