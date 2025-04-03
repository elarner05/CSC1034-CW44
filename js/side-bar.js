import * as SaveData from "./saveData.js";


export function injectSidebar() {
    document.body.innerHTML+= `
    <div id="sideBar">
        <button class="side-bar" id="inventory"></button>
        <button class="side-bar" id="notes"></button>
        <button class="side-bar" id="saveQuit"></button>
    </div>


    <div class="inventory-container hidden" id="inventoryContainer">
        <div class="inventory-box">
            <h2>Inventory</h2>
            
            <div id="inventorySpace">

            </div>

            <button id="closeInventoryButton">Close</button>
        </div>
        <div class="inventory-item-description hidden" id="itemDescriptionContainer">
            <h3>Item Description</h3>
            <div class="inventory-item-data-container">
                <img id="descriptionImage" src="assets/blank-image.png">
                <div id="descriptionText">
                    <h2 id="descriptionItemName"></h2>
                    <p id="descriptionItemDescription"></p>
                </div>
            </div>

            <button id="closeDescriptionButton">Close Description</button>
        </div>
    </div>


    <div class="notes-container hidden" id="notesContainer">
        <div class="notes-box">
            <h2>Investigation Notes</h2>
            <div class="notes-tabs" id="notesTabs">
                <button class="notes-tab active-tab" data-suspect="Deputy">Deputy</button>
                <button class="notes-tab" data-suspect="Arms Dealer">Arms Dealer</button>
                <button class="notes-tab" data-suspect="Preacher">Preacher</button>
                <button class="notes-tab" data-suspect="Drifter">Drifter</button>
                <button class="notes-tab" data-suspect="Rancher">Rancher</button>
                <button class="notes-tab" data-suspect="Saloon Owner">Saloon Owner</button>
            </div>
            <textarea id="notesArea" maxlength="1000" placeholder="Write your clues, suspicions, and theories here..."></textarea>

            <button id="closeNotesButton">Save & Close</button>
        </div>
    </div>`;
}


const itemData =[
    {
        id: 1,
        name: "The One",
        description: "An ancient artifact of oneness.",
        image: "assets/test-item.png",
    },
    {
        id: 2,
        name: "Bloody Knife",
        description: "A knife with blood on it.",
        image: "assets/bloodied-knife.png",
    },
    {
        id: 3,
        name: "Muddy Cloth",
        description: "A muddy cloth found at the ranch. It has marks on it",
        image: "assets/muddy-rag.png",
    },
    {
        id: 4,
        name: "Letter to Drifter",
        description: "A letter founded in the drifter's bag, addressed 'Dear friend,'. It requests his presence, simply signed \"S\".",
        image: "assets/drifters-note.png",
    
    },
    {
        id: 5,
        name: "Yellow Boy Specifications",
        description: "Fires a .44 caliber round, 24 inches long, with lever action and a tubular magazine",
        image: "assets/yellow-boy-gun-specs.png"
    },
    {
        id: 6,
        name: "Colt Single Action Revolver Specifications",
        description: "Fires a colt .45, 11 inches long, unparalleled durability, with hammer loading",
        image: "assets/colt-revolver-gun-specs.png"
    },
    {
        id: 7,
        name: "Torn Poster",
        description: "A old torn poster found blown behind a gravestone. It states: \"WANTED: Bandit McCrea\". It must be over 20 years old",
        image: "assets/torn-poster.png",
    },
    {
        id : 8,
        name: "Customer Logbook",
        description: "A logbook that contains records of all the customers that visited the saloon.",
        image: "assets/ledger.png",
    }, 
    {
        id: 9,
        name: "Deputy's Notes",
        description: "A note taken from the deputy's desk. Rants of hatred directed towards the Sherif.",
        image: "assets/deputy-notes.png"
    },
    {
        id: 10,
        name: "Glass Shard",
        description: "Found at the arms dealer's, likely from an arguement about money",
        image: "assets/glass-shard.png"
    },
]
// Notes elements
let notesContainer = document.getElementById('notesContainer');
let notesArea = document.getElementById('notesArea');
let notesTabs = document.querySelectorAll('.notes-tab');
let closeNotesButton = document.getElementById("closeNotesButton");

// Inventory elements
let inventoryContainer = document.getElementById('inventoryContainer');
let inventorySpace = document.getElementById('inventorySpace');
let closeInventoryButton = document.getElementById("closeInventoryButton");
let closeDescriptionButton = document.getElementById("closeDescriptionButton");
let itemDescriptionContainer = document.getElementById("itemDescriptionContainer");


let inventoryData = SaveData.getLocalInventory();
let inventorySlots = [];
let currentNotesSuspect = 'Deputy';

export function loadSidebarElements() {
    // Notes elements
    notesContainer = document.getElementById('notesContainer');
    notesArea = document.getElementById('notesArea');
    notesTabs = document.querySelectorAll('.notes-tab');

    // Inventory elements
    inventoryContainer = document.getElementById('inventoryContainer');
    inventorySpace = document.getElementById('inventorySpace');
    closeInventoryButton = document.getElementById("closeInventoryButton");
    closeNotesButton = document.getElementById("closeNotesButton");
    closeDescriptionButton = document.getElementById("closeDescriptionButton");
    itemDescriptionContainer = document.getElementById("itemDescriptionContainer");
}

