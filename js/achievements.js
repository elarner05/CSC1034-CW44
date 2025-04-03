import * as SaveData from "./saveData.js";

if (!SaveData.checkUserID()) {
    window.location.href = "index.html";
}

let userID = SaveData.getLocalUserID();

let itemCollectorQuery = `\
SELECT 
    COUNT(DISTINCT si.itemID) = (SELECT COUNT(itemID) FROM itemData) AS allItemsCollected
FROM sessionItems si
INNER JOIN sessionData sd ON si.sessionID = sd.sessionID
WHERE sd.userID = ${userID};`

SaveData.sendSQL(itemCollectorQuery).then(result=>{
    if (SaveData.noErrors(result)) {
        console.log(result);
        if (result.data[0].allItemsCollected === '1') {
            document.getElementById("itemCollector").classList.add("unlocked");
            document.getElementById("itemCollector").classList.remove("locked");
        } else {
            document.getElementById("itemCollector").classList.add("locked");
            document.getElementById("itemCollector").classList.remove("unlocked");
        }
    }
});

let speedRunnerQuery = `\
SELECT sd.sessionID, (sd.timePause - sd.timeStart) / 1000 AS winTimeInSeconds
FROM sessionData sd
WHERE sd.userID = ${userID}
AND sd.winBoolean = 1
AND sd.runningBoolean = 0
AND (sd.timePause - sd.timeStart) / 1000 <= 37.5;`

SaveData.sendSQL(speedRunnerQuery).then(result=>{
    if (SaveData.noErrors(result)) {
        console.log(result);
        if (result.data.length !== 0) {
            document.getElementById("speedRunner").classList.add("unlocked");
            document.getElementById("speedRunner").classList.remove("locked");
        } else {
            document.getElementById("speedRunner").classList.add("locked");
            document.getElementById("speedRunner").classList.remove("unlocked");
        }
    }
});

let noLifeDetectedQuery = `\
SELECT totalTime
FROM userData ud
WHERE ud.userID = ${userID};`

SaveData.sendSQL(noLifeDetectedQuery).then(result=>{
    if (SaveData.noErrors(result)) {
        console.log(result);
        if (parseInt(result.data[0].totalTime) > 60*60*1000) {
            document.getElementById("noLifeDetected").classList.add("unlocked");
            document.getElementById("noLifeDetected").classList.remove("locked");
        } else {
            document.getElementById("noLifeDetected").classList.add("locked");
            document.getElementById("noLifeDetected").classList.remove("unlocked");
        }
    }
});

let grudgeHolderQuery = `\
SELECT accusedName, COUNT(*) AS accusations
FROM sessionData
WHERE userID = ${userID} AND accusedName != 'Bernice Becker'
GROUP BY accusedName
HAVING COUNT(*) >= 10;`;

SaveData.sendSQL(grudgeHolderQuery).then(result=>{
    if (SaveData.noErrors(result)) {
        console.log(result);
        if (result.data.length > 0) {
            document.getElementById("grudgeHolder").classList.add("unlocked");
            document.getElementById("grudgeHolder").classList.remove("locked");
        } else {
            document.getElementById("grudgeHolder").classList.add("locked");
            document.getElementById("grudgeHolder").classList.remove("unlocked");
        }
    }
});

let scribeQuery = `\
SELECT SUM(
        CHAR_LENGTH(deputyNotes) + 
        CHAR_LENGTH(armsDealerNotes) + 
        CHAR_LENGTH(preacherNotes) + 
        CHAR_LENGTH(drifterNotes) + 
        CHAR_LENGTH(rancherNotes) + 
        CHAR_LENGTH(saloonOwnerNotes)
    ) AS totalNoteCharacters
FROM sessionNotes sn
JOIN sessionData sd ON sn.sessionID = sd.sessionID
WHERE sd.userID = ${userID};`

SaveData.sendSQL(scribeQuery).then(result=>{
    if (SaveData.noErrors(result)) {
        console.log(result);
        if (parseInt(result.data[0].totalNoteCharacters) >= 200) {
            document.getElementById("scribe").classList.add("unlocked");
            document.getElementById("scribe").classList.remove("locked");
        } else {
            document.getElementById("scribe").classList.add("locked");
            document.getElementById("scribe").classList.remove("unlocked");
        }
    }
});

let finalMomentQuery = `\
SELECT EXISTS (
    SELECT 1 
    FROM sessionData 
    WHERE userID = ${userID} 
      AND (timePause - timeStart) > 1125000 
      AND winBoolean = 1
) AS sessionExists;`

SaveData.sendSQL(finalMomentQuery).then(result=>{
    if (SaveData.noErrors(result)) {
        console.log("final moments", result);
        if (result.data[0].sessionExists === "1") {
            console.log("here");
            document.getElementById("finalMoment").classList.add("unlocked");
            document.getElementById("finalMoment").classList.remove("locked");
        } else {
            document.getElementById("finalMoment").classList.add("locked");
            document.getElementById("finalMoment").classList.remove("unlocked");
        }
    }
});

let achievementData = {
    "Item Collector": "Collect all the currently collectable items",
    "Speed Runner": "Correctly accuse the murderer before 6:30AM",
    "No Life Detected":"Spend more than one hour total on the game",
    "Grudge Holder": "Accuse the same person incorrectly ten times",
    "Scribe": "Write over 200 characters in the notebook",
    "Final Moment Heroics": "Correctly accuse the murderer just before you run out of time (after 9:00PM)"
}

const description = document.getElementById("achievementDescription");
const achievements = document.querySelectorAll(".achievement");

for (let achievement of achievements) {
    achievement.addEventListener("click", ()=>{
        description.innerHTML = achievement.innerHTML + " - " + achievementData[achievement.innerHTML]
    });
}

document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
  })
