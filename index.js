var soundSlider = document.getElementById("soundRange");
var volume = 0.5

try {
    soundSlider.value = Number(localStorage.getItem("soundSetting"));
} catch (e) {
    console.warn("Previous sound setting not found");
}


// Update the current slider value (each time you drag the slider handle)
soundSlider.oninput = function() {
    volume = this.value/100;
    localStorage.setItem("soundSetting", this.value);
}

let currentUser = null;
try {
    currentUser = { name: localStorage.getItem("UserName") };
} catch(e) {}

// Check if user is signed in

if (localStorage.getItem("SignedIn") === "true") {
    
    document.getElementById("signInButton").classList.add('hidden');
    document.getElementById("userInfo").classList.remove('hidden');
    document.getElementById("userName").textContent = currentUser.name;

    // document.getElementById("continueButton").removeAttribute("disabled");
    // document.getElementById("newGameButton").removeAttribute("disabled");
    // document.getElementById("statsButton").removeAttribute("disabled");
    // document.getElementById("manageButton").removeAttribute("disabled");
    document.getElementById("continueButton").disabled = false;
    document.getElementById("newGameButton").disabled = false;
    document.getElementById("statsButton").disabled = false;
    document.getElementById("manageButton").disabled = false;

    document.querySelectorAll(".tooltip").forEach(tooltip => {
        tooltip.style.display = "none"; // Hide all tooltips
    });

} else {
    document.getElementById("signInButton").classList.remove('hidden');
    document.getElementById("userInfo").classList.add('hidden');
    document.querySelectorAll(".tooltip").forEach(tooltip => {
        tooltip.style.display = "block-inline"; // Hide all tooltips
    });

    document.getElementById("continueButton").disabled = true;
    document.getElementById("newGameButton").disabled = true;
    document.getElementById("statsButton").disabled = true;
    document.getElementById("manageButton").disabled = true;
}


document.getElementById("continueButton").addEventListener("click", function() {

});

document.getElementById("newGameButton").addEventListener("click", function() {

});

document.getElementById("statsButton").addEventListener("click", function() {

});

/*
document.getElementById("leaderboardButton").addEventListener("click", function() {
});
*/
document.getElementById("signInButton").addEventListener("click", function() {
    window.location.href = 'sign-in.html';
});
document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.setItem("SignedIn", "false");
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
    //document.getElementById("dyslexicFontButton").innerHTML;
});

