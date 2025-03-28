
const testText = [
    "You walk towards the saloon",
    "As you enter, the saloon owner, Denice Doherty, stands at her empty bar.",
    "‘You want a drink?’ she asks you.",
    "You tell her that you aren’t here for a drink…",
    "But for her…",
    "While she is busy processing what you said, you grab her hands and put handcuffs on her.",
    "You take her to the jail and put her into a cell.",
    "‘You’re not getting any more drink!’",
    "‘You’ve got the wrong woman!’ she yells",
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
