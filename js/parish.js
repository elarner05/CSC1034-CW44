import ConversationHandler from "./story-line.js"; 

const preacherDialogue = [
    {
      "id": 1,
      "text": [
        "\"Howdy, and blessings upon you\"",
        "\"What brings thee here?\""
        ],
      "choices": [
        {
          "text": "What did you think of the sheriff?",
          "nextID": 2
        }, {
          "text": "How has the town been recently, Reverend?",
          "nextID": 3
        }, {
          "text": "How come you're gravediggin' already?",
          "nextID": 4
        }, {
          "text": "Seen anythin' suspicious lately?",
          "nextID": 5
        }
        ]
    }, {
      "id": 2,
      "text": [
        "\"He was a wicked one, that sheriff.\"",
        "\"We disagreed on many things... the bar, the brothel, the gambling. I told him those sins would bring ruin.\"",
        "\"I warn'd him. The righteous path was offered, and he refused it.\""
        ],
        "choices": [
          {
            "text": "Oh? so you think he had it coming?",
            "nextID": 6
          }, {
            "text": "Was he really that bad?",
            "nextID": 7
          }
          ]
    }, {
      "id": 3,
      "text": [
        "\"This town's been dancin' with the Devil far too long. The sheriff's death is but a symtom, not the sickness.\"",
        "\"Gambling, drinkin’, whorin’ in broad daylight — folks call it livin’, but I see rot beneath the surface.\"",
        "\"Mark my words, friend... this is just the beginning. Judgment don’t always come with fire and thunder — sometimes it creeps in quiet, like a viper in the grass.\"",
        "The Good Book says the wicked shall be cut down. Who’s next? Only the Lord knows… but I reckon He’s not done yet."],
      "choices": []
    }
  ]



const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");
const containerElement = document.getElementById("choicesContainer");

const conversation = new ConversationHandler(preacherDialogue, textElement, nextButton, containerElement, 20);

conversation.start();

conversation.getPromise().then(() => {
  nextButton.innerHTML = "Close";
  nextButton.classList.remove("hidden");
  nextButton.addEventListener("click", () => {
    document.getElementById("textBox").classList.add("hidden");
  })
})