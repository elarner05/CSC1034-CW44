
function showWrongChoice() {
    const wrongChoiceDiv = document.getElementById('wrongChoice');
    wrongChoiceDiv.classList.remove('hidden');
    setTimeout(() => {
        wrongChoiceDiv.style.opacity = "1";
    }, 10);
}

const dialogueText = [
    "You make your way to the crossroads.",
    "The lights from the nearby buildings illuminate your path.",
    "As you approach, the drifter spots you.",
    "‘Whaddya want from me, at this hour?’ He asks you.",
    "You tell him you are taking him to jail for the murder of the sheriff.",
    "You fool…’ he mutters.",
    "Regardless of his words, you are confident in your judgement.",
    "You bring him to the jail, where he is left to rot.",
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
