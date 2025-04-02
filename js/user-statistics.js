
import * as SaveData from "./saveData.js";

if (!SaveData.checkUserID()) {
      window.location.href = "index.html";
}

let userData = JSON.parse(localStorage.getItem("CurrentUserData"));
document.getElementById("playAmount").innerHTML=userData.noOfSessions;

document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
  })
