const dialogue = [
    {
        "id" : 1,
        "text" : [
            "You enter the saloon and find it very busy. The town's peopleare enjoying their midday drinks and socializing. Out of the corner of the ur eye u spot the woman tending to a customer. You immediately notice, shes wearing clothes with a similar pattern to the shreds you found on the crime scene.",

        ],
        "choices" : [
            {
            "text": "Approach the saloon owner.",
             "nextID" : 2,
            },
            {
                "text": "Explore the saloon and socilaise with the town's poeple.",
                "nextID" : 3,
            }
        ] 
    },
    {
        "id" : 2,
        "text" : [
            "The saloon owner notices your presence and shifts her attention towards u. She nods her head at you as if finally acknowledging who u are.She speaks up.You must be the new detective in town. Heard they sent you to investigate the reason behind first sigh of relief this town has had in years.She finishes with a dry chuckle.",
        ], 
        "choices" : [
            {
            "text": "Ah that's right. I did hear that you and him didn't get along well. It must be true then. Now I'm curious.",
            "nextID" : 4,
            },
            {
                "text" : "Seems like you were expecting me?",
                "nextID" : 5,
            },
            {
                "text" : "Why do you say the sheriff's death was a sigh of relief for this town?",
                "nextID" : 6,
            },
            {
                "text" : "That's right. I was wondering if you could help me with the investigation.",
                "nextID" : 7,
            }


        ]
    },
    {
        "id" : 3,
        "text" : [
            "You approach an old man sat at a table in the corner all alone.You take a seat next to him and greet him. He buys you a drink.",
        ],
        "choices" : [
            {
             "text" : "You seem to be a regular. Are you close to the owner?",
             "nextID" : 8,
            },
            {
                "text" : "Were you here the night of the sheriff's murder.",
                "nextID" : 9,
            },
            {
                "text" : "Did you ever notice anything odd about the owner.",
                "nextID" : 10,
            },
            {
                "text" : "Had you ever seen the sheriff here? Was he also a regular like you?",
                "nextID" : 11,
            }
        ]
    },
    {
        "id" : 4, 
        "text" : [
            "And who told you that. It doesnt matter if i got along well with him or not, because nobody did. He was'nt the most likeable man you see, thats it really.",
            ],
            "choices" : []
    },
    {
        "id" : 5,
        "text" : [
            "Now why would that be, Its just I heard news of a new detective in town and I didnt recognize you so I figured it'd be u since I remember my customers.",
        ], 
        "choices" : []
    },
    {
        "id" : 6,
        "text" : [
            "Oh, nobody told u?",
            "He was a corrupt man only looking out for himself. He had ties with some drifter gangs and often got the town's people into trouble with them instead of protecting us from them",
            "He's dead now but he still has open tabs here. Tsk I've suffered a loss but it's not like he'd pay me back even if he were alive."
        ],
        "choices" : []
    },
    {
        "id" : 7,
        "text" : [
            "I cant, I'm too busy making a living.",
            "But even if i did have time I wouldn't do anything that would help that parasite of a man.",

        ],
        "choices" : []
    },
    {
        "id" : 8,
        "text" : [
            "Oh yeah! She's a really pleasant woman. Sometimes gives me a discount too.",
            "It's such a pity people try to exploit her for running this place all on her own but she just keeps minding her business.",

        ],
        "choices" : []
    },
    {
        "id" : 9,
        "text" : [
            "Hasn't it been a week already. My memories not quite sharp, thanks to my old age and love for alchohol.",

        ],
        "choices" : []
    },
    {
        "id" : 10,
        "text" : [
            "Nothing odd, except the fact she refuses to marry again and share her earnings.",
            "The old man wheezes out.",
        ],
        "choices" : []
    },
    {
        "id" : 11,
        "text" : [
            "Of course I have.",
            "What did that man ever do except drinking and wasting away the town people's money.",
            "The old man grumbles and spits as if the taste of his mouth was ruined by the mention of the sheriff.",
        ],
        "choices" : []
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
    document.body.classList.add("drifter");
  })
})