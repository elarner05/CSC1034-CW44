import * as Timer from "./timer.js";
import * as SideBar from "./side-bar.js";
import * as SaveData from "./saveData.js";
import ConversationHandler from "./story-line.js"; 


const dialogue = [
    {
      "id": 1,
      "text": [
        "The drifter stands in front of you, tending to his horse. He has a gun holstered on either side of his belt. His hands and clothes are stained with gunpowder. A bag lays next to where his horse is stationed, left slightly open."
      ],
      "choices": [
        {
          "text": "Mind if I ask some questions?",
          "nextID": 2
        },
        {
          "text": "Look for clues",
          "nextID": 3
        }
      ]
    },
    {
      "id": 2,
      "text": [
        "The man looks towards you. He nods his head slightly. He stares towards you, the shadow from his hat obscuring his face."
      ],
      "choices": [
        {
          "text": "Where were you on the night of the murder?",
          "nextID": 6
        },
        {
          "text": "See or hear anything strange?",
          "nextID": 7
        },
        {
          "text": "Did you know the sheriff?",
          "nextID": 8
        },
        {
          "text": "Why'd you stick around?",
          "nextID": 9
        }
      ]
    },
    {
      "id": 3,
      "text": [
        "He takes out a cigar and grips it between his teeth. He procures a box of matches from his pocket, and switfly brings it to the end of his cigar. He draws a long smoke, exhaling a cloud of grey before finally bringing his eyes to yours.",
        "'I'm a drifter. No need for names.'"
      ],
      "choices": [
        {
          "text": "I see.",
          "nextID": 6
        },
        {
          "text": "Nothing at all?",
          "nextID": 10
        }
      ]
    },
    {
      "id": 4,
      "text": [
        "Just passin' through.",
        "He settles his hands into his pockets.",
        "That a crime?"
      ],
      "choices": [
        {
          "text": "Just asking.",
          "nextID": 11
        },
        {
          "text": "That's all?",
          "nextID": 12
        }
      ]
    },
    {
      "id": 5,
      "text": [
        "He glances back towards his horse.",
        "Just wonderin' if all this is leading somewhere, or I've been ridin' in circles."
      ],
      "choices": [
        {
          "text": "I know the feeling.",
          "nextID": 13
        },
        {
          "text": "Feel like something's chasing you?",
          "nextID": 14
        }
      ]
    },
    {
      "id": 6,
      "text": [
        "I'd just got into town.",
        "Settled my horse down and went lookin' for somewhere to rest."
      ],
      "choices": [
        {
            "text": "",
            "nextID": 2
        }
      ]
    },
    {
      "id": 7,
      "text": [
        "Not to my memory.",
        "It was real late at night. Couldn't see much of nothin'."
      ],
      "choices": [
        {
            "text": "I see...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 8,
      "text": [
        "Heard of him.",
        "He sniffs.",
        "I try to keep my distance from folks with badges.",
        "He gives you a cold look."
      ],
      "choices": [
        {
            "text": "Understood...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 9,
      "text": [
        "Didn't know I needed a reason."
      ],
      "choices": [
        {
            "text": "Hm...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 10,
      "text": [
        "Nope."
      ],
      "choices": [
        {
            "text": "Okay...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 11,
      "text": [
        "Mhm.",
        "He folds his arms."
      ],
      "choices": [
        {
            "text": "Moving on...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 12,
      "text": [
        "Had someone to meet.",
        "He spits on the ground.",
        "And I met 'em."
      ],
      "choices": [
        {
            "text": "Alright then...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 13,
      "text": [
        "He nods."
      ],
      "choices": [
        {
            "text": "...",
            "nextID": 1
        }
      ]
    },
    {
      "id": 14,
      "text": [
        "Wouldn't you like to know."
      ],
      "choices": [
        {
            "text": "Well...",
            "nextID": 1
        }
      ]
    }
  ]


Timer.setupTimer();

SideBar.setupSideBar();

SaveData.visitRoom("Crossroads");


const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");
const containerElement = document.getElementById("choicesContainer");

const conversation = new ConversationHandler(dialogue, textElement, nextButton, containerElement, 20);
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

