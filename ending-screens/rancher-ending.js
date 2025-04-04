import * as SaveData from "../js/saveData.js";
if (!SaveData.checkUserID()) {
      window.location.href = "../index.html";
}

function showRightChoice() {
    const wrongChoiceDiv = document.getElementById('rightChoice');
    wrongChoiceDiv.classList.remove('hidden');
    setTimeout(() => {
        wrongChoiceDiv.style.opacity = "1";
    }, 10);
}

const dialogueText = [
    "The wind goes still.",
    "Due to your in-depth investigation, you believe that Bernice Becker, the rancher, is guilty of killing the sheriff.",
    "You and the deputy go to her ranch, the Broken Spur.",
    "You handcuff her and bring her into jail.",
    "When you reach her, she shoots you another glare, like when you first met her.",
    "This time however, she looks expectant.",
    "As you lock her up, you ask her if she wishes to confess.",
    "She stares you down...",
    "'He killed my husband in cold blood.'",
    "'The pain my husband felt must be felt by him.'",
    "'I gagged him outside the town with that muddy rag but he put up a fight.'",
    "'The last laugh was mine though, I put a bullet through his spine!'",
    "'He couldn’t move, left him there to bleed out and die.'",
    "After she finishes her confession, each word laced with malice, you can feel confident in yourself as you caught the right person.",
    "You leave the town, wandering off back to where you came from, with the moon to serve as your guide...",
    showRightChoice

];

import { DialogueUpdater } from "../js/story-line.js";

const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const dialogue = new DialogueUpdater(dialogueText, textElement, nextButton, 20);

dialogue.start();

dialogue.getPromise().then(() => {
    dialogue.getPromise().then(() => {
        setTimeout(() => {
            window.location.href = "../index.html"; // Change to your next game page
        }, 5000);
    });    
});
