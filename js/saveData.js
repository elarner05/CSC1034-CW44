
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


export async function createNewSession() {
    if (!localStorage.getItem("CurrentUserData")) {
        return false;
    }
    let userData = JSON.parse(localStorage.getItem("CurrentUserData"));

    // Insert a new session
    let createQuery = `INSERT INTO sessionData (userID, timeStart, timePause, runningBoolean, winBoolean) 
                        VALUES (${userData.userID}, 0, 0, 1, 0);`;
    
    let result = await sendSQL(createQuery);
    if (!result || result.error) {
        console.log("SQL Insert Error:", result.error);
        return false;
    }

    // Get the last inserted session ID
    let sessionIDQuery = `SELECT sessionID FROM sessionData 
                      WHERE userID = ${userData.userID} 
                      ORDER BY sessionID DESC 
                      LIMIT 1;`;

    let sessionResult = await sendSQL(sessionIDQuery);
    let sessionID = sessionResult.data.length > 0 ? sessionResult.data[0].sessionID : null;
    if (!sessionID) {
        console.log("no sessionID")
        return false;
    }
    console.log("New Session ID:", sessionID);

    // Update userData with the correct session ID
    let updateQuery = `UPDATE userData 
                        SET currentSessionID = ${sessionID} 
                        WHERE userID = ${userData.userID};`;

    let result2 = await sendSQL(updateQuery);
    if (!result2 || result2.error) {
        console.log("SQL Update Error:", result2.error);
        return false;
    }
    // Insert into sessionNotes (Initialize with empty strings)
    let sessionNotesQuery = `INSERT INTO sessionNotes (sessionID, deputyNotes, armsDealerNotes, preacherNotes, drifterNotes, rancherNotes, saloonOwnerNotes) 
                             VALUES (${sessionID}, '', '', '', '', '', '');`;

    let notesResult = await sendSQL(sessionNotesQuery);
    if (!notesResult || notesResult.error) {
        console.log("SQL Insert Error (sessionNotes):", notesResult.error);
        return false;
    }
    await updateUserData();
    console.log("Session created successfully.");
    return true;
}

export async function updateUserData() {
    if (!localStorage.getItem("CurrentUserData")) {
        console.log("no starting user data")
        return false;
    }
    let oldUserData = localStorage.getItem("CurrentUserData");
    let sqlQuery = `SELECT * FROM userData WHERE usernameField = '${oldUserData.username}' AND passwordField = '${oldUserData.password}';`;

    let result = await sendSQL(sqlQuery);
    console.log("New user data: ", result);

    localStorage.setItem("CurrentUserData", JSON.stringify(result.data[0]));
}
    

export async function getSession() {
    if (!localStorage.getItem("CurrentUserData")) {
        console.log("No user data");
        return false;
    }
    let userData = JSON.parse(localStorage.getItem("CurrentUserData"));
    let createQuery = `SELECT * FROM sessionData WHERE userID = '${userData.userID}' AND sessionID = ${userData.currentSessionID};`;
    let result = await sendSQL(createQuery);
    console.log(result);
    if (!result || result.error) {
        if (result.error) {
            console.log(result.error)
        }
        return false;
        
    }
    if (result.data.length === 0) {
        return false;
    }
    
    return result.data[0];

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