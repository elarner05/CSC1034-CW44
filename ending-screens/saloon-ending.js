function showWrongChoice() {
    const wrongChoiceDiv = document.getElementById('wrongChoice');
    wrongChoiceDiv.classList.remove('hidden');
    setTimeout(() => {
        wrongChoiceDiv.style.opacity = "1";
    }, 10);
}
const dialogueText = [
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
    "...",
    showWrongChoice

];

import { DialogueUpdater } from "../js/story-line.js";

const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const dialogue = new DialogueUpdater(dialogueText, textElement, nextButton,1);

dialogue.start();

dialogue.getPromise().then(() => {
    dialogue.getPromise().then(() => {
        setTimeout(() => {
            window.location.href = "../index.html"; // Change to your next game page
        }, 5000);
    });    
});
