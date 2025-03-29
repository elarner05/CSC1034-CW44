
const testText = [
    "You make your way to the parish.",
    "Reverand Willea Mcrea sees you coming.",
    "As you approach, the drifter spots you.",
    "‘Whaddya want from me, at this hour?’ He asks you.",
    "He sees your handcuffs dangling in your hands.",
    "‘So the time has come has it?’, he asks you.",
    "You tell him that you’ve caught him, the murderer of the sherif.",
    "‘The judgement does not lie with you my friend…’, he says",
    "You bring him to the jail, where he will be locked up.",
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
