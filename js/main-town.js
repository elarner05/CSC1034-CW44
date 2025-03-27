import * as Timer from "./timer.js";

Timer.injectClock();

// Start the interval to update the clock
setInterval(Timer.updateClockDisplay, 1000);

// On page load, set the clock immediately
document.addEventListener("DOMContentLoaded", Timer.updateClockDisplay);



document.addEventListener("DOMContentLoaded", function () {
    const accuseButton = document.getElementById("accuseButton");
    const accuseContainer = document.getElementById("accuseContainer");
    const accuseModal = document.getElementById("accuseModal");
    const closeModal = document.querySelector(".close");
    const suspectList = document.getElementById("suspectList");
    const confirmButton = document.getElementById("confirmAccuse");

    let selectedSuspect = null;

    // Sample suspects (Replace with actual ones)
    const suspects = [
        { name: "Deputy Cain Chambers", img: "deputy.png" },
        { name: "Arms Dealer", img: "arms-dealer.png" },
        { name: "Rev. Willie McCrea", img: "preacher.png" },
        { name: "The Drifter", img: "drifter.png" },
        { name: "Bernice Becker", img: "ranch-owner.png" },
        { name: "Denice Doherty", img: "saloon-owner.png" }
    ];

    // Populate suspects in modal
    suspects.forEach(suspect => {
        const suspectDiv = document.createElement("div");
        suspectDiv.classList.add("suspect");
        suspectDiv.innerHTML = `
            <img src="${suspect.img}" alt="${suspect.img}">
            <p>${suspect.name}</p>
        `;
        suspectDiv.addEventListener("click", function () {
            document.querySelectorAll(".suspect").forEach(el => el.classList.remove("selected"));
            suspectDiv.classList.add("selected");
            selectedSuspect = suspect.name;
            confirmButton.disabled = false;
        });
        suspectList.appendChild(suspectDiv);
    });

    // Open modal
    accuseButton.addEventListener("click", () => {
        accuseModal.style.display = "flex";
        accuseContainer.classList.remove("hidden");
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        accuseModal.style.display = "none";
        accuseContainer.classList.add("hidden");

    });

    // Confirm accusation
    confirmButton.addEventListener("click", () => {
        if (selectedSuspect) {
            alert(`You accused ${selectedSuspect}!`);
            accuseModal.style.display = "none";
            // Here, send the accusation to your PHP/SQL backend for processing
        }
    });
});