export function setupSideBar() {
    injectSidebar();
    loadSidebarElements();

    // Side bar buttons
    document.getElementById("inventory").addEventListener("click", () => {
        inventoryContainer.classList.remove("hidden");
    })

    document.getElementById("notes").addEventListener('click', () => {
        notesContainer.classList.remove('hidden');
        loadNotes(currentNotesSuspect);
    });

    document.getElementById("saveQuit").addEventListener('click', () => {
        SaveData.setPauseTime().then(window.location.href = "index.html")
    });

    // Load initial notes on page load


    closeNotesButton.addEventListener('click', () => {
        SaveData.saveNotes(currentNotesSuspect, notesArea.value); // Save notes
        notesContainer.classList.add('hidden');
    });

    notesTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Save current notes before switching
            SaveData.saveNotes(currentNotesSuspect, notesArea.value);

            // Switch active tab
            notesTabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');

            // Change suspect and load new notes
            currentNotesSuspect = tab.getAttribute('data-suspect');
            loadNotes(currentNotesSuspect);
        });
    });
    // Inventory script

    closeInventoryButton.addEventListener('click', () => {
        
        inventoryContainer.classList.add('hidden');
    });

    closeDescriptionButton.addEventListener('click', () => {
        
        itemDescriptionContainer.classList.add('hidden');
    });


    // Dynamically creates inventory slots so that i don't have to copy and paste 30 times
    // Increase the number to add more slots
    const numberOfInventorySlots = 30;
    for (let i=0;i<numberOfInventorySlots;i++) {
        let inventorySlot = document.createElement('div');
        inventorySlot.classList.add("inventory-slot");
        inventorySlot.setAttribute("id", `slot-${i+1}`);
        inventorySpace.appendChild(inventorySlot);
    }

    // Store all the inventory slots in a handy reusable array
    inventorySlots = document.querySelectorAll('.inventory-slot');


    // Test data, overwritten by saved inventory
    

    inventoryData = SaveData.getLocalInventory();

    // Use event delegation to handle all dragstart events
    document.addEventListener("dragstart", (e) => {
        const draggedItem = e.target.closest('.inventory-item');
        if (draggedItem) {
            e.dataTransfer.setData('text/plain', draggedItem.id);
        }
    });

    // Update and reveal description when an item is clicked
    document.addEventListener("click", (e) => {
        inventoryData = SaveData.getLocalInventory();
        const clickedItem = e.target.closest('.inventory-item');
        if (clickedItem) {
            
            const itemInformation = inventoryData.find(data => {return data.id === clickedItem.id});
            const thisItemData = itemData.find( item => {return item.id === itemInformation.itemID});
            if (itemData) {
                document.getElementById("descriptionItemName").innerHTML = thisItemData.name;
                document.getElementById("descriptionItemDescription").innerHTML = thisItemData.description;
                document.getElementById("descriptionImage").src = thisItemData.image;

            }
            
            document.getElementById("itemDescriptionContainer").classList.remove("hidden");
        }
    });

    // Implements the drag and drop functionality for the inventory slots
    inventorySlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => e.preventDefault());
    
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            const draggedItem = document.getElementById(itemId);
            if (!draggedItem) return;

            const currentSlot = draggedItem.parentElement;

            // Optional: Swap logic
            if (!slot.querySelector('.inventory-item')) {
                slot.appendChild(draggedItem);
            } else {
                const existingItem = slot.querySelector('.inventory-item');
                currentSlot.appendChild(existingItem);
                slot.appendChild(draggedItem);
                updateItemSlot(existingItem.id, currentSlot.id);
            
            }

            updateItemSlot(itemId, slot.id);
            SaveData.saveInventory(inventoryData);
            loadInventory();
        });
    });
}

export function loadNotes(suspectKey) {
    loadSidebarElements();
    if (notesArea) {
        const saved = sessionStorage.getItem(`notes_${suspectKey}`);
        notesArea.value = saved || '';
    }
}






// loads the data from 'inventoryData' into the inventory
export function loadInventory() {
    loadSidebarElements();
    let inventoryData = SaveData.getLocalInventory();
    if (inventoryData) {
        inventoryData.forEach(invItem => {
            const itemInfo = itemData.find(item => item.id === invItem.itemID);
            if (!itemInfo) return;
            const slot = document.getElementById(invItem.slot);
            if (!slot) return;
            if (slot.querySelectorAll(".inventory-item").length >0) return;
        
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("inventory-item");
            itemDiv.setAttribute("draggable", "true");
            itemDiv.id = invItem.id;
            itemDiv.dataset.itemId = itemInfo.id;
            itemDiv.dataset.name = itemInfo.name;
            itemDiv.dataset.description = itemInfo.description;
        
            const img = document.createElement("img");
            img.src = itemInfo.image;
            img.alt = itemInfo.name;
        
            itemDiv.appendChild(img);
        
            if (slot) slot.appendChild(itemDiv);
        });
    }
}

export function updateItemSlot(itemId, newSlotId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (item) {
        item.slot = newSlotId;
        SaveData.saveInventory(); // Save updated state
        loadInventory();
        SaveData.moveItem(item.itemID, newSlotId);
    }
}

// removes the inventory from the 
export function resetInventory() {
    sessionStorage.removeItem("inventoryData");
    location.reload();
}


export function createNotification(itemID) {
    const itemInfo = itemData.find(item => item.id === itemID);
    if (itemInfo) {
        let notification = document.createElement("div");
        notification.classList.add("notification");
        
        let img = document.createElement("img");
        img.src = itemInfo.image;
        notification.appendChild(img);

        notification.innerHTML += `<span>Added to inventory: ${itemInfo.name}</span>`;
        
        
        document.body.appendChild(notification);
        notification.style.visibility = "visible";

        setTimeout(() => {
            notification.classList.add("show");
        }, 10);


        setTimeout(() => {
            notification.classList.remove("show");  // Slide out after 3 seconds

        }, 7000);
        setTimeout(() => {
            document.body.removeChild(notification);

        }, 10000);
    }
}

// loads the saved notes and inventory when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadNotes(currentNotesSuspect);
    loadInventory();
});
