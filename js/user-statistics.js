
import * as SaveData from "./saveData.js";

function millisToHoursMinsSecs(duration) {
      var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
    
      return hours + ":" + minutes + ":" + seconds;
    }

function millisToMinsSecs(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

if (!SaveData.checkUserID()) {
      window.location.href = "index.html";
}

const plays = document.getElementById("plays");
const totalTimePlayed = document.getElementById("totalTimePlayed");
const fastestWinTime = document.getElementById("fastestWinTime");
const timesWon = document.getElementById("timesWon");
const timesLost = document.getElementById("timesLost");
const winRate = document.getElementById("winRate");
const totalItems = document.getElementById("totalItems");
const averageItems = document.getElementById("averageItems");

let userID = SaveData.getLocalUserID();

async function fillUserData(userData) {
      plays.innerHTML = userData.noOfSessions;

      totalTimePlayed.innerHTML = millisToHoursMinsSecs(parseInt(userData.totalTime));

      let getSessionsQuery = `SELECT * FROM sessionData WHERE userID = ${userID} AND runningBoolean = 0;`;
      let result = await SaveData.sendSQL(getSessionsQuery);

      if (SaveData.noErrors(result)) {
            let fastestTime = 1000*60*20;
            result.data.forEach(session=>{
                  if ((parseInt(session.timePause) - parseInt(session.timeStart)) < fastestTime) {
                        fastestTime = parseInt(session.timePause) - parseInt(session.timeStart);
                  }
            });
            fastestWinTime.innerHTML = fastestTime < 1000*60*20 ? millisToMinsSecs(fastestTime) : "N/A";
      }

      timesWon.innerHTML = userData.noOfWins;
      timesLost.innerHTML = parseInt(userData.noOfSessions) - parseInt(userData.noOfWins);
      let rate = parseInt((parseInt(userData.noOfWins)/parseInt(userData.noOfSessions)*100));
      winRate.innerHTML = rate !== NaN ? rate+"%" : "N/A";


      let getItemsQuery = `SELECT si.itemID, i.itemName, i.itemDescription, i.itemPath 
                        FROM sessionItems si
                        JOIN sessionData sd ON si.sessionID = sd.sessionID
                        JOIN itemData i ON si.itemID = i.itemID
                        WHERE sd.userID = ${userID};`;
      result = await SaveData.sendSQL(getItemsQuery);

      if (SaveData.noErrors(result)) {
            totalItems.innerHTML = result.data.length;
            console.log(userData.noOfSessions);

            let aveItems = (result.data.length/parseInt(userData.noOfSessions)).toFixed(2);
            console.log(aveItems);
      
            averageItems.innerHTML = aveItems !== NaN ? aveItems : "N/A";
      }
}

SaveData.getUserData().then(userData => {fillUserData(userData);});


document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
  })
