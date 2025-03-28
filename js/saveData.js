export function getRoomData() {
    let savedRoomData = sessionStorage.getItem("roomData");
    try{
        savedRoomData = JSON.parse(savedRoomData);
    } catch {
        savedRoomData = null;
    }
    if (!savedRoomData) {
        savedRoomData = [{
            "name": "Crossroads",
            "visited": false
        }, {
            "name": "Jail",
            "visited": false
        }, {
            "name": "Parish",
            "visited": false
        }, {
            "name": "Saloon",
            "visited": false
        }, {
            "name": "Ranch",
            "visited": false
        }, {
            "name": "Gun Shop",
            "visited": false
        }
        ]
    }
        
    sessionStorage.setItem("roomData", JSON.stringify(savedRoomData));
    return savedRoomData;
}

export function visitRoom(roomName) {
    let savedRoomData = getRoomData();
    
    savedRoomData.forEach(room => {
        if (room.name === roomName) {room.visited = true;}
    });
    sessionStorage.setItem("roomData", JSON.stringify(savedRoomData));
}

export function clearSaveData() {
    sessionStorage.removeItem("roomData");
}