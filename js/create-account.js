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
    let insertUserQuery = `INSERT INTO userData (usernameField, passwordField) VALUES ('${username}', '${password}')`;
    
    let userResult = await SaveData.sendSQL(insertUserQuery);
    
    if (!userResult || userResult.error) {
        if (userResult.error && userResult.error.includes('Duplicate entry')) {
            console.error("Duplicate username error:", userResult.error);
            errorMessage.textContent = "Username already exists. Please choose a different one.";
        } else {
            console.error("Error inserting user:", userResult.error);
            errorMessage.textContent = "Failed to create user. SQL Error";
        }
        errorMessage.classList.remove("hidden");
        return;
    }

    if (errorMessage.textContent !== '') {
        errorMessage.classList.remove("hidden");
    }

    window.location.href = 'sign-in.html';
});

// Redirect to title screen
document.getElementById("titleButton").addEventListener("click", function() {
    window.location.href = "index.html"
});
