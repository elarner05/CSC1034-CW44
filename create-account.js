
// Temporary sign in, to bypass not having a server
document.getElementById('createAccountForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    window.location.href = 'sign-in.html';
});

// Redirect to title screen
document.getElementById("titleButton").addEventListener("click", function() {
    window.location.href = "index.html"
});
