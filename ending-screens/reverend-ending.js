import * as SaveData from "../js/saveData.js";
if (!SaveData.checkUserID()) {
      window.location.href = "../index.html";
}

function showWrongChoice() {
    const wrongChoiceDiv = document.getElementById('wrongChoice');
    wrongChoiceDiv.classList.remove('hidden');
    setTimeout(() => {
        wrongChoiceDiv.style.opacity = "1";
    }, 10);
}

const dialogueText = [
    "You make your way to the parish.",
    "Reverand Willie McCrea sees you coming.",
    "‘Whaddya want from me, at this hour?’ He asks you.",
    "He sees your handcuffs dangling in your hands.",
    "‘So the time has come has it?’, he asks you.",
    "You tell him that you’ve caught the murderer of the sheriff.",
    "‘The judgement does not lie with you my friend…’, he says",
    "You bring him to the jail where he will be locked up.",
    "…",
    "As you make your way back home, you feel a sense of unease.",
    "Like you’ve made a mistake.",
    "…",
    showWrongChoice

];
import { DialogueUpdater } from "../js/story-line.js";

const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const dialogue = new DialogueUpdater(dialogueText, textElement, nextButton, 1);

dialogue.start();

dialogue.getPromise().then(() => {
    setTimeout(() => {
        window.location.href = "../index.html"; // Change to your next game page
    }, 5000);
});
