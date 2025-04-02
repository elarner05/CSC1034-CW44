
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
export function _printSessionStorage() {
    console.log("Session Storage Items:");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

export async function sendSQL(sqlQuery) {
    console.log("Sending: ", sqlQuery);
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

export function noErrors(finishedResult) {
    if (finishedResult === null) {
        console.log("Null result from server: ", finishedResult);
        return false;
    } else if (finishedResult.error) {
        console.log("Error result from server: ", finishedResult.error);
        return false;
    } else {
        console.log("Valid result from server");
    }
    return true;
}

export function getLocalUserID() {
    try {
        let UserID = JSON.parse(localStorage.getItem("UserID"));
        if (UserID) {
            console.log("Local UserID found.")
            return UserID;
        }
        console.log("No UserID found in local storage")
        return null;
    } catch {
        console.error("No UserID found in local storage")
        return null;
    }
}

export function getLocalUsername() {
    try {
        let Username = localStorage.getItem("Username");
        if (Username) {
            console.log("Local Username found.")
            return Username;
        }
        console.log("No Username found in local storage")
        return null;
    } catch {
        console.log("No Username found in local storage")
        return null;
    }
}

export function getLocalPassword() {
    try {
        let Password = localStorage.getItem("Password");
        if (Password) {
            console.log("Local Password found.")
            return Password;
        }
        console.log("No Password found in local storage")
        return null;
    } catch {
        console.error("No Password found in local storage")
        return null;
    }
}

export function getLocalCurrentSessionID() {
    try {
        let CurrentSessionID = localStorage.getItem("CurrentSessionID");
        if (CurrentSessionID) {
            console.log("Local CurrentSessionID found.")
            return CurrentSessionID;
        }
        console.log("No CurrentSessionID found in local storage")
        return null;
    } catch {
        console.error("No CurrentSessionID found in local storage")
        return null;
    }
}

export function checkSessionID() {
    return localStorage.getItem("CurrentSessionID") !== null;
}

export function checkUserID() {
    return localStorage.getItem("UserID") !== null;
}





export async function createNewSession() {
    let userID = getLocalUserID();
    let currentSessionID = parseInt(getLocalCurrentSessionID());
    if (currentSessionID !== 0) {
        let updateQuery = `UPDATE sessionData SET runningBoolean = 0 WHERE sessionID = ${currentSessionID};`;
    
        let result = await sendSQL(updateQuery);
        noErrors(result);
    }

    // Insert a new session
    let createQuery = `INSERT INTO sessionData (userID, timeStart, timePause, runningBoolean, winBoolean) 
                        VALUES (${userID}, 0, 0, 1, 0);`;
    
    let result = await sendSQL(createQuery);
    if (!noErrors(result)) {
        return false;
    }

    // Get the last inserted session ID
    let sessionIDQuery = `SELECT sessionID FROM sessionData 
                      WHERE userID = ${userID} 
                      ORDER BY sessionID DESC 
                      LIMIT 1;`;

    let sessionResult = await sendSQL(sessionIDQuery);
    let sessionID = sessionResult.data.length > 0 ? sessionResult.data[0].sessionID : null;

    if (!sessionID) {
        console.log("no sessionID")
        return false;
    }

    console.log("New Session ID:", sessionID);
    localStorage.setItem("CurrentSessionID", sessionID);

    // Update userData with the correct session ID
    let updateQuery = `UPDATE userData 
                        SET currentSessionID = ${sessionID} 
                        WHERE userID = ${userID};`;

    let result2 = await sendSQL(updateQuery);
    if (!noErrors(result2)) {
        return false;
    }

    // Insert into sessionNotes (Initialize with empty strings)
    let sessionNotesQuery = `INSERT INTO sessionNotes (sessionID, deputyNotes, armsDealerNotes, preacherNotes, drifterNotes, rancherNotes, saloonOwnerNotes) 
                             VALUES (${sessionID}, '', '', '', '', '', '');`;

    let notesResult = await sendSQL(sessionNotesQuery);
    if (!noErrors(notesResult)) {
        return false;
    }

    // Insert into sessionVisits (Initialize with sessionID)
    let sessionVisitsQuery = `INSERT INTO sessionVisits (sessionID) 
                             VALUES (${sessionID});`;

    let visitsResult = await sendSQL(sessionVisitsQuery);
    if (!noErrors(visitsResult)) {
        return false;
    }

    console.log("Session created successfully.");

    return true;
}





export async function getSession() {
    let currentSessionID = getLocalCurrentSessionID();

    let selectQuery = `SELECT * FROM sessionData WHERE sessionID = ${currentSessionID};`;

    let result = await sendSQL(selectQuery);
    
    if (!noErrors(result)) {
        return null;
    }

    if (result.data.length === 0) {
        return null;
    }
    
    return result.data[0];
}

export async function loadSessionData() {
    let currentSessionID = getLocalCurrentSessionID();
    if (!currentSessionID) return;

    let sessionData = await getSession();
    let newTime = Date.now()-(sessionData.timePause-sessionData.timeStart);
    setStartTime(newTime);
    console.log("New Time: ", newTime);

    sessionStorage.clear();

    if(!sessionData) {
        return false;
    }

    let inventoryDataQuery = `SELECT * FROM sessionItems WHERE sessionID = ${currentSessionID};`
    let result = await sendSQL(inventoryDataQuery);
    if (!noErrors(result)) {
        return false;
    }

    if (result.data.length !== 0) {
        result.data.forEach(item=>{
            console.log(item);
            console.log(item.itemID, item.inventorySlotName);
            addItemToInventoryOnlyLocal(parseInt(item.itemID), item.inventorySlotName);
        })
    }

    let notesDataQuery = `SELECT * FROM sessionNotes WHERE sessionID = ${currentSessionID};`
    result = await sendSQL(notesDataQuery);
    if (!noErrors(result)) {
        return false;
    }


    saveNotes("Deputy", result.data[0].deputyNotes);
    saveNotes("Arms Dealer", result.data[0].armsDealerNotes);
    saveNotes("Preacher", result.data[0].preacherNotes);
    saveNotes("Drifter", result.data[0].drifterNotes);
    saveNotes("Rancher", result.data[0].rancherNotes);
    saveNotes("Saloon Owner", result.data[0].saloonOwnerNotes);
    
    
    let visitRoomQuery = `SELECT * FROM sessionVisits WHERE sessionID = ${currentSessionID}`;

    result = await sendSQL(visitRoomQuery);
    if (!noErrors(result)) {
        return false;
    }

    if (result.data[0].crossroadsVisited === "1") {
        visitRoomOnlyLocal("Crossroads");
    }
    if (result.data[0].saloonVisited === "1") {
        visitRoomOnlyLocal("Saloon");
    }
    if (result.data[0].parishVisited === "1") {
        visitRoomOnlyLocal("Parish");
    }
    if (result.data[0].jailVisited === "1") {
        visitRoomOnlyLocal("Jail");
    }
    if (result.data[0].ranchVisited === "1") {
        visitRoomOnlyLocal("Ranch");
    }
    if (result.data[0].gunStoreVisited === "1") {
        visitRoomOnlyLocal("Gun Store");
    }

    return true;
}

export async function getUserData() {
    let userID = getLocalUserID();

    let selectQuery = `SELECT * FROM userData WHERE userID = ${userID};`;

    let result = await sendSQL(selectQuery);
    
    if (!noErrors(result)) {
        return null;
    }

    if (result.data.length === 0) {
        return null;
    }
    
    return result.data[0];
}




export async function setStartTime(time=0) {
    if (time===0) {
        time = Date.now()
    }
    
    localStorage.removeItem("gameOver")
    localStorage.setItem("gameStartTime", time); // Store real start time
    
    
    let sessionID = getLocalCurrentSessionID();
    let updateQuery = `UPDATE sessionData 
                    SET timeStart =  ${time}
                    WHERE sessionID = ${sessionID};`;

    let result = await sendSQL(updateQuery);
    if (noErrors(result)) {
        console.log("Session start time updated successfully!");
    }
}

export async function getStartTime() {
    let currentSessionID = getLocalCurrentSessionID();

    let getQuery = `SELECT timeStart FROM sessionData 
                    WHERE sessionID = ${currentSessionID};`;

    let result = await sendSQL(getQuery);
    if (noErrors(result)) {
        return result.data[0];
    }
    console.log("timeStart error: ", result);
    return null;
}

export async function setPauseTime() {
    let time = Date.now()
    localStorage.setItem("pausedTime", time); // Store real start time
    
    
    let sessionID = getLocalCurrentSessionID();
    let updateQuery = `UPDATE sessionData 
                    SET timePause =  ${time}
                    WHERE sessionID = ${sessionID};`;

    let result = await sendSQL(updateQuery);
    if (noErrors(result)) {
        console.log("Session pause time updated successfully!");
    }
}

export async function resetPauseTime() {
    localStorage.removeItem("pausedTime");
    let sessionID = getLocalCurrentSessionID();
    let updateQuery = `UPDATE sessionData 
                    SET timePause = 0
                    WHERE sessionID = ${sessionID};`;

    let result = await sendSQL(updateQuery);
    noErrors(result);
}

export async function getPauseTime() {
    let currentSessionID = getLocalCurrentSessionID();

    let getQuery = `SELECT timePause FROM sessionData 
                    WHERE sessionID = ${currentSessionID};`;

    let result = await sendSQL(getQuery);
    if (noErrors(result)) {
        return result.data[0];
    }
    console.log("timePause error: ", result);
    return null;
}

export function setupAutoSaveTime() {
    setInterval(setPauseTime, 10000);
}

export async function endGame(win, accusedName="") {

    await setPauseTime();
    let userID = getLocalUserID();
    let currentSessionID = getLocalCurrentSessionID();
    if (win) {
        win = 1;
    } else {
        win = 0;
    }

    let updateQuery = `UPDATE sessionData SET runningBoolean = 0, winBoolean = ${win}, accusedName = '${accusedName}' WHERE sessionID = ${currentSessionID};`
    let result = await sendSQL(updateQuery);

    noErrors(result)

    updateQuery = `UPDATE userData SET currentSessionID = 0 WHERE userID = ${userID};`;
    
    result = await sendSQL(updateQuery);
    noErrors(result);

    localStorage.removeItem("CurrentSessionID");

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

function visitRoomOnlyLocal(roomName) {
    let savedRoomData = getRoomData();
    
    savedRoomData.forEach(room => {
        if (room.name === roomName) {room.visited = true;}
    });
    sessionStorage.setItem("roomData", JSON.stringify(savedRoomData));
}

export function visitRoom(roomName) {
    let savedRoomData = getRoomData();
    
    savedRoomData.forEach(room => {
        if (room.name === roomName) {room.visited = true;}
    });
    sessionStorage.setItem("roomData", JSON.stringify(savedRoomData));

    // Insert into sessionNotes (Initialize with empty strings)
    let DBRoomName;
    switch (roomName){
    case "Crossroads":
        DBRoomName = "crossroadsVisited";
        break
    case "Jail":
        DBRoomName = "jailVisited";
        break
    case "Parish":
        DBRoomName = "parishVisited";
        break
    case "Saloon":
        DBRoomName = "saloonVisited";
        break
    case "Ranch":
        DBRoomName = "ranchVisited";
        break;
    case "Gun Store":
        DBRoomName = "gunStoreVisited";
        break
    }
    let currentSessionID = getLocalCurrentSessionID();
    let sessionNotesQuery = `UPDATE sessionVisits SET ${DBRoomName} = 1 WHERE sessionID = ${currentSessionID};`;

    sendSQL(sessionNotesQuery).then(notesResult => {
        noErrors(notesResult);
    })
    
}

export function getLocalInventory() {
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

export async function addItemToInventoryOnlyLocal(itemID, targetSlotID) {
    let inventoryData = getLocalInventory();
    let inventorySlots = document.querySelectorAll('.inventory-slot');
    let newItemId = "item" + (inventoryData.length + 1);


    if (targetSlotID === "nextAvailable") {
        targetSlotID = inventorySlots.length+1;
        for (const slot of inventorySlots) {
            if (document.getElementById(slot.id).children.length === 0) {
                targetSlotID = slot.id;
                console.log("Added item to slot.id: ", slot.id);
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

export async function addItemToInventory(itemID, targetSlotID) {
    let inventoryData = getLocalInventory();
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
    
    let sessionID = getLocalCurrentSessionID();

    let insertQuery = `INSERT INTO sessionItems (sessionID, itemID, inventorySlotName) VALUES (${sessionID}, ${itemID}, '${targetSlotID}');`;

    let result = await sendSQL(insertQuery);

    if(noErrors(result)) {
        console.log("Added to database inventory");
    }

}
export async function moveItem(itemID, slotName) {
    let currentSessionID = getLocalCurrentSessionID();

    let updateQuery = `UPDATE sessionItems 
                   SET inventorySlotName = '${slotName}' 
                   WHERE sessionID = ${currentSessionID} 
                   AND itemID = ${itemID};`;
    let result = await sendSQL(updateQuery);
    noErrors(result);
}

export function itemInInventory(itemID) {
    let inventoryData = getLocalInventory();

    for (let i = 0;i<inventoryData.length;i++) {
        if (inventoryData[i].itemID === itemID) {
            return true;
        }
    }
    return false;
}

export function saveNotes(currentNotesSuspect, notes) {
    sessionStorage.setItem(`notes_${currentNotesSuspect}`, notes);

    let DBNotesName;
    console.log(currentNotesSuspect);
    switch (currentNotesSuspect) {
    case "Deputy":
        DBNotesName = "deputyNotes";
        break;
    case "Arms Dealer":
        DBNotesName = "armsDealerNotes";
        break;
    case "Preacher":
        DBNotesName = "preacherNotes";
        break;
    case "Drifter":
        DBNotesName = "drifterNotes";
        break;
    case "Rancher":
        DBNotesName = "rancherNotes";
        break;
    case "Saloon Owner":
        DBNotesName = "saloonOwnerNotes";
        break;
    default:
        console.log("Unknown notes reference: ", currentNotesSuspect);
        return;
    }
    let currentSessionID = getLocalCurrentSessionID();
    
    notes = notes.replaceAll("'", "''");
    
    let updateQuery = `UPDATE sessionNotes SET ${DBNotesName} = '${notes}' WHERE sessionID = ${currentSessionID};`;

    sendSQL(updateQuery).then(result => noErrors(result));
}

// Saves inventory json array
export function saveInventory(inventoryArray) {
    sessionStorage.setItem("inventoryData", JSON.stringify(inventoryArray));
}

export function clearSaveData() {
    sessionStorage.removeItem("roomData");
    sessionStorage.removeItem("inventoryData");
}