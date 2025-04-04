
CREATE TABLE userData (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usernameField VARCHAR(40) NOT NULL UNIQUE,
    passwordField VARCHAR(40) NOT NULL,
    playerName VARCHAR(40) NOT NULL,
    currentSessionID INT DEFAULT 0,
    noOfSessions INT DEFAULT 0,
    totalTime INT DEFAULT 0,
    noOfWins INT DEFAULT 0
);

CREATE TABLE itemData (
    itemID INT NOT NULL PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    itemDescription VARCHAR(255) NOT NULL,
    itemPath VARCHAR(255) NOT NULL
);

CREATE TABLE sessionData (
    sessionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    timeStart BIGINT NOT NULL,
    timePause BIGINT NOT NULL,
    runningBoolean TINYINT(1) DEFAULT 1,
    winBoolean TINYINT(1) DEFAULT 0,
    accusedName VARCHAR(20) DEFAULT '',
    FOREIGN KEY (userID) REFERENCES userData(userID) ON DELETE CASCADE
);

CREATE TABLE sessionItems (
    sessionID INT NOT NULL,
    itemID INT NOT NULL,
    inventorySlotName VARCHAR(10) NOT NULL,
    FOREIGN KEY (sessionID) REFERENCES sessionData(sessionID) ON DELETE CASCADE,
    FOREIGN KEY (itemID) REFERENCES itemData(itemID) ON DELETE CASCADE,
    PRIMARY KEY (sessionID, itemID)  -- Composite primary key for uniqueness
);

CREATE TABLE sessionNotes (
    sessionID INT NOT NULL,
    deputyNotes VARCHAR(1000) DEFAULT '',
    armsDealerNotes VARCHAR(1000) DEFAULT '',
    preacherNotes VARCHAR(1000) DEFAULT '',
    drifterNotes VARCHAR(1000) DEFAULT '',
    rancherNotes VARCHAR(1000) DEFAULT '',
    saloonOwnerNotes VARCHAR(1000) DEFAULT '',
    FOREIGN KEY (sessionID) REFERENCES sessionData(sessionID) ON DELETE CASCADE
);

CREATE TABLE sessionVisits (
    sessionID INT NOT NULL,
    crossroadsVisited TINYINT(1) DEFAULT 0,
    jailVisited TINYINT(1) DEFAULT 0,
    parishVisited TINYINT(1) DEFAULT 0,
    saloonVisited TINYINT(1) DEFAULT 0,
    gunStoreVisited TINYINT(1) DEFAULT 0,
    ranchVisited TINYINT(1) DEFAULT 0,

    FOREIGN KEY (sessionID) REFERENCES sessionData(sessionID) ON DELETE CASCADE
);
