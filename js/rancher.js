const dialogue = [
    {
      "id": 1,
      "text": [
        "You approach the Broken Spur Ranch.",
        "At the front, you see the rancher, Bernice Becker.",
        "She's leaning on a fence post as she sees you approach",
      ],
      "choices": [
        {
          "text": "Talk to Bernice Becker?",
          "nextID": 2
        },
        {
          "text": "Look for clues?",
          "nextID": 15
        },
      ]
    },
    {
        "id": 2,
        "text": [
        "You walk towards her.",
        "She shoots you a glance."
      ],
      "choices": [
        {
          "text": "Could you tell me about the town?",
          "nextID": 3
        },
        {
          "text": "Tell me about your ranch?",
          "nextID": 4
        },
        {
          "text": "Is it okay if I ask you a few questions?",
          "nextID": 5
        },
        {
          "text": "Have you seen anyone suspicious?",
          "nextID": 6
        }
      ]
      },
    {
      "id": 3,
      "text": [
        "Well...",
        "My husband and I, God bless him, we moved in here may years ago.",
        "It was a quaint wee town then, still is.",
        "Only difference is that the sheriff is dead."
      ],
      "choices": [
        {
          "text": "How did you and your husband meet?",
          "nextID": 7
        },
        {
          "text": "Has the town always been this quiet?",
          "nextID": 8
        },
      ]
    },
    {
      "id": 4,
      "text": [
        "It was built by my husband and I.",
        "He always loved animals.",
        "Always made sure to keep em safe."
      ],
      "choices": [
        {
          "text": "Do you have trouble with all the cattle?",
          "nextID": 9
        },
        {
          "text": "How are the cows and horses?",
          "nextID": 10
        },
      ]
    },
    {
      "id": 5,
      "text": [
        "Depends on what your asking..."
      ],
      "choices": [
        {
          "text": "Did the sheriff do anything that would make him a target?",
          "nextID": 11
        },
        {
          "text": "How has the deputy handled the Sheriffs death?",
          "nextID": 12
        },
      ]
    },
    {
      "id": 6,
      "text": [
        "Well..",
        "This town has a few odd fellas about.",
        "Mainly that there drifter and the gun shop owner.",
        "Always on the shady side of things..."
      ],
      "choices": [
        {
          "text": "What is the drifter like?",
          "nextID": 13
        },
        {
          "text": "How about that gun shop owner?",
          "nextID": 14
        },
      ]
    },
    {
      "id": 7,
      "text": [
        "We met as he was riding through towns.",
        "Just so happened to ride through mine.",
        "Although he was planning to stay for a short while, he stayed longer for me.",
        "Then after a while we took off to make a place for ourselves.",
        "Such a good man...",
      ],
      "choices": []
    },
    {
      "id": 8,
      "text": [
        "Yes it has. Never been enough people in the town to sustain much livelihood at all.",
        "S'why my husband was so keen to start a ranch"
      ],
      "choices": []
    },
    {
        "id": 9,
        "text": [
            "We've never had trouble with them before, my husband would always be keeping an eye out for them.",
            "He made sure that the fences where always secure.",
            "Made sure that nothing got moved out.",
            "One night though, he said he had to get a run away horse...",
            "Never came back..."
        ],
        "choices": []
    },
    {
        "id": 10,
        "text": [
            "They always cause a ruckus. Get mud everywhere",
            "That's why I always have a spare change of clothes lying around"
        ],
        "choices": []
    },
    {
      "id": 11,
      "text": [
        "That pitiful swine.",
        "He let the power get to his head. He became rotten",
        "Letting outlaws and drifters get of scot free when they broke our things.",
        "Sold himself out and left us with nothing."
      ],
      "choices": []
    },
    {
      "id": 12,
      "text": [
        "That bundle of nerves?",
        "Hasn't handled it well at all, he's been panicking and getting all worked up.",
        "He's too nervous, keeps accusing all of us of killing the Sheriff."
      ],
      "choices": []
    },
    {
      "id": 13,
      "text": [
        "That guy..",
        "There's no reason for him to be in this town.",
        "He's too armed, like he's been in fights.",
        "He showed up a few days before the Sheriff died as well..."
      ],
      "choices": []
    },
    {
      "id": 14,
      "text": [
        "He's a shifty one he is...",
        "Awfully proud of his guns and his shooting skills that he claims he has.",
        "He's always been dealing with shady people."
      ],
      "choices": []
    },
    {
        "id": 15,
        "text":[
            "You take a look around the ranch."
        ],
        "choices": [
            {
                "text": "Check the muddy pair of clothes?",
                "nextID": 16
            },
            {
                "text": "Inspect the revolver?",
                "nextID": 17
            },
            {
                "text": "Check the fence?",
                "nextID": 18
            },
            {
                "text": "Inspect the rancher?",
                "nextID": 19
            }
            ]
        
    },
    {
      "id": 16,
      "text": [
        "You observe that there is a pair of muddy clothes sitting near the ranch woman.",
        "You notice that there is a tear in the clothes.",
        "The ranch woman notices you staring at her clothes...",
        "She asks you to stop looking at her old clothes."
      ],
      "choices": [
        {
            "text": "Further inspect the clothes?",
            "nextID": 20,
            "itemID": 3
        },
        {
            "text": "Stop examining the clothes?",
            "nextID": 21
        }
      ]
    },
    {
      "id": 17,
      "text": [
        "You notice that she has a gun holstered to her hip.",
        "As you examine it, you notice that the revolver has one less round in its cylinder.",
        "There also appears to be gun powder marks on the barrel of the gun."
      ],
      "choices": []
    },
    {
      "id": 18,
      "text": [
        "You examine the fence.",
        "....",
        "It's just a fence with some slight wear and tear.",
        "What else did you expect?"
      ],
      "choices": []
    },
    {
      "id": 19,
      "text": [
        "You inspect the rancher known as 'Bernice Becker'.",
        "She is wearing the usual attire of a ranch woman.",
        "She does not appreciate you staring at her."
      ],
      "choices": []
    },
    {
      "id": 20,
      "text": [
        "You further inspect the clothes and see a muddy piece of cloth.",
        "You pick up the piece of cloth and put it in your bag."
      ],
      "choices": [],
     
    },
    {
      "id": 21,
      "text": [
        "You decide to stop looking at her old clothes because it is wierd"
      ],
      "choices": []
    }
  ]

document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "main-town.html";
})

import ConversationHandler from "./story-line.js";
import * as Timer from "./timer.js";

Timer.injectClock();

// Start the interval to update the clock
setInterval(Timer.updateClockDisplay, 1000);

// On page load, set the clock immediately
document.addEventListener("DOMContentLoaded", Timer.updateClockDisplay);

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