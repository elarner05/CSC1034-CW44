if (localStorage.getItem("dyslexicFont") === "true") {
    document.body.classList.add("dyslexic");
    document.getElementById("dyslexicFontButton").innerHTML = "Dyslexic Font: On";
    document.getElementById("dyslexicFontButton").classList.remove("button-off");
    document.getElementById("dyslexicFontButton").classList.add("button-on");
}