import * as SaveData from "./saveData.js";
import { DialogueUpdater } from "./story-line.js";

if (!SaveData.checkSessionID() || !SaveData.checkUserID()) {
    window.location.href = "index.html";
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

SaveData.getUserData().then(result=>{
    let playerName = SaveData.noErrors(result) ? capitalizeFirstLetter(result.playerName.toLowerCase()) : "PLAYER";


    const prologueText = [
        "As the sun rises, you arrive at Obsidian Springs.",
        "You can hear the quiet whistle of the wind echo through the desolate town.",
        "As you look to the town board, you see a sign.",
        "‘New sheriff wanted’",
        "The old sheriff is dead.",
        `You are Detective ${playerName}, and you have been tasked with solving the murder of the sheriff.`,
        "Your superiors have given you a logbook and a bag to keep track of evidence or clues you may find.",
        "And now you must solve the case."
    ];

    SaveData.clearSaveData();


    const textElement = document.getElementById("storyText");
    const nextButton = document.getElementById("nextButton");

    //20 is the default, 1 is just for testing purposes
    const dialogue = new DialogueUpdater(prologueText, textElement, nextButton, 1);

    dialogue.start();

    dialogue.getPromise().then(() => {
        nextButton.innerHTML = "Continue";
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", () => {
            if (nextButton.innerHTML === "Continue") {    // Move to the next page when clicking "Continue"
                SaveData.setStartTime().then(()=>SaveData.setPauseTime().then(()=> {
                    window.location.href = "main-town.html";   // Change to your next game page

                }))
            }
        });
    });
});