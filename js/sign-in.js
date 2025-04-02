import * as SaveData from "./saveData.js";


// Temporary sign in, to bypass not having a server
document.getElementById('signinForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById("errorMessage");
    
    

    let sqlQuery = `SELECT * FROM userData WHERE usernameField = '${username}' AND passwordField = '${password}';`;

    let result = await SaveData.sendSQL(sqlQuery);

    if (!result || result.error) {
        errorMessage.innerHTML = "Error response from server";
        if (result) {
          console.log("Error message: ", result.error);
        }
        errorMessage.classList.remove("hidden");
        return;
        
    
    } else if (result.data.length === 0)  {
      errorMessage.innerHTML = "Username or password incorrect"
      errorMessage.classList.remove("hidden");
      return;

    } else {
      // Username and password is in table
      localStorage.setItem("Username", username);
      localStorage.setItem("UserID", result.data[0].userID);
      localStorage.setItem("SignedIn", "true");
      localStorage.setItem("Password", password);
      if (result.data[0].currentSessionID > 0) {
        localStorage.setItem("CurrentSessionID", result.data[0].currentSessionID);
      }
      // console.log(result.data);
      window.location.href = 'index.html';
    }
      

    
});

// Redirect to create account page
document.getElementById("createAccountButton").addEventListener("click", function() {
  window.location.href = "create-account.html"
});
