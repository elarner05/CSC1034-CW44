import * as Timer from "./timer.js";

Timer.injectClock();

// Start the interval to update the clock
setInterval(Timer.updateClockDisplay, 1000);

// On page load, set the clock immediately
document.addEventListener("DOMContentLoaded", Timer.updateClockDisplay);

import * as SideBar from "./side-bar.js";

SideBar.setupSideBar();


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
        { name: "Rev. Willie McCrea", img: "assets/preacher-portrait.png" },
        { name: "The Drifter", img: "assets/drifter-portrait.png" },
        { name: "Bernice Becker", img: "assets/rancher-portrait.png" },
        { name: "Denice Doherty", img: "assets/saloon-owner-portrait.png" }
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


const roomsDiv = document.getElementById("roomInformation");


import * as SaveData from "./saveData.js";

let savedRoomData = SaveData.getRoomData();

savedRoomData.forEach(room => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = room.name;
    if (room.visited) {
        newDiv.style = "color: rgba(245, 227, 195, 1);"
        newDiv.innerHTML += "✅";
    } else {
        newDiv.style = "color: rgba(245, 227, 195, 0.2);"
        newDiv.innerHTML += "❌";
    }
    roomsDiv.appendChild(newDiv);
})