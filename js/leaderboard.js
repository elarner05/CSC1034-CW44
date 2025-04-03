
import * as SaveData from "./saveData.js";

function millisToMinsSecs(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

let fastestTimeQuery = `\
SELECT 
    u.usernameField AS username, 
    COALESCE(MIN(s.timePause - s.timeStart), NULL) AS fastestWinTime, 
    COALESCE(SUM(si.totalItems), 0) AS totalItemsCollected
FROM userData u
LEFT JOIN sessionData s 
    ON u.userID = s.userID AND s.winBoolean = 1
LEFT JOIN (
    SELECT s.userID, COUNT(si.itemID) AS totalItems
    FROM sessionItems si
    JOIN sessionData s ON si.sessionID = s.sessionID
    GROUP BY s.userID
) si ON u.userID = si.userID
GROUP BY u.userID
ORDER BY 
    CASE 
        WHEN MIN(s.timePause - s.timeStart) IS NULL THEN 1 
        ELSE 0 
    END,
    MIN(s.timePause - s.timeStart) ASC;`;

let mostItemsQuery = `\
SELECT 
    u.usernameField AS username, 
    COALESCE(MIN(s.timePause - s.timeStart), NULL) AS fastestWinTime, 
    COALESCE(SUM(si.totalItems), 0) AS totalItemsCollected
FROM userData u
LEFT JOIN sessionData s 
    ON u.userID = s.userID AND s.winBoolean = 1
LEFT JOIN (
    SELECT s.userID, COUNT(si.itemID) AS totalItems
    FROM sessionItems si
    JOIN sessionData s ON si.sessionID = s.sessionID
    GROUP BY s.userID
) si ON u.userID = si.userID
GROUP BY u.userID
ORDER BY 
    SUM(si.totalItems) DESC;`;






document.addEventListener("DOMContentLoaded", () => {
    let leaderboardData = [
        { username: "Player1", fastestWinTime: "5:32", totalItemsCollected: 12 },
        { username: "Player2", fastestWinTime: "6:45", totalItemsCollected: 15 },
        { username: "Player3", fastestWinTime: "7:10", totalItemsCollected: 9 },
        // Add more players as needed
    ];
    SaveData.sendSQL(fastestTimeQuery).then(result=>{if (SaveData.noErrors(result)) {console.log(result);leaderboardData = result.data;renderLeaderboard()};});

    const leaderboardBody = document.getElementById("leaderboardBody");
    const tableHeaders = document.querySelectorAll("th");
    
    // Function to render the leaderboard
    function renderLeaderboard() {
        leaderboardBody.innerHTML = ""; // Clear current table rows
        leaderboardData.forEach((player, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index+1}</td>
                <td>${player.username}</td>
                <td>${player.fastestWinTime ? millisToMinsSecs(parseInt(player.fastestWinTime)) : "N/A"}</td>
                <td>${parseInt(player.totalItemsCollected)}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    // Sorting functionality
    tableHeaders.forEach((header, index) => {
        header.addEventListener("click", () => {
            
            const key = index === 1 ? "username" : index === 2 ? "fastestWinTime" : index === 3 ? "totalItemsCollected" : "";
            if (key === "fastestWinTime") {
                SaveData.sendSQL(fastestTimeQuery).then(result=>{if (SaveData.noErrors(result)) {console.log(result);leaderboardData = result.data;renderLeaderboard()};});
            } else if (key === "totalItemsCollected") {
                SaveData.sendSQL(mostItemsQuery).then(result=>{if (SaveData.noErrors(result)) {console.log(result);leaderboardData = result.data;renderLeaderboard()};});
            } else if (key === "username") {
                leaderboardData.sort((a, b) => {
                    return a[key].localeCompare(b[key]); // Sort alphabetically
                });
            } else {
                return;
            }

            tableHeaders.forEach(th => {
                th.classList.remove("sortBy");
            })
            header.classList.add("sortBy");
            
            

            renderLeaderboard();
        });
    });

    // Helper function to convert time string to seconds
    function convertTimeToSeconds(timeStr) {
        if (!timeStr) {
            return 0;
        }
        const [minutes, seconds] = timeStr.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    renderLeaderboard(); // Initial render
});

// Back button functionality
document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
});