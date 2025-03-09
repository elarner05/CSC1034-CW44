const testText = [
    "The wind howls through the empty streets of Deadwood...",
    "A single oil lamp flickers outside the saloon, casting long shadows.",
    "Somewhere in the darkness, a gunshot rings out...",
    "The sheriff is dead.",
    "And you're the only one left to find the killer."
];

const textElement = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");


const dialogue = new DialogueUpdater(testText, textElement, nextButton);

dialogue.start();

dialogue.getPromise().then(() => {
    nextButton.innerHTML = "Continue";
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", () => {
        if (nextButton.innerHTML === "Continue") {    // Move to the next page when clicking "Continue"
            window.location.href = "test.html"; // Change to your next game page
        }
    });
});
