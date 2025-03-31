import * as Timer from "./timer.js";
import * as SideBar from "./side-bar.js";
import * as SaveData from "./saveData.js";
import ConversationHandler from "./story-line.js";


const dialogue = [
    {
        "id":1,
        "text": [
            "You walk into the gun store.",
            "The arms dealer is arguing with a customer.",
            "As they notice you, they quickly become friendly together, and the customer leaves."
        ],
        "choices": [
            {
                "text":"Converse with the gun store owner",
                "nextID": 2
            },
            {   
                "text":"Look for clues",
                "nextID": 100
            },
        ]
    },
    {
        "id":2,
        "text": [
            "Who are you?"
        ],
        "choices": [
            {
                "text": "I'm from out of town looking into the sherif's death",
                "nextID": 3
            },
            {
                "text":"I'm from out of town looking for some supplies",
                "nextID": 19
            },
            {
                "text":"More important, what was that about?",
                "nextID": 29
            },
            
        ]
    },
    {
        "id": 3,
        "text":[
            "I dont see how that involves me.",
            "I'm just a armers dealer trying to make a living."
        ],
        "choices": [
            {
                "text": "I just have some questions, thats all, would you mind answering them",
                "nextID": 4,
            },
            {
                "text": "I think you are letting on less than you know.",
                "nextID": 12,
            }
        ]
    },
    {
        "id": 4,
        "text":[
            "Of course, what upstanding citizan wouldn't help an investication.",
            "What were you wondering about."
        ],
        "choices": [
            {
                "text": "Have you seen any suspicion behaviour before the sherif's death?",
                "nextID": 5,
            },
            {
                "text": "Do you remember if anyone has purchased a colt single action revolver as of recent?",
                "nextID": 9,
            } ,
            {
                "text": "Do you know if anyone had problems with the sherif?",
                "nextID": 11,
            }
        ]
    },
    {  
        "id": 5,
        "text":[
            "I dont recall any suspicious behaviour, but it has be really tense around the sherif recently",
            "He used to be one of my best customers, but recently he hasn't been in the store.",
            "Must've been his new friends from out of town...",
            "Anyways.",
            "Was there anything else?"
        ],
        "choices": [
            {
                "text": "No thats all. Thanks.",
                "nextID": 6,
            },
            {
                "text": "Yeah, has anyone purchased a colt single action revolver as of recent?",
                "nextID": 7, 
            },
            {
                "text": "There was, do you know if anyone had problems with the sherif?",
                "nextID": 8,
            }
        ]
    },
    {
        "id": 6,
        "text":[
            "Well, you know where I'll be if you have more questions."
        ],
        "choices": []
    },
    {
        "id": 7,
        "text":[
            "That is a popular gun, I do sell quite a chunk of them.",
            "I think I sold one to the sherif a while a go, and the rancher",
            "Thats all i've wrote in my log book",
            "Now if you dont mind I need to get back to work, can't spend all day talking."
        ],
        "choices": []
    },
    {
        "id": 8,
        "text":[
            "I would be shocked if there was anyone without problems with the sherif.",
            "Apart from me of course!!",
            "There were some rummors that he was working with some bad people out in the country.",
            "Brought lots of worry for the folk here.",
            "It was only a matter of time before he got himself killed.",
            "Now if you dont mind I need to get back to work, can't spend all day talking."
        ],
        "choices": []
    },
    {
        "id": 9,
        "text":[
            "That is a popular gun, I do sell quite a chunk of them.",
            "I think I sold one to the sherif a while a go, and the rancher",
            "Thats all i've wrote in my log book",
            "Is there anything alse you have, to ask?"
        ],
        "choices":[
            {
                "text": "Nope, dont think so.",
                "nextID": 6
            },
            {
                "text": "Yeah, Have you seen any suspicion behaviour before the sherif's death?",
                "nextID": 10,
            },
            {
               "text": "Yes, do you know if anyone had problems with the sherif?",
                "nextID": 8,
            }
        ]
    },
    {
        "id": 10,
        "text":[
            "I dont recall any suspicious behaviour, but it has be really tense around the sherif recently",
            "He used to be one of my best customers, but recently he hasn't been in the store.",
            "Must've been his new friends from out of town...",
            "Anyways.",
            "I have to get back to work. Dollars don't make themselves."
        ],
        "choices":[]
    },
    {
        "id": 11,
        "text":[
            "I would be shocked if there was anyone without problems with the sherif.",
            "Apart from me of course!!",
            "There were some rummors that he was working with some bad people out in the country.",
            "Brought lots of worry for the folk here.",
            "It was only a matter of time before he got himself killed...",
            "Any other questions?"
        ],
        "choices":[
            {
                "text": "No, I dont think so",
                "nextID": 6,
            },
            {
                "text":"Have you seen any suspicion behaviour before the sherif's death?",
                "nextID": 10,
            },
            {
                "text": "Has anyone purchased a colt single action revolver as of recent?",
                "nextID": 7
            }
        ]
    },
    {
        "id": 12,
        "text":[
            "You should be careful with what you say to strangers",
            "Its a very risky game",
            "*Arms Dealer's hand slowly makes its way near his revolver*"
        ],
        "choices":[
            {
                "text": "I dont mean to offend, was just seeing how you respond",
                "nextID": 13
            },
            {
                "text": "Is that how you talked to the sherif before murdering him",
                "nextID": 16
            }
        ]
    },
    {
        "id": 13,
        "text":[
            "I see, I recommend you dont try that strategy anymore",
            "You might just end up like the sherif."
        ],
        "choices":[
            {
                "text": "Perhaps you're right",
                "nextID": 14
            }
        ]
    },
    {
        "id": 14,
        "text":[
            "Perhaps you would find more information elsewhere, not in my store..."
        ],
        "choices":[
            {
                "text": "Alright, I'll be on my way",
                "nextID": 15
            }
        ]
    },
    {
        "id": 15,
        "text":[
            "Goodbye."
        ],
        "choices":[]
    },
    {
        "id": 16,
        "text":[
            "I think its about time you leave.",
            "We both know how this will end elsewise...",
            "It's your choice"
        ],
        "choices":[
            {
                "text": "*Leave*",
                "nextID": 17
            },
            {
                "text":"I think I dont want to leave",
                "nextID": 18
            }
        ]
    },
    {
        "id": 17,
        "text":[
            "Good decision."
        ],
        "choices":[]
    },
    {
        "id": 18,
        "text":[
            "*Arms Dealer shoots you*"
        ],
        "choices":[]
    },
    {
        "id": 19,
        "text":[
            "Anything in particular, you're looking for?"
        ],
        "choices":[
            {
                "text": "Do you sell any colt single action revolvers",
                "nextID": 20
            },
            {
                "text": "Do you have any yellow boys",
                "nextID": 23
            },
            {
                "text": "No, what would you recommend",
                "nextID": 25
            }
        ]
    },
    {
        "id": 20,
        "text":[
            "Yeah, we sell those, very nice gun",
            "Infact we are almost out of them",
            "would you like the model information"
        ],
        "choices":[
            {
                "text": "Yes please, that would be useful",
                "nextID": 21,
                "itemID": 5
            },
            {
                "text": "No, I have all I need",
                "nextID": 22
            }
        ]
    },
    {
        "id": 21,
        "text":[
            "There you go, I hope you decide to purchase it at some point."
        ],
        "choices":[
            {
                "text": "Thank you, I think I might.",
                "nextID": 15
            }
        ]
    },
    {
        "id": 22,
        "text":[
            "Alright, well if you need anything else, you know where I'll be."
        ],
        "choices":[]
    },
    {
        "id": 23,
        "text":[
            "Yeah I think there is a few of those in stock",
            "One the best looking guns in my experience",
            "would you like the model information for this gun?"
        ],
        "choices":[
            {
                "text": "Yes, that would help.",
                "nextID": 24 ,
                "itemID": 6
            }
        ]
    },
    {
        "id": 24,
        "text":[
            "There, that should be it.",
            "I hope it helps you come to a decision"
        ],
        "choices":[
            {
                "text": "Thank you, I think it will.",
                "nextID": 15
            }
        ]
    },
    {
        "id": 25,
        "text":[
            "Hmmm, if I had to choose a single gun...",
            "It would have to be the colt 45",
            "That gun is the perfect combination of form and function",
            "An example of immaculate engineering."
        ],
        "choices":[
            {
                "text": "Is that the gun you wield",
                "nextID": 26
            },
            {
                "text": "Do you have any specific information about the gun",
                "nextID": 28
            }
        ]
    },
    {
        "id": 26,
        "text":[
            "Yes, it hasn't failed me to this day"
        ],
        "choices":[
            {
                "text": "Thanks, I will consider buying one",
                "nextID":  27
            }
        ]
    },
    {
        "id": 27,
        "text":[
            "I can guarantee you would not regret it."
        ],
        "choices":[]
    },
    {
        "id": 28,
        "text":[
            "Of course, here you go."
        ],
        "choices":[
            {
                "text": "Thank you. This will help me a lot",
                "nextID": 15,
                "itemID": 9 
            }
        ]
    },
    {
        "id": 29,
        "text":[
            ""
        ]
    }
]

Timer.setupTimer();

SideBar.setupSideBar();

SaveData.visitRoom("Gun Store");

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
  