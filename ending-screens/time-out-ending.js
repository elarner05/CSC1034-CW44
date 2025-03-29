
const testText = [
    "Darkness falls over the town.",
    "You feel a sense of dread wash over you.",
    "The killer remains free.",
    "You weren't fast enough.",
    "You feel someone's presence behind you.",
    "You have lost."
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
