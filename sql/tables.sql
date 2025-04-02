    DROP TABLE `sessionItems`;
    DROP TABLE `sessionNotes`;
    DROP TABLE `itemData`;
    DROP TABLE `sessionVisits`;
    DROP TABLE `sessionData`;
    DROP TABLE `userData`;

CREATE TABLE userData (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usernameField VARCHAR(20) NOT NULL UNIQUE,
    passwordField VARCHAR(20) NOT NULL,
    playerName VARCHAR(20) NOT NULL,
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

INSERT INTO itemData (itemID, itemName, itemDescription, itemPath) 
VALUES 
    (1, 'The One', 'An ancient artifact of oneness.', 'assets/test-item.png'),
    (2, 'Bloody Knife', 'A knife with blood on it.', 'assets/bloodied-knife.png'),
    (3, 'Muddy Cloth', 'A muddy cloth found at the ranch. It has marks on it', 'assets/muddy-rag.png'),
    (4, 'Letter to Drifter', 'A letter founded in the drifter''s bag, addressed ''Dear friend,''. It requests his presence, simply signed "S".', 'assets/drifters-note.png'),
    (7, 'Torn Poster', 'A old torn poster found blown behind a gravestone. It states: "WANTED: Bandit McCrea". It must be over 20 years old', 'assets/torn-poster.png');

INSERT INTO userData (usernameField, passwordField, playerName) 
VALUES 
    ('pass', 'pass', 'pass'),
    ('john_doe', 'password123', 'john doe'),
    ('jane_smith', 'securePass456', 'jane smith'),
    ('emily_clark', 'abc123xyz', 'emily clark'),
    ('david_brown', 'myPass789', 'david brown'),
    ('lucas_jones', '1234Secure!', 'lucas jones');

-- Step 1: Insert session
INSERT INTO sessionData (userID, timeStart, timePause, runningBoolean, winBoolean)
VALUES (1, 1625376000, 0, 1, 0),
    (1, 0, 300000, 0, 1),
    (1, 0, 400000, 0, 0);

-- Step 2: Update userData to reference the session
UPDATE userData 
SET currentSessionID = 1
WHERE userID = 1;

-- Step 3: Insert session notes
INSERT INTO sessionNotes (sessionID, deputyNotes, armsDealerNotes, preacherNotes, drifterNotes, rancherNotes, saloonOwnerNotes)
VALUES (1, '', '', '', '', '', '');

-- Step 4: Insert session visits
INSERT INTO sessionVisits (sessionID, crossroadsVisited, jailVisited, parishVisited, saloonVisited, gunStoreVisited, ranchVisited)
VALUES (1, 0, 0, 0, 0, 0, 0);

-- Step 5: Insert session items
INSERT INTO sessionItems (sessionID, itemID, inventorySlotName)
VALUES 
    (1, 1, 'slot-1'),
    (1, 2, 'slot-2'),
    (1, 3, 'slot-3'),
    (2, 1, 'slot-1'),
    (2, 7, 'slot-2'),
    (3, 2, 'slot-1');

