function showWrongChoice() {
    const wrongChoiceDiv = document.getElementById('wrongChoice');
    wrongChoiceDiv.classList.remove('hidden');
    setTimeout(() => {
        wrongChoiceDiv.style.opacity = "1";
    }, 10);
}

const dialogueText = [
    "The Arms Dealer shoots you",
    "As you bleed out, you think",
    "Was that a good decision?",
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