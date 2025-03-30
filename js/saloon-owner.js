

import * as Timer from "./timer.js";
import * as SideBar from "./side-bar.js";
import * as SaveData from "./saveData.js";
import ConversationHandler from "./story-line.js";



const dialogue = [
   {
    "id" : 1,
    "text" : [
        "As the doors of the saloon fly open you're immideiately hit with the strong smell of alcohol and the noise of drunk men.",
        "On the other end of the room, behinf the counter you spot the woman running this establishment: Denise Doherty.",
        "She's busy tending to a customer but does spare you a fleeting glance."
    ],
    "choices" : [
        {
            "text" : "Head towards Denise Doherty.",
            "nextID" : 2,
        },
        {
            "text" : "Mingle with the customers and chat.",
            "nextID" : 3,
        },
    ],
   },
   {
    "id" : 2,
    "text" : [
        "You walk upto the counter and wait for Denise to be done with her bartender duties.",
        "As soon as she's done she makes a swift turn in your direction,",
        "So, do you really think you can solve the dead sheriff's case, huh?"
    ],
    "choices" : [
        {
            "text" : "Oh! So you were expecting me? This will make things much easier for the both of us.",
            "nextID" : 4,
        },
        {
            "text" : "That is correct. Let me just ask you soem questions regarding the case then.",
            "nextID" : 5,
        },
        {
            "text" : "How did you know that?",
            "nextID" : 6,
        },
        {
            "text" : "Well I'm not really here for that right now. Just want a drink and wanted to know the town's people.",
            "nextID" : 7,
        },
    ],
   },
   {
    "id" : 3,
    "text" : [
        "You approach an old friendly looking man and he offers you the seat next to him.",
        "You introduce yourself and the old man grumbles,",
        "You're a good lad, but honestly its for the better that that man's gone",
    ],
    "choices" : [
        {
            "text" : "Well, you dont seem to be the only one with that opinion.",
            "nextID" : 8,
        },
        {
            "text" : "Now, why would you say that about a man whose grave is still wet?",
            "nextID" : 9,
        },
        {
          "text" : "Right, Do you know anything you could help me with?",
          "nextID" : 10,  
        },
        {
          "text" : "Really? Is there any reason why you say that?",
          "nextID" : 11,
        },
    ],
   },
   {
    
   }


]


Timer.setupTimer();

SideBar.setupSideBar();

SaveData.visitRoom("Saloon");


const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");
const containerElement = document.getElementById("choicesContainer");

const conversation = new ConversationHandler(dialogue, textElement, nextButton, containerElement, 1);
conversation.start();

conversation.getPromise().then(() => {
    nextButton.innerHTML = "Close";
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", () => {
      document.getElementById("textBox").classList.add("hidden");
    })
  })

document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "main-town.html";
})
