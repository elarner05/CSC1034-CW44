
const testText = [
    "You make your way to the crossroads.",
    "The lights from the nearby buildings illuminating your path.",
    "As you approach, the drifter spots you.",
    "‘Whaddya want from me, at this hour?’ He asks you.",
    "You tell him you are taking him to jail for the murder of the Sherif.",
    "You fool…’ he mutters.",
    "Regardless of his words, you are confident in your judgement.",
    "You bring him to the jail, where he will be left to rot.",
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
