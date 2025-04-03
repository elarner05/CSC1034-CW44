document.addEventListener("DOMContentLoaded", async function () {
    const usernameField = document.getElementById("username");
    const playerNameField = document.getElementById("playerName");
    const passwordField = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    let currentUser = await SaveData.getUser();
    if(!currentUser){
        window.location.href = "sign-in.html";
        return;
    }

    usernameField.value = currentUser.username;
    playerNameField.value = currentUser.playerName;

    document.getElementById("editAccountForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const newUsername = usernameField.value;
        const newPlayerName = playerNameField.value;
        const newPassword = passwordField.value;

        let updateQuery = `UPDATE userData SET playerName='${newPlayerName}' ${newPassword ? `, passwordField='${newPassword}'` : ''} WHERE usernameField='${currentUser.username}'`;
        let updateResult = await SaveData.sendSQL(updateQuery);

        if(!updateResult || updateResult.error){
            errorMessage.textContent = "Failed to update account.";
            errorMessage.classList.remove("hidden");
            return;
        }
        window.location.href = "index.html";
        
    });

    document.getElementById("deletAccount").addEventListener("click", async function() {
        if(!confirm("Are you sure you want to delete your account? This cannot be undone."))return;

        let deleteQuery = `DELETE FROM userData WHERE usernameField='${currentUser.username}'`;
        let deleteResult = await SaveData.sendSQL(deleteQuery);

        if(!deleteResult || deleteResult.error){
            errorMessage.textContent = "Failed to delete account.";
            errorMessage.classList.remove("hidden");
            return;
        }
        window.location.href = "sign-in.html";
    });

    document.getElementById("backToMenu").addEventListener("click", function(){
        window.location.href = "index.html";
    });
});