import * as Timer from "./timer.js";
import * as SaveData from "./saveData.js";
import { DialogueUpdater } from "./story-line.js";


const prologueText = [
    "As the sun rises, you arrive at Obsidian Springs.",
    "You can hear the quiet whistle of the wind echo through the desolate town.",
    "As you look to the town board, you see a sign.",
    "‘New sheriff wanted’",
    "The old sheriff has died.",
    "You are a detective, and you have been tasked with solving the murder of the sheriff.",
    "Your superiors have given you a logbook and a bag to keep track of evidence or clues you may find.",
    "And now you must solve the case."
];

SaveData.clearSaveData();


const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const dialogue = new DialogueUpdater(prologueText, textElement, nextButton);

dialogue.start();

dialogue.getPromise().then(() => {
    nextButton.innerHTML = "Continue";
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", () => {
        if (nextButton.innerHTML === "Continue") {    // Move to the next page when clicking "Continue"
            Timer.setStartTime();
            //window.location.href = "main-town.html"; // Change to your next game page
        }
    });
});
