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
      "id": 101,
      "text": [
        "The man stares at you."
      ],
      "choices": [
        {
          "text": "I have some more questions.",
          "nextID": 102
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
          "nextID": 4
        },
        {
          "text": "See or hear anything strange?",
          "nextID": 8
        },
        {
          "text": "Did you know the sheriff?",
          "nextID": 11
        },
        {
          "text": "Why'd you stick around?",
          "nextID": 14
        }
      ]
    },
    {
      "id": 102,
      "text": [
        "\"Mhm...\""
      ],
      "choices": [
        {
          "text": "Where were you on the night of the murder?",
          "nextID": 4
        },
        {
          "text": "See or hear anything strange?",
          "nextID": 8
        },
        {
          "text": "Did you know the sheriff?",
          "nextID": 11
        },
        {
          "text": "Why'd you stick around?",
          "nextID": 14
        }
      ]
    },
    {
      "id": 3,
      "text": [
        "You take a look at the surroundings."
      ],
      "choices": [
        {
          "text": "Inspect his bag?",
          "nextID": 16
        },
        {
          "text": "Inspect his gun?",
          "nextID": 17
        },
        {
          "text": "Inspect his horse?",
          "nextID": 18
        },
        {
          "text": "Inspect the drifter?",
          "nextID": 19
        }
      ]
    },
    {
      "id": 4,
      "text": [
        "\"I'd just got into town.\"",
        "\"Settled my horse down and went lookin' for somewhere to rest.\""
      ],
      "choices": [
        {
          "text": "What time did you get here?",
          "nextID": 5
        },
        {
          "text": "Where was that?",
          "nextID": 6
        }
      ]
    },
    {
      "id": 5,
      "text": [
        "\"'Round dusk. Sun was just about set.\""
      ],
      "choices": [
        {
          "text": "",
          "nextID": 101
        }
      ]
    },
    {
      "id": 6,
      "text": [
        "\"Where'd you think?\"",
        "\"The saloon.\""
      ],
      "choices": [
        {
            "text": "See anything in there?",
            "nextID": 7

        }
      ]
    },
    {
      "id": 7,
      "text": [
        "\"Drinking.\"",
        "\"Gambling.\"",
        "\"Fighting.\"",
        "\"But that's not what you're looking for.\""
      ],
      "choices": [
        {
            "text": "",
            "nextID": 101
        }
      ]
    },
    {
      "id": 8,
      "text": [
        "\"Been hearin' an' seein' that pastor since I got here.\"",
        "He gestures towards the man standing outside of the parish.",
        "\"Hasn't stopped preachin' to himself or digging them graves.\"",
        "\"Hard not to overhear when yer standin' here.\""
      ],
      "choices": [
        {
            "text": "What's odd about it?",
            "nextID": 9
        }
      ]
    },
    {
      "id": 9,
      "text": [
        "\"You serious?\"",
        "\"Listen to him for a second.\"",
        "\"It's all existential business.\"",
        "\"And the grave.\""
      ],
      "choices": [
        {
            "text": "The grave?",
            "nextID": 10
        }
      ]
    },
    {
      "id": 10,
      "text": [
        "\"He's been at it since I got here.\"",
        "\"Since yesterday.\""
      ],
      "choices": [
        {
            "text": "",
            "nextID": 101
        }
      ]
    },
    {
      "id": 11,
      "text": [
        "\"Heard'a him.\"",
        "\"Don't mix well with folks of his trade.\"",
        "He stares through you.",
        "\"But he's made a name for himself.\"",
        "\"Ain't you heard about him?\""
      ],
      "choices": [
        {
            "text": "Made a name for himself?",
            "nextID": 12
        }
      ]
    },
    {
      "id": 12,
      "text": [
        "He laughs to himself.",
        "\"Mhm.\"",
        "\"Hear his name round these parts a lot.\"",
        "\"Even far beyond these parts.\"",
        "\"Popular guy.\""
      ],
      "choices": [
        {
            "text": "How come?",
            "nextID": 13
        }
      ]
    },
    {
      "id": 13,
      "text": [
        "\"He runs with some rowdy crowds.\"",
        "\"Hear they pass through here a lot.\"",
        "\"Hear that's not something the folks here take kindly to.\""
      ],
      "choices": [
        {
            "text": "",
            "nextID": 101
        }
      ]
    },
    {
      "id": 14,
      "text": [
        "\"Had business here.\"",
        "\"Someone I had to talk to.\"",
        "He waits for a second.",
        "\"I best be leavin' soon.\""
      ],
      "choices": [
        {
            "text": "Who was it?",
            "nextID": 15
        }
      ]
    },
    {
      "id": 15,
      "text": [
        "\"Private matter.\"",
        "\"All taken care of.\"",
        "\"Don't you worry 'bout a thing.\"",
        "He turns away from you and takes a draw of his cigar."
      ],
      "choices":[
        {
            "text": "",
            "nextID": 1
        }
      ]
    },
    {
      "id": 16,
      "text": [
        "You look in the drifter's bag.",
        "It's left open just enough to see inside.",
        "You crouch down and lift a folded piece of paper.",
        "The man's eyes follow you. He furrows his brow but says nothing."
      ],
      "choices": [
        {
          "text": "Go back.",
          "nextID": 101,
          "itemID": 4,
          "oneTime": true
        }
      ]
    },
    {
      "id": 17,
      "text": [
        "You look at the gun on the right drifter's hip.",
        "It's a revolver, all six chambers filled.",
        "You lean your head over to look at the gun.",
        "He interrupts you.",
        "\"Does that seem like a good idea?\"",
        "You back off."
      ],
      "choices": [
        {
          "text": "",
          "nextID": 101
        }
      ]
    },
    {
      "id": 18,
      "text": [
        "You approach his horse.",
        "It stares at you.",
        "You stare back.",
        "It doesn't seem to know anything."
      ],
      "choices": [
        {
          "text": "",
          "nextID": 101
        }
      ]
    },
    {
      "id": 19,
      "text": [
        "The man smells of gunpowder.",
        "His clothes are stained in the soot of it.",
        "His face is scarred and rough.",
        "His hands never stray too far from his gun holsters.",
        "He squints his eyes at you.",
        "\"There something on my face?\""
      ],
      "choices": [
        {
          "text": "",
          "nextID": 101
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

