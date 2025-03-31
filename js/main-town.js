import * as Timer from "./timer.js";
import * as SideBar from "./side-bar.js";

Timer.setupTimer();

SideBar.setupSideBar();


document.addEventListener("DOMContentLoaded", function () {
    const accuseButton = document.getElementById("accuseButton");
    const accuseContainer = document.getElementById("accuseContainer");
    const accuseModal = document.getElementById("accuseModal");
    const closeModal = document.querySelector(".close");
    const suspectList = document.getElementById("suspectList");
    const confirmButton = document.getElementById("confirmAccuse");

    let selectedSuspect = null;
    let selectedLocation = null;

    // Sample suspects (Replace with actual ones)
    const suspects = [
        { name: "Deputy Cain Chambers", img: "assets/deputy-portrait.png", loc: "ending-screens/deputy-ending.html" },
        { name: "Arms Dealer", img: "assets/arms-dealer-portrait.png", loc: "ending-screens/gun-store-ending.html" },
        { name: "Rev. Willie McCrea", img: "assets/preacher-portrait.png", loc: "ending-screens/reverend-ending.html" },
        { name: "The Drifter", img: "assets/drifter-portrait.png", loc: "ending-screens/drifter-ending.html" },
        { name: "Bernice Becker", img: "assets/rancher-portrait.png", loc: "ending-screens/rancher-ending.html" },
        { name: "Denice Doherty", img: "assets/saloon-owner-portrait.png", loc: "ending-screens/saloon-ending.html" }
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
            selectedLocation = suspect.loc;
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

        if (selectedSuspect === "Rory Keogh") {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        }
        else if (selectedSuspect) {
            window.location.href = selectedLocation;
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

setInterval(() => {
    if (Timer.getPercentageLeft()<(4/16) || Timer.getPercentageLeft()>(12/16)) {
        document.getElementById("backgroundImage").src = "assets/main-town-dawn.png";
    } else {
        document.getElementById("backgroundImage").src = "assets/main-town.png";
    }
}, 1000)

if (Timer.getPercentageLeft()<(4/16) || Timer.getPercentageLeft()>(12/16)) {
    document.getElementById("backgroundImage").src = "assets/main-town-dawn.png";
} else {
    document.getElementById("backgroundImage").src = "assets/main-town.png";
}