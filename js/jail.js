
import * as Timer from "./timer.js";
import * as SideBar from "./side-bar.js";
import * as SaveData from "./saveData.js";
import ConversationHandler from "./story-line.js";

const dialogue = [
    {
      "id": 1,
      "text": [
        "You walk towards the jail.",
        "You see the Deputy, Cain Chambers.",
        "He hasn't noticed you yet"
      ],
      "choices": [
        {
          "text": "Talk to Cain Chambers?",
          "nextID": 2
        },
        {
          "text": "Look for clues?",
          "nextID": 21
        },
      ]
    },
    {
      "id": 2,
      "text":[
        "You walk up towards the deputy to ask him some questions.",
        "He is very startled to see you."
      ],
      "choices": [
        {
          "text": "How have you managed the town since the Sherif died?",
          "nextID":3
        },
        {
          "text": "Are there any suspicious people around?",
          "nextID":4
        },
        {
          "text": "Did the Sherif do anything that would make him a target?",
          "nextID":5
        },
        {
          "text": "Where did you find the Sherifs body?",
          "nextID": 6
        }
      ]
    },
    {
      "id":3,
      "text": [
        "I-I've been doing fine since th-the Sherif died...",
        "I've had to make sure that the townspeople don't cause any trouble.",
        "Its been hard trying to fill out his position while we wait for a new Sherif..."
      ],
      "choices":[
        {
          "text": "Was the town disorderly after the Sherif died?",
          "nextID": 7
        },
        {
          "text": "How has the search for a new Sherif gone?",
          "nextID": 8
        }
      ]
    },
    {
      "id":4,
      "text": [
        "Th-theres a few suspicious people about in the town.",
        "There's that Reverand Willie McCrea",
        "He alwauys talks about scary stuff",
        "There's also that Rancher, Bernice Becker",
        "She is not fun to deal with"
      ],
      "choices": [
        {
          "text": "Could you tell me more about this Reverand?",
          "nextID":9
        },
        {
          "text": "Talk to me about that Bernice Becker",
          "nextID":10
        }
      ]
    },
    {
      "id":5,
      "text": [
        "I think...",
        "He didn't do his job very well.",
      ],
      "choices":[
        {
          "text": "How did he do his job?",
          "nextID":11
        },
        {
          "text": "Did he do anything dodgy?",
          "nextID": 12
        }
      ]
    },
    {
      "id":6,
      "text":[
        "Oh, I found his body on the outskirts of the town yesterday morning"
      ],
      "choices":[
        {
          "text": "Did you find out how he died?",
          "nextID": 13
        },
        {
          "text": "Were there any clues around?",
          "nextID":14,
          "itemID":""
        }
      ]
    },
    {
      "id": 7,
      "text":[
        "N-no, suprisingly...",
        "Everyone seemed rather calm about it all.",
        "I dont think they cared that the Sherif died...."
      ],
      "choices":[]
    },
    {
      "id":8,
      "text":[
        "Well...",
        "I dont think anyone here in this town wants the job.",
        "Everyone is wrapped up in their own things to think about being the Sherif."
      ],
      "choices":[
        {
          "text": "Do you think you could be the next Sherif?",
          "nextID": 15
        }
      ]
    },
    {
      "id":9,
      "text":[
        "H-he always talks about how we are all going to die...",
        "And how we will all turn to dust.",
        "I-I dont think he liked the Sherif at all, he seemed to think that he had death coming for him."
      ],
      "choices":[
        {
          "text": "Do you think that he killed the Sherif?",
          "nextId":16
        }
      ]
    },
    {
      "id":10,
      "text": [
        "She's a scary woman she is.",
        "She acted so hostile after her husband died.",
      ],
      "choices":
      {
        "text": "Do you know why she hated you and the Sherif?",
        "nextID":17
      }
    },
    {
      "id":11,
      "text":[
        "Well...",
        "He didn't really do much, he made me do all the work.",
        "Always yelling at me, telling me what to do...",
        "It got annoying..."
      ],
      "choices":[
        {
          "text":"How did it make you feel?",
          "nextID":18
        }
      ]
    },
    {
      "id": 12,
      "text":[
        "He wasn't the most upstanding individual in this town",
        "He was always allowing outlaws into the town and drinkin with them",
        "I had to deal with the mess that they left behind..."
      ],
      "choices":[]
    },
    {
      "id":13,
      "text":[
        "From what i saw of it, he had been shot in the back of the spine.",
        "It seemed planned to give him a slow and painful death",
        "He couldn't move after he was shot, just left to bleed out.",
        "Found him in a puddle of his own blood"
      ],
      "choices":[
        {
          "text": "What was the trajectory of the shot?",
          "nextID": 19
        }
      ]
    },
    {
      "id":14,
      "text":[
        "There seemed to be a peice of torn cloth that the Sherif was clutching on to...",
        "I'm not sure what it was but it looked like he was holding on for dear life."
      ],
      "choices":[
        {
          "text": "How about the body?",
          "nextID":20
        }
      ]
    },
    {
      "id":15,
      "text":[
        "Don't say things like that...",
        "I'm not good enough to be a Sherif",
        "I don't even understand what's going on most of the time..."
      ],
      "choices":[]
    },
    {
      "id":16,
      "text":[
        "I-I can't say something like that...",
        "But...",
        "The Reverand is really creepy, he digging a grave a few days before the Sherif died..."
      ],
      "choices":[]
    },
    {
      "id":17,
      "text":[
        "I-I think she blamed us for her husband going missing...",
        "I think her husband had to talk to the Sherif about something but he never came back."
      ]
    },
    {
      "id":18,
      "text":[
        "H-He took me in when my parents died...",
        "The least I can do is help even if he yells at me"
      ],
      "choices":[]
    },
    {
      "id":19,
      "text":[
        "It appeared that whatever gun was used, it was held right up against the Sherif's spine"
      ],
      "choices":[]
    },
    {
      "id": 20,
      "text":[
        "There seemed to be mud stains on his face...",
        "There also seemed to be stress marks near his mouth, like he was gagged..."
      ],
      "choices":[]
    },

    //Clues
    {
      "id":21,
      "text":[
        "You decide to look for clues in the jail",
      ],
      "choices":[
        {
          "text":"Inspect the deputy?",
          "nextID":22
        },
        {
          "text":"Examine the jail",
          "nextID":23
        },
        {
          "text":"Look at the deputy's rifle?",
          "nextID":24
        },
        {
          "text":"Examine the desk?",
          "nextID":25
        }
      ]
    },
    {
      "id":22,
      "text":[
        "You decide to look at the deputy",
        "He seems to be a bit muddied...",
        "As you look at him you notice that his eyes are darting around the room.",
        "He notices you look at him and flashes you an awkward smile.",
        "He promptly looks away"
      ],
      "choices":[]
    },
    {
      "id":23,
      "text":[
        "You notice that the bars in the jail cell seem slightly rusty.",
        "It looks like the Sherif hasn't jailed anyone in a long time"
      ],
      "choices":[
        {
          "text":"Examine further?",
          "nextID":26
        },
        {
          "text":"Stop Examining?",
          "nextID":21
        }
      ]
    },
    {
      "id":24,
      "text":[
        "You examine the deputy's rifle.",
        "it is a Winchester Model 1866, a 'Yellow-Boy'.",
        "Looks barely used."     
      ],
      choices: []
    },
    {
      "id":25,
      "text":[
        "When you look at the deputy's desk, you notice a pile of papers."
      ],
      "choices":[
        {
          "text": "inspect the papers?",
          "nextID":27
        },
        {
          "text": "Stop inspecting?",
          "nextID": 21
        }
      ]
    },
    {
      "id": 26,
      "text":[
        "When you take a closer look into the jail, you notice that there are dried blood stains on the floor.",
        "On even further review, you notice that there are also mud stains on the jail cell floor..."
      ]
    },
    {
      "id":27,
      "text":[
        "When you inspect the pile of papers, you notice some papers called 'notes'."
      ],
      "choices":[
        {
          "text": "Inspect the notes?",
          "nextID": 28,
          "itemID": 8,
          "oneTime": true
        },
        {
          "text": "Stop inspecting?",
          "nextID": 21
        }
      ]
    },
    {
      "id":28,
      "text":[
        "You look at the notes.",
        "It appears to be something the deputy has written.",
        "The notes start of talking about his day to day dealing in the town.",
        "However, they start to spiral into ramblings of hatred directed towards the Sherif.",
        "Detailing how the Sherif abuses his power over him.",
        "You decide to add the notes to your bag while the deputy isn't looking"
      ]
    }
  ]


Timer.setupTimer();

SideBar.setupSideBar();

SaveData.visitRoom("Jail");


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
