const defaultTypingSpeed = 40;
  

/**
 * --| Dialogue Updater Class |--
 * 
 * Used to dynamically update a given dialogue with the text scrolling into a text box.
 * 
 * Usage:
 *  ~Initialise an instance with an array of text, a html text element, and a html button
 *      let dialogue = new DialogueUpdater(["First Sentance", "Second Sentance", ...], textElement, nextButton);
 *  ~Start the dialogue
 *      dialogue.start();
 *  ~Get the promise and setup the javascript functionality for when the Dialogue finishes
 *      dialogue.getPromise().then(() => {// run some code in here for when the dialogue is complete })
 */
export class DialogueUpdater {
    nextDelay = 250;
    constructor(text, textElement, nextButton, speed = defaultTypingSpeed) {
        this.speed = speed;
        this.sentenceIndex = 0;
        this.charIndex = 0;
        this.text = text;
        this.textElement = textElement;
        this.nextButton = nextButton;

        this.resolve = null;
        this.endingPromise = new Promise((resolve) => {
            this.resolve = resolve;
        });

        this.nextButtonHandler = () => { 
            this.nextButton.classList.add("hidden");
            setTimeout(() => {
                this.sentenceIndex++;
                this.charIndex = 0;
                this.textElement.innerHTML = ""; // Clear text for next sentence

                if (this.sentenceIndex < this.text.length) {
                    this.typeNextLetter(); // Start typing next sentence
                }
            }, this.nextDelay);};

        this.nextButton.addEventListener("click", this.nextButtonHandler);
    }

    start() {
        setTimeout(() => this.typeNextLetter(), this.speed);
    }

    typeNextLetter() {
        if (this.charIndex < this.text[this.sentenceIndex].length) {
            this.textElement.innerHTML += this.text[this.sentenceIndex].charAt(this.charIndex);
            this.charIndex++;
            setTimeout(() => this.typeNextLetter(), this.speed);
        } else if (this.sentenceIndex === this.text.length - 1) {
            this.nextButton.removeEventListener("click", this.nextButtonHandler);
            this.resolve("Finished dialogue updating");
            
        } else {
            this.nextButton.classList.remove("hidden");
        }
    }

    getPromise() {
        return this.endingPromise;
    }
}


/**
 * --| Choice Handler Class |--
 * 
 * Used to create the buttons for a previous dialogue and creates a promise which contains the next convo id of the first button pressed.
 * 
 * Syntax for parameter choices:
 *      choices = [
 *      { "text": "choice-1",
 *        "nextID": 1},
 *      { "text": "choice-2",
 *        "nextID": 2},
 *      { "text": "choice-3",
 *        "nextID": 3},
 *      { "text": "choice-4",
 *        "nextID": 4} ]
 * 
 * Usage:
 *  ~Initialise an instance with an array of choices and the html div container for them
 *      let choice = new ChoiceHandler(choices, container);
 *  ~Create the buttons
 *      choice.displayChoices();
 *  ~Then use the ChoiceHandler.getPromise() method to get a promise which resolves to the next ID
 *      choice.getPromise().then(nextId => {// Insert your code which uses the button id})
 *  
 */
export class ChoiceHandler {
    constructor(choices, containerElement) {
        this.choices = choices; // Array of choices
        this.containerElement = containerElement;
        this.buttons = [];

        this.resolve = null;
        this.choicePromise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    displayChoices() {
        this.containerElement.innerHTML = ""; // Clear previous choices

        this.choices.forEach(choice => {
            const button = document.createElement("button");
            button.id = "choiceButton"
            button.textContent = choice.text;
            button.classList.add("choice-button");
            button.addEventListener("click", () => {
                if (choice.itemID && choice.itemID !== "") {
                    if (addItemToInventory) {
                        addItemToInventory(choice.itemID, "nextAvailable");
                    }
                }
                this.selectChoice(choice.nextID);
        });
            this.containerElement.appendChild(button);
            this.buttons.push(button);
        });
    }

    selectChoice(choiceID) {
        this.resolve(choiceID); // Resolve the promise with the selected choice
        //this.containerElement.innerHTML = ""; // Clear choices after selection
        this.removeChoices();
    }

    removeChoices() {
        this.buttons.forEach(button => {
            button.remove();
        })
    }

    getPromise() {
        return this.choicePromise;
    }
}


/**
 * --| Conversation Handler Class |--
 * 
 * Used to implement the DialogueUpdater and ChoiceHandler classes for a large conversation JSON tree.
 * 
 * Usage
 *  ~Initialise the conversation instance
 *      const conversation = new ConversationHandler(dialogue, textElement, nextButton, containerElement);
 */

export default class ConversationHandler {
    constructor(dialogues, textElement, nextButton, containerElement, typingSpeed = defaultTypingSpeed) {
        this.dialogues = dialogues;
        this.textElement = textElement;
        this.nextButton = nextButton;
        this.containerElement = containerElement;
        this.currentDialogueId = 1; // Start at the first dialogue
        this.typingSpeed = typingSpeed;

        this.dialogueUpdater = null; // To hold the instance of DialogueUpdater
        this.choiceHandler = null; // To hold the instance of ChoiceHandler

        this.nextButtonHandler = () => {
            
            this.nextButton.classList.add("hidden");
            this.nextButton.removeEventListener("click", this.nextButtonHandler);
            this.textElement.innerHTML = "";
            setTimeout(() => {this.showDialogue(this.currentDialogueId)}, 1);
            
        };

        this.resolve = null;
        this.conversationPromise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    start() {
        this.showDialogue(this.currentDialogueId);
    }

    showDialogue(dialogueId) {
        // Get the dialogue from the JSON based on the ID
        const dialogue = this.dialogues.find(d => d.id === dialogueId);
        
        if (dialogue) {
            // If dialogue exists, start the typing animation for the dialogue text
            this.dialogueUpdater = new DialogueUpdater(dialogue.text, this.textElement, this.nextButton, this.typingSpeed);
            this.dialogueUpdater.start();

            // Wait for the promise to resolve and show choices once the dialogue finishes
            this.dialogueUpdater.getPromise().then(() => {
                if (dialogue.choices.length === 1 && dialogue.choices[0].text == "") {
                    this.nextButton.classList.remove("hidden");
                    this.currentDialogueId = dialogue.choices[0].nextID;
                    this.nextButton.addEventListener("click", this.nextButtonHandler);

                } else if (dialogue.choices && dialogue.choices.length > 0) {
                    // If there are choices, show them
                    this.choiceHandler = new ChoiceHandler(dialogue.choices, this.containerElement);
                    this.choiceHandler.displayChoices();

                    // Wait for the choice to be selected
                    this.choiceHandler.getPromise().then((nextDialogueId) => {
                        // Once a choice is made, move to the next dialogue based on the selected choice ID
                        this.currentDialogueId = nextDialogueId;
                        this.textElement.innerHTML = "";
                        setTimeout(() => {this.showDialogue(this.currentDialogueId)}, 1);
                        //this.showDialogue(this.currentDialogueId);
                    });
                } else {
                    this.resolve("Conversation finished")
                }
            });
        }
    }

    getPromise() {
        return this.conversationPromise;
    }
}