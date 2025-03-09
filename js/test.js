const dialogue = [
    {
      "id": 1,
      "text": [
        "You approach the rancher who is busy working with the cattle.",
        "He looks up and greets you."
      ],
      "choices": [
        {
          "text": "Hey there! How's the cattle today?",
          "nextID": 2
        },
        {
          "text": "Looks like you're working hard!",
          "nextID": 3
        },
        {
          "text": "Can I ask you a few questions?",
          "nextID": 4
        },
        {
          "text": "What do you think of the weather lately?",
          "nextID": 5
        }
      ]
    },
    {
      "id": 2,
      "text": [
        "The rancher gives a chuckle.",
        "The cattle are doing fine, just had to move them to the east pasture."
      ],
      "choices": [
        {
          "text": "Good to hear! Do they like the new pasture?",
          "nextID": 6
        },
        {
          "text": "East pasture? Is it bigger?",
          "nextID": 7
        },
        {
          "text": "Do you ever have trouble with them?",
          "nextID": 8
        },
        {
          "text": "What breed of cattle do you have?",
          "nextID": 9
        }
      ]
    },
    {
      "id": 3,
      "text": [
        "The rancher wipes his brow, nodding.",
        "Yeah, it's been a long day, but it’s part of the job."
      ],
      "choices": [
        {
          "text": "I understand. Must be exhausting work.",
          "nextID": 6
        },
        {
          "text": "You ever get a break from this?",
          "nextID": 10
        },
        {
          "text": "Do you ever get help, or is it just you?",
          "nextID": 11
        },
        {
          "text": "How many hours a day do you work?",
          "nextID": 12
        }
      ]
    },
    {
      "id": 4,
      "text": [
        "The rancher looks intrigued.",
        "Sure, what do you want to know?"
      ],
      "choices": [
        {
          "text": "How do you handle cattle during a storm?",
          "nextID": 13
        },
        {
          "text": "What made you become a rancher?",
          "nextID": 14
        },
        {
          "text": "How do you manage the land out here?",
          "nextID": 15
        },
        {
          "text": "Do you have any other animals on the ranch?",
          "nextID": 16
        }
      ]
    },
    {
      "id": 5,
      "text": [
        "The rancher smiles and stretches.",
        "Weather’s been a bit unpredictable, but it keeps things interesting."
      ],
      "choices": [
        {
          "text": "Yeah, it’s been unpredictable around here.",
          "nextID": 17
        },
        {
          "text": "I agree! The storms seem to come out of nowhere.",
          "nextID": 18
        },
        {
          "text": "Do you think it will rain soon?",
          "nextID": 19
        },
        {
          "text": "How do you prepare for the bad weather?",
          "nextID": 20
        }
      ]
    },
    {
      "id": 6,
      "text": [
        "The rancher shrugs, looking over at the cattle.",
        "They don't mind it too much. As long as there's enough grass, they're happy."
      ],
      "choices": []
    },
    {
      "id": 7,
      "text": [
        "The rancher nods, adjusting his hat.",
        "The east pasture is actually a lot larger. It gives them more room to graze."
      ],
      "choices": []
    },
    {
      "id": 8,
      "text": [
        "The rancher laughs.",
        "Oh, yeah, there’s always a challenge here and there. But nothing too serious."
      ],
      "choices": []
    },
    {
      "id": 9,
      "text": [
        "The rancher grins.",
        "We have Herefords. Great temperament and hardy in the field."
      ],
      "choices": []
    },
    {
      "id": 10,
      "text": [
        "The rancher leans against a fence.",
        "I get a break when I can, but it’s not often. Gotta keep the ranch running."
      ],
      "choices": []
    },
    {
      "id": 11,
      "text": [
        "The rancher looks over at you.",
        "I mostly do it all myself, but I have some help when the big jobs come up."
      ],
      "choices": []
    },
    {
      "id": 12,
      "text": [
        "The rancher grins and wipes his hands on his jeans.",
        "Long hours, usually about 12 a day. But it’s worth it."
      ],
      "choices": []
    },
    {
      "id": 13,
      "text": [
        "The rancher scratches his chin.",
        "During a storm, I keep the cattle inside the barn if it gets too rough. Gotta protect them."
      ],
      "choices": []
    },
    {
      "id": 14,
      "text": [
        "The rancher smiles wistfully.",
        "I’ve always loved animals, and the open range just called to me."
      ],
      "choices": []
    },
    {
      "id": 15,
      "text": [
        "The rancher looks out across the land.",
        "I rotate grazing to keep the land healthy. You have to manage it carefully."
      ],
      "choices": []
    },
    {
      "id": 16,
      "text": [
        "The rancher chuckles.",
        "Yeah, I have a few chickens and a dog, but the cattle are my main focus."
      ],
      "choices": []
    },
    {
      "id": 17,
      "text": [
        "The rancher nods.",
        "Yeah, it’s been a weird season. A lot of random storms popping up."
      ],
      "choices": []
    },
    {
      "id": 18,
      "text": [
        "The rancher laughs.",
        "Tell me about it. The weather’s been crazy lately."
      ],
      "choices": []
    },
    {
      "id": 19,
      "text": [
        "The rancher shrugs.",
        "Could be, hard to tell. It’s been hard to predict this year."
      ],
      "choices": []
    },
    {
      "id": 20,
      "text": [
        "The rancher thinks for a moment.",
        "I just make sure the animals are inside and everything’s secured."
      ],
      "choices": []
    }
  ]

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