
const testText = [
    "You enter the jail.",
    "The deputy sees you",
    "You ask the deputy for handcuffs, he gladly gives them to you.",
    "You also ask him to put out his hands for a moment",
    "As he does such, you put the handcuffs on him.",
    "‘wh-what are you doing to me?!?!?’, he stammers",
    "You explain to him that you believe he is the murder",
    "‘I can’t believe you think I killed him…’ he murmurs",
    "As you lock him up the jail, you hear him gently sobbing.",
    "You know that those have to crocodile tears, those of a murderer.",
    "…",
    "As you make your way back home, you feel a sense of unease.",
    "Like you’ve made a mistake.",
    "…",
    "You chose wrong…",
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
