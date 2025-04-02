

import * as Timer from "./timer.js";
import * as SideBar from "./side-bar.js";
import * as SaveData from "./saveData.js";
import ConversationHandler from "./story-line.js";

if (!SaveData.checkSessionID()) {
    window.location.href = "index.html";
}

SaveData.setupAutoSaveTime();

const dialogue = [
    {
        "id": 1,
        "text": [
            "As the doors of the saloon fly open you're immediately hit with the strong smell of alcohol and the noise of drunk men.",
            "On the other end of the room, behind the counter you spot the woman running this establishment: Denise Doherty.",
            "She's busy tending to a customer but does spare you a fleeting glance."
        ],
        "choices": [
            {
                "text": "Head towards Denise Doherty.",
                "nextID": 2,
            },
            {
                "text": "Mingle with the customers and chat.",
                "nextID": 3,
            },
        ],
    },
    {
        "id": 2,
        "text": [
            "You walk upto the counter and wait for Denise to be done with her bartender duties.",
            "As soon as she's done she makes a swift turn in your direction,",
            "\"So, do you really think you can solve the dead sheriff's case, huh?\""
        ],
        "choices": [
            {
                "text": "Oh! So you were expecting me? This will make things much easier for the both of us.",
                "nextID": 4,
            },
            {
                "text": "That is correct. Let me just ask you some questions regarding the case then.",
                "nextID": 4,
            },
            {
                "text": "How did you know that?",
                "nextID": 5,
            },
            {
                "text": "Well I'm not really here for that right now. Just want a drink and wanted to know the town's people.",
                "nextID": 6,
            },
        ],
    },
    {
        "id": 3,
        "text": [
            "You approach an old friendly looking man and he offers you the seat next to him.",
            "You introduce yourself and the old man grumbles,",
            "\"You're a good lad, but honestly its for the better that that man's gone\""
        ],
        "choices": [
            {
                "text": "Well, you dont seem to be the only one with that opinion.",
                "nextID": 7,
            },
            {
                "text": "Now, why would you say that about a man whose grave is still wet?",
                "nextID": 7,
            },
            {
                "text": "Right, Do you know anything you could help me with?",
                "nextID": 8,
            },
            {
                "text": "Really? Is there any reason why you say that?",
                "nextID": 9,
            }
        ]
    },
    {
        "id": 4,
        "text": [
            "\"Make sure you ask the right questions only, dont waste my time,\"",
            "Denise huffs",
        ],
        "choices": [
            {
                "text": "Was the sheriff a regular at your establishment?",
                "nextID": 12,
            },
            {
                "text": "Have you noticed anything peculiar about the town recently? Any changes worth noting?",
                "nextID": 13,
            },
            {
                "text": "How often did you see the sheriff?",
                "nextID": 12,
            },
            {
                "text": "Would you be able to provide an alibi for the night of the murder?",
                "nextID": 13,
            }
        ]
    },
    {
        "id": 5,
        "text": ["In a town this small word spreads fast.",
            "Listen I have a saloon to run, can you hurry with this investigation?"
        ],
        "choices": [
            {
                "text": "Thats true. But..",
                "nextID": 4,
            }
        ]
    },
    {
        "id": 6,
        "text": ["\"Go ahead then, make yourself at home.\"",],
        "choices": [
            {
                "text": "You look around the room.",
                "nextID": 3,
            }
        ]
    },
    {
        "id": 7,
        "text": ["\"Because it is the truth only\"",
            "He takes a large sip of his drink and continues,",
            "\"I mean just take our Denise here as an example.\"",
            "\"He was running her dry of supply and never once paid her back.\""
        ],
        "choices": [{
            "text": "I see..",
            "nextID": 14,
        }]
    },
    {
        "id": 8,
        "text": ["\"I'm sorry son, but this hag here is only ever sober in his sleep. I wish I could've witnessed soemthing too but unfortunately I'm of no help.\"",
        ],
        "choices": [
            {
                "text": "I should try talking to Denise",
                "nextID": 2,

            }]
    },
    {
        "id": 9,
        "text": ["The old man slams his cup down and stares you down.",],
        "choices": [{
            "text" : "You reel back.",
            "nextID": 7,
        }]
    },
    {
        "id": 12,
        "text": ["\"The man was a drunkard and this is the only saloon in this area.\"",
            "She looks down and chuckles,",
            "\"He always wanted everything for free.\"",],
        "choices": [{
            "text": "Really?",
            "nextID": 14,
        }]
    },
    {
        "id": 13,
        "text": ["\"Ofcourse, that strange new man who recently got here.\"",
            "\"He was here that night, Could've been the last man to retire to bed, seemed like he was waiting for something.\"",
            "\"Very odd fella,\"",
            "She adds as an afterthought.",],
        "choices": [{
            "text" : "That does sound odd.",
            "nextID": 15,
        }]
    },
    {
        "id": 14,
        "text": ["Is there any proof that he was a regular?",],
        "choices": [{
            "nextID": 16,
        }]
    },
    {
        "id": 15,
        "text": ["I still have a few more questions to ask you.",],
        "choices": [{
            "nextID": 4,
        }]
    },
    {
        "id": 16,
        "text": ["\"Yes, every customer's logs are kept in a ledger.\"",

        ],
        "choices": [
            {
                "nextID": 4,
                "itemID": 8,
                "oneTime": true
            },
        ]

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
