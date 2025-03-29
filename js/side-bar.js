

// Notes elements
const notesContainer = document.getElementById('notesContainer');
const notesArea = document.getElementById('notesArea');
const notesTabs = document.querySelectorAll('.notes-tab');

// Inventory elements
const inventoryContainer = document.getElementById('inventoryContainer');
const inventorySpace = document.getElementById('inventorySpace');
const closeInventoryButton = document.getElementById("closeInventoryButton");
const closeDescriptionButton = document.getElementById("closeDescriptionButton");
const itemDescriptionContainer = document.getElementById("itemDescriptionContainer");


// Side bar buttons
document.getElementById("inventory").addEventListener("click", () => {
    inventoryContainer.classList.remove("hidden");
})

document.getElementById("notes").addEventListener('click', () => {
    notesContainer.classList.remove('hidden');
    loadNotes(currentNotesSuspect);
});




// Notes script

let currentNotesSuspect = 'suspect1';

// Load initial notes on page load


closeNotesButton.addEventListener('click', () => {
    sessionStorage.setItem(`notes_${currentNotesSuspect}`, notesArea.value); // Save notes
    notesContainer.classList.add('hidden');
});

notesTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Save current notes before switching
        sessionStorage.setItem(`notes_${currentNotesSuspect}`, notesArea.value);

        // Switch active tab
        notesTabs.forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');

        // Change suspect and load new notes
        currentNotesSuspect = tab.getAttribute('data-suspect');
        loadNotes(currentNotesSuspect);
    });
});

function loadNotes(suspectKey) {
    const saved = sessionStorage.getItem(`notes_${suspectKey}`);
    notesArea.value = saved || '';
}











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
const inventorySlots = document.querySelectorAll('.inventory-slot');


// Test data, overwritten by saved inventory
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
    }
    ]

let inventoryData = [
    {
      id: "item1",
      itemID: 1,
      slot: "slot-2"
    },
    {
      id: "item2",
      itemID: 2,
      slot: "slot-4"
    }
  ];

// Overwrite the test data
const savedInventory = sessionStorage.getItem("inventoryData");
if (savedInventory) {
    inventoryData = JSON.parse(savedInventory);
}



// Use event delegation to handle all dragstart events
document.addEventListener("dragstart", (e) => {
    const draggedItem = e.target.closest('.inventory-item');
    if (draggedItem) {
        e.dataTransfer.setData('text/plain', draggedItem.id);
    }
});

// Update and reveal description when an item is clicked
document.addEventListener("click", (e) => {
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
        saveInventory(inventoryData);
    });
});


// adds a new item to the inventory and saves it to be persistant
function addItemToInventory(itemID, targetSlotID) {
    let newItemId = "item" + (inventoryData.length + 1);


    if (targetSlotID === "nextAvailable") {
        targetSlotID = inventorySlots.length+1;
        for (const slot of inventorySlots) {
            if (document.getElementById(slot.id).children.length === 0) {
                targetSlotID = slot.id;
                break;
            } 
        }
        
    }

    inventoryData.push({
        id: newItemId,
        itemID: itemID,
        slot: targetSlotID
    });

    saveInventory(inventoryData);
    loadInventory(); // You could optimize to only render that one item
}


// removes an item; for testing purposes only
function _removeItemFromInventory(inventoryItemID) {
    inventoryData = inventoryData.filter(inventoryItem => {return inventoryItem.id !== inventoryItemID});
    let counter = 1;
    inventoryData.forEach(inventoryItem => {inventoryItem.id = "item" + counter;counter++;});
    saveInventory(inventoryData);
    loadInventory();
}

// loads the data from 'inventoryData' into the inventory
function loadInventory() {
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

// Saves inventory json array
function saveInventory(inventoryArray) {
    sessionStorage.setItem("inventoryData", JSON.stringify(inventoryArray));
}

function updateItemSlot(itemId, newSlotId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (item) {
        item.slot = newSlotId;
        saveInventory(); // Save updated state
    }
}

// removes the inventory from the 
function resetInventory() {
    sessionStorage.removeItem("inventoryData");
    location.reload();
}








// loads the saved notes and inventory when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadNotes(currentNotesSuspect);
    loadInventory();
});
