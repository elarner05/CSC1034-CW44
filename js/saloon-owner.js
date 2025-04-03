

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
                "nextID": 2
            },
            {
                "text": "Mingle with the customers and chat.",
                "nextID": 3
            },
        ],
    },
    {
        "id": 2,
        "text": [
            "You walk up to the counter and wait for Denise to be done with her bartender duties.",
            "As soon as she's done she makes a swift turn in your direction,",
            "\"So, do you really think you can solve the dead sheriff's case, huh?\""
        ],
        "choices": [
            {
                "text": "Oh! So, you were expecting me? This will make things much easier for the both of us.",
                "nextID": 4
            },
            {
                "text": "That is correct. Let me just ask you some questions regarding the case then.",
                "nextID": 4
            },
            {
                "text": "How did you know that?",
                "nextID": 5
            },
            {
                "text": "Well I'm not really here for that right now. Just want a drink and wanted to know the town's people.",
                "nextID": 3
            },
        ],
    },
    {
        "id": 3,
        "text": [
            "You approach an old friendly looking man and he offers you the seat next to him.",
            "You introduce yourself and the old man grumbles,",
            "\"You're a good lad, but honestly its for the better that that man's gone.\""

        ],
        "choices": [
            {
                "text": "Well, you don't seem to be the only one with that opinion.",
                "nextID": 7
            },
            {
                "text": "Now, why would you say that about a man whose grave is still wet?",
                "nextID": 6
            },
            {
                "text": "Right, Do you know anything you could help me with?",
                "nextID": 8
            },
            {
                "text": "I should just speak to the owner about this.",
                "nextID": 2
            }
        ]
    },
    {
        "id": 4,
        "text": [
            "Denise crosses her arms and sighs,",
            "\"Make sure you ask the right questions only, dont waste my time,\""
        ],
        "choices": [
            {
                "text": "Was the sheriff a regular at your establishment?",
                "nextID": 12
            },
            {
                "text": "Have you noticed anything peculiar about the town recently? Any changes worth noting?",
                "nextID": 13
            }
        ]
    },
    {
        "id": 5,
        "text": ["Denise shakes her head and chuckles,",
            "\"In a town this small word spreads fast. Now do you have any actual questions?\""
        ],
        "choices": [
            {
                "text": "I do have some questions.",
                "nextID": 4
            },
            {
                "text" : "I want to go check in on the cutomers first.",
                "nextID" : 3
            }
        ]
    },
    {
        "id" : 6,
        "text" : ["The old man just takes another sip of his drink and shakes his head.",
                  "\"Do not misunderstand me, for I am just relieved that the town is free from his corruption.\""
        ],
        "choices" : [
            {
                "text" : "He was corrupt? How so?",
                "nextID" : 7
            }
        ]

    },
    {
        "id": 7,
        "text": [  "The old man sighs, \"I say this for good reason,\"",
                  "\"He didn't leave poor Denise alone either. That sheriff ran her dry of supply and never paid her back.\""],
        "choices": [
            {
                "text": "Could there be a proof for that?",
                "nextID": 17
            },
            {
                "text" : "I should ask Denise herself then.",
                "nextID" : 2
            }
        ]
    },
   
    {
        "id": 8,
        "text": ["\"I'm sorry son, but this hag here is only ever sober in his sleep. I wish I could have helped you.\""
        ],
        "choices": [
            {
                "text": "I should try talking to Denise",
                "nextID": 2

            }]
    },
   
    {
        "id": 12,
        "text": ["\"The man was a drunkard and this is the only saloon in this area.\"",
            "She looks down and chuckles,",
            "\"He always wanted everything for free.\""],
        "choices": [{

            "text": "Do you have any proof for accusation.",
            "nextID": 16
        },
        {
            "text": "I'm not done with the investigation.",
            "nextID" : 4
        }]
    },
    {
        "id": 13,
        "text": [
            "Denise ponders for a bit,",
            "\"That strange man who appeared recently got here.\"",
            "\"He was here that night, could've been the last man to retire to bed. Seemed like he was waiting for something.\"",
            "\"Very odd fella,\"",
            "She adds as an afterthought."],
        "choices": [{
            "text" : "That does sound odd.",
            "nextID": 15
        },
        {
            "text" : "I need to ask you something.",
            'nextID' : 4
        }
    ]

    },
    {
        "id": 15,
        "text": ["You take note of the mysterious man and decide to get back to that later."],
        "choices": [
            {
            "text" :"I should check in with the customers.",
            "nextID": 3
            },
            {
                "text" : "I still have a few more questions.",
                "nextID" : 4
            }

         ]

    },
    {
        "id": 16,
        "text": [
            "Denise nods and pulls out an old, worn-out ledger.",
            "\"We keep records of everything. The sheriff's name should be all over this.\""

        ],
        "choices": [
            {
                "text" : "Let me take a look at it.",
                "nextID": 101,
                "itemID": 8,
                "oneTime": true
            },
        ]


    },
    {
        "id" : 17,
        "text" : [
            "\"Yes, the ledger that Denise keeps behind the counter should have all the records of the sheriff's visits here.\"",
            "The man points towards the counter."
        ],
        "choices" : [
            {
                "text" : "I'll go take a look at it.",
                "nextID" : 102,
                "itemID" : 8,
                "oneTime" : true
            },
        ]
    },
    {
        "id" : 101,
        "text" : ["You go through the ledger and confirm that the sheriff did owe Denise a lot of money."],
        "choices" : [
            {
                "text" : "I still need to speak to you further.",
                "nextID" : 4

            },
            {
                "text" : "I might go talk to a few customers.",
                "nextID" : 3
            },
        ],
    },
    {
        "id" : 102,
        "text" : ["You walk upto the counter and ask for Denise to cooperate,",
                  "She's surprisingly obedient and hands over the old ledger to you."
        ],
        "choices" :[
            {
                "text" : "You were right. Had you noticed anything else as well?",
                "nextID" : 8
            }
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
