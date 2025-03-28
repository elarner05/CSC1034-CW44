export function getRoomData() {
    let savedRoomData = sessionStorage.getItem("roomData");
    try{
        savedRoomData = JSON.parse(savedRoomData);
    } catch {
        savedRoomData = null;
    }
    if (!savedRoomData) {
        savedRoomData = [{
            "name": "Crossroads",
            "visited": false
        }, {
            "name": "Jail",
            "visited": false
        }, {
            "name": "Parish",
            "visited": false
        }, {
            "name": "Saloon",
            "visited": false
        }, {
            "name": "Ranch",
            "visited": false
        }, {
            "name": "Gun Shop",
            "visited": false
        }
        ]
        sessionStorage.setItem("roomData", JSON.stringify(savedRoomData));
    }
        
    return savedRoomData;
}

export function visitRoom(roomName) {
    let savedRoomData = getRoomData();
    
    savedRoomData.forEach(room => {
        if (room.name === roomName) {room.visited = true;}
    });
    sessionStorage.setItem("roomData", JSON.stringify(savedRoomData));
}

export function getInventory() {
    let savedInventory = sessionStorage.getItem("inventoryData");
    try {
        savedInventory = JSON.parse(savedInventory);
    } catch {
        savedInventory = [
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
        sessionStorage.setItem("inventoryData", JSON.stringify(savedInventory));
    }
    return savedInventory;
}

export function addItemToInventory(itemID, targetSlotID) {
    let inventoryData = getInventory();
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
}

// Saves inventory json array
export function saveInventory(inventoryArray) {
    sessionStorage.setItem("inventoryData", JSON.stringify(inventoryArray));
}

export function clearSaveData() {
    sessionStorage.removeItem("roomData");
}