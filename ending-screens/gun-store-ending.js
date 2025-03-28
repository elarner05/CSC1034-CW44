
const testText = [
    "You make your way to the shifty gun storen",
    "Through the window of his store, you see the gun store owner polishing the barrel of one of his prized guns.",
    "As you enter, he stops polishing his gun and stares at you.",
    "‘You’ve come for me?’ he asks",
    "You explain to him that you believe he murdered the sherif",
    "‘Sure pal…’ he mutters.",
    "You drag him into his jail cell and lock him up.",
    "…",
    "As you make your way back home, you feel a sense of unease.",
    "Like you’ve made a mistake.",
    "…",
    "You chose wrong…"

];

import { DialogueUpdater } from "../js/story-line.js";

const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const dialogue = new DialogueUpdater(testText, textElement, nextButton);

dialogue.start();

dialogue.getPromise().then(() => {
    nextButton.innerHTML = "Return to Home";
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", () => {
        window.location.href = "../index.html"; // Change to your next game page
    });
});
