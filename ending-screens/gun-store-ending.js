
function showWrongChoice() {
    const wrongChoiceDiv = document.getElementById('wrongChoice');
    wrongChoiceDiv.classList.remove('hidden');
    setTimeout(() => {
        wrongChoiceDiv.style.opacity = "1";
    }, 10);
}

const dialogueText = [
    "You make your way to the gun store.",
    "Through the window of his store, you see the gun store owner polishing the barrel of one of his prized guns.",
    "As you enter, he stops polishing his gun and stares at you.",
    "‘You’ve come for me?’ he asks.",
    "You explain to him that you believe he murdered the sheriff.",
    "‘Sure pal…’ he mutters.",
    "You drag him into his jail cell and lock him up.",
    "…",
    "As you make your way back home, you feel a sense of unease.",
    "Like you’ve made a mistake.",
    "…",
    showWrongChoice

];

import { DialogueUpdater } from "../js/story-line.js";

const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const dialogue = new DialogueUpdater(dialogueText, textElement, nextButton);

dialogue.start();

dialogue.getPromise().then(() => {
    dialogue.getPromise().then(() => {
        setTimeout(() => {
            window.location.href = "../index.html"; // Change to your next game page
        }, 5000);
    });
});
