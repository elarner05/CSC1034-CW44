import * as SaveData from "./saveData.js";

// Temporary sign in, to bypass not having a server
document.getElementById('createAccountForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    if (username.length > 20 || password.length > 20) {
        errorMessage.textContent = "Username and password must be at most 20 characters!";
        return; // Stop further execution
    }

    errorMessage.textContent = ""; // Clear error if valid

    //let insertUserQuery = `INSERT INTO Users (UserName, Password) VALUES ('${username}', '${password}')`;
    let insertUserQuery = `INSERT INTO Users (UserName, Password) VALUES ('${username}', '${password}')`;
    
    let userResult = await SaveData.sendSQL(insertUserQuery);
    
    if (!userResult || userResult.error) {
        console.error("Error inserting user:", userResult);
        errorMessage.textContent = "Failed to create user.";
        return;
    }
    console.log(userResult);

    //window.location.href = 'sign-in.html';
});

// Redirect to title screen
document.getElementById("titleButton").addEventListener("click", function() {
    window.location.href = "index.html"
});
