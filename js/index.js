import * as SaveData from "./saveData.js";

if (!localStorage.getItem("fontSizeSetting")) {
    localStorage.setItem("fontSizeSetting", "2");
}

document.querySelectorAll("*").forEach(element => {
    // Store original font size as a custom data attribute
    const style = window.getComputedStyle(element);
    element.dataset.originalFontSize = style.fontSize; 
});


// Volume variables
let soundSlider = document.getElementById("soundRange");
let volume = 0.5

let fontSizeSlider = document.getElementById("fontSizeRange");
let fontSizeMultiplier = 1;


try {
    soundSlider.value = Number(localStorage.getItem("soundSetting"));
} catch (e) {
    console.warn("Previous sound setting not found");
}

document.addEventListener("DOMContentLoaded", () => {
    
        fontSizeSlider.value = parseInt(localStorage.getItem("fontSizeSetting"));
        fontSizeMultiplier = 1+(0.25*(fontSizeSlider.value-2));
        applyFontMultiplier(fontSizeMultiplier);
    
});


// Update the current slider value (each time you drag the slider handle)
soundSlider.oninput = function() {
    volume = this.value/100;
    localStorage.setItem("soundSetting", this.value);
}

fontSizeSlider.oninput = function() {
    let fontSizeMultiplier = 1+(0.25*(this.value-2));
    applyFontMultiplier(fontSizeMultiplier);
    localStorage.setItem("fontSizeSetting", this.value);
}

// Try to load the username for the profile section
let currentUser = null;
try {
    currentUser = {name: SaveData.getLocalUsername()};
} catch(e) {}

// Check if user is signed in

if (localStorage.getItem("SignedIn") === "true") {
    
    // Show profile
    document.getElementById("signInButton").classList.add('hidden');
    document.getElementById("userInfo").classList.remove('hidden');
    document.getElementById("userName").textContent = currentUser.name;

    // Reenable buttons
    if (SaveData.checkSessionID()) {
        document.getElementById("continueButton").disabled = false;
    }
    
    document.getElementById("newGameButton").disabled = false;
    document.getElementById("statsButton").disabled = false;
    document.getElementById("achievementsButton").disabled = false;
    document.getElementById("editProfileButton").disabled = false;

    document.querySelectorAll(".tooltip").forEach(tooltip => {
        tooltip.style.display = "none"; // Hide all tooltips
    });

} else {
    // Hide profile
    document.getElementById("signInButton").classList.remove('hidden');
    document.getElementById("userInfo").classList.add('hidden');
    document.querySelectorAll(".tooltip").forEach(tooltip => {
        tooltip.style.display = "block-inline"; // Enable all tooltips
    });

    // Disable relevent buttons
    document.getElementById("continueButton").disabled = true;
    document.getElementById("newGameButton").disabled = true;
    document.getElementById("statsButton").disabled = true;
    document.getElementById("editProfileButton").disabled = true;
}



                  
// Eventlisteners    

document.getElementById("continueButton").addEventListener("click", function() {
    SaveData.loadSessionData().then(success=>{if (success) {window.location.href = "main-town.html";}});
});

document.getElementById("newGameButton").addEventListener("click", async function() {
    let result = await SaveData.createNewSession();
    if (result) {
        window.location.href = "prologue.html";
    } else {
        
    }
});

document.getElementById("statsButton").addEventListener("click", function() {
    window.location.href = "user-statistics.html";
});

document.getElementById("achievementsButton").addEventListener("click", function() {
    window.location.href = "achievements.html";
});



document.getElementById("leaderboardButton").addEventListener("click", function() {
    window.location.href = "leaderboard.html";
});


document.getElementById("signInButton").addEventListener("click", function() {
    window.location.href = 'sign-in.html';
});

document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("Username");
    localStorage.removeItem("UserID");
    localStorage.removeItem("SignedIn");
    localStorage.removeItem("Password");
    localStorage.removeItem("CurrentSessionID");
    window.location.reload();
});

document.getElementById("closeOptionsButton").addEventListener("click", function() {

});

document.getElementById("closeOptionsButton").addEventListener("click", function() {
    document.querySelector(".options-menu").classList.add("hidden");
});

document.getElementById("optionsButton").addEventListener("click", function() {
    document.querySelector(".options-menu").classList.remove("hidden");
});

document.getElementById("dyslexicFontButton").addEventListener("click", function() {
    if (document.getElementById("dyslexicFontButton").innerHTML === "Dyslexic Font: Off") {
        document.getElementById("dyslexicFontButton").innerHTML = "Dyslexic Font: On";
        
    } else {
        document.getElementById("dyslexicFontButton").innerHTML = "Dyslexic Font: Off";
    }

    document.getElementById("dyslexicFontButton").classList.toggle("button-off");
    document.getElementById("dyslexicFontButton").classList.toggle("button-on");

    document.body.classList.toggle("dyslexic");
    localStorage.setItem("dyslexicFont", document.body.classList.contains("dyslexic"));
});

document.getElementById("editProfileButton").addEventListener("click", function() {

});

function applyFontMultiplier(multiplier) {
    document.querySelectorAll("*").forEach(element => {
        if (element.dataset.originalFontSize) {
            const originalSize = parseFloat(element.dataset.originalFontSize);
            element.style.fontSize = (originalSize * multiplier) + "px";
        }
    });
}