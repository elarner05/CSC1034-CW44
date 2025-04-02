
import * as SaveData from "./saveData.js";

if (!SaveData.checkUserID()) {
      window.location.href = "index.html";
}




document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
  })
