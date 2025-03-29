
const testText = [
    "The wind goes still.",
    "Through your in-depth investigation, you believe that Bernice Becker, the Rancher. Is the culprit, guilty of killing the sherif.",
    "You and the deputy go to her ranch, the Broken Spur.",
    "Under the power of your superiors, you handcuff her and bring her into jail.",
    "When you reach her, she shoots you another glare, like when you first met her.",
    "This time however, she looked expectant.",
    "As you lock her up, you ask her if she wishes to confess.",
    "She stares you down...",
    "'He killed my husband in cold blood.'",
    "'I made sure he could feel the pain my husband felt.'",
    "'I snuck up on him while he was on the outskirts of the city.'",
    "'I gagged him with that muddy rag but he put a fight.'",
    "'He tried to escape and tore some of my clothes'",
    "'I got the last laugh though, I put a bullet through his spine!'",
    "'He couldn’t move, left him there to bleed out and die.'",
    "After she finishes her confession, each word laced with malice, you can feel confident in yourself as you caught the right person.",
    "You leave the town, wandering off back to where you came from, with the moon to serve as your guide..."

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
