
import * as SaveData from "./saveData.js";

if(!SaveData.checkUserID()){
    window.location.href = "index.html";
}

const userID = SaveData.getLocalUserID();

const playerNameField = document.getElementById("playerName");
const passwordField = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

document.getElementById("editAccountForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const newPlayerName = playerNameField.value.replaceAll("'", "''");
    const newPassword = passwordField.value.replaceAll("'", "''");

    if (newPlayerName !== "") {
        let updateQuery = `UPDATE userData SET playerName = '${newPlayerName}' WHERE userID = ${userID};`;
        let result = await SaveData.sendSQL(updateQuery);
        if (!SaveData.noErrors(result)) {
            errorMessage.textContent = "Failed to update player name.";
            errorMessage.classList.remove("hidden");
        } else {
            errorMessage.textContent = "Successfully updated player name";
            errorMessage.classList.remove("hidden");
        }

    }
    if (newPassword !== "") {
        let updateQuery = `UPDATE userData SET passwordField = '${newPassword}' WHERE userID = ${userID};`;
        let result = await SaveData.sendSQL(updateQuery);
        if (!SaveData.noErrors(result)) {
            errorMessage.textContent = "Failed to update password.";
            errorMessage.classList.remove("hidden");
        } else {
            localStorage.clear();
            window.location.href = "index.html"
        }
    }
    
});

document.getElementById("deleteAccount").addEventListener("click", async function() {
    if(!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    let deleteQuery = `DELETE FROM userData WHERE userID = ${userID};`;
    let deleteResult = await SaveData.sendSQL(deleteQuery);

    if(!SaveData.noErrors(deleteResult)){
        errorMessage.textContent = "Failed to delete account.";
        errorMessage.classList.remove("hidden");
        return;
    } else {
        localStorage.clear();
        window.location.href = "index.html"
    }
});

document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
  })