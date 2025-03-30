
//This should point to YOUR copy of the dbCnnector.php file. 
export const dbConnectorUrl = "https://elarner01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

//Update this with YOUR database credentials. 
export let dbConfig = new URLSearchParams({
    hostname: 'localhost',
    username: 'elarner01',
    password: '9X2WPPjMjQr4d34C',
    database: 'CSC1034_CW_44',
});

//Useful debug function to print the values of all Session Storage items
export function printSessionStorage() {
    console.log("Session Storage Items:");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

// Check to see if a user is logged in, if not, direct to login page. 
export function checkLogin() {
    if (!sessionStorage.getItem('userId')) {
        window.location.href = 'login.html';
        return;
    }
}

export async function sendSQL(sqlQuery) {
    dbConfig.set('query', sqlQuery);
    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();
        return result;

    } catch (error) {
        console.error("Error sending sql code:", error);
        console.log("Problem query: ", sqlQuery);
        return null;
    }
}

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
            "name": "Gun Store",
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
        savedInventory = null;
    }
    if (!savedInventory) {
        savedInventory = [
            // {
            //   id: "item1",
            //   itemID: 1,
            //   slot: "slot-2"
            // },
            // {
            //   id: "item2",
            //   itemID: 2,
            //   slot: "slot-4"
            // }
          ];
        sessionStorage.setItem("inventoryData", JSON.stringify(savedInventory));
    }
    return savedInventory;
}

export function addItemToInventory(itemID, targetSlotID) {
    let inventoryData = getInventory();
    let inventorySlots = document.querySelectorAll('.inventory-slot');
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

export function itemInInventory(itemID) {
    let inventoryData = getInventory();

    for (let i = 0;i<inventoryData.length;i++) {
        if (inventoryData[i].itemID === itemID) {
            return true;
        }
    }

    return false;
}

// Saves inventory json array
export function saveInventory(inventoryArray) {
    sessionStorage.setItem("inventoryData", JSON.stringify(inventoryArray));
}

export function clearSaveData() {
    sessionStorage.removeItem("roomData");
    sessionStorage.removeItem("inventoryData");
}