
// Store the default sizing if not already stored
document.querySelectorAll("*").forEach(element => {
    // Store original font size as a custom data attribute
    if (!element.dataset.originalFontSize) {
        const style = window.getComputedStyle(element);
        element.dataset.originalFontSize = style.fontSize; 
    }
});


// Applies the dyslexic class to the current webpage if the dyslexic flag has been set
if (localStorage.getItem("dyslexicFont") === "true") {
    document.body.classList.add("dyslexic");
    try {
        document.getElementById("dyslexicFontButton").innerHTML = "Dyslexic Font: On";
        document.getElementById("dyslexicFontButton").classList.toggle("button-off");
        document.getElementById("dyslexicFontButton").classList.toggle("button-on");
    } catch (e) {
        // Throws error when not on index page   
    }
}

// Applies saved font setting
try {
    let fontSizeMultiplier = 1;
    fontSizeMultiplier = 1+(0.25*(Number(localStorage.getItem("fontSizeSetting"))-2));
    applyFontMultiplier(fontSizeMultiplier);
} catch (e) {
    console.warn("Previous font size setting not found");
}

function applyFontMultiplier(multiplier) {
    document.querySelectorAll("*").forEach(element => {
        if (element.dataset.originalFontSize) {
            const originalSize = parseFloat(element.dataset.originalFontSize);
            element.style.fontSize = (originalSize * multiplier) + "px";
        }
    });
}