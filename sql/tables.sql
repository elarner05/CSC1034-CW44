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

INSERT INTO userData (usernameField, passwordField, playerName, currentSessionID, noOfSessions, totalTime, noOfWins) 
VALUES 
    ('pass', 'pass', 'pass', 1, 3, 3629730, 5),
    ('john_doe', 'password123', 'john doe', 0, 4, 500000, 0),
    ('jane_smith', 'securePass456', 'jane smith', 0, 2, 594027, 2),
    ('emily_clark', 'abc123xyz', 'emily clark', 0, 7, 3849503, 1),
    ('david_brown', 'myPass789', 'david brown', 0, 1, 284950, 0),
    ('lucas_jones', '1234Secure!', 'lucas jones', 0, 6, 103948, 3);

-- Step 1: Insert session
INSERT INTO sessionData (userID, timeStart, timePause, runningBoolean, winBoolean, accusedName)
VALUES (1, 1743604274634, 1743604454634, 1, 0, ''),
    (1, 1743604314992, 1743604477992, 0, 1, 'Bernice Becker'),
    (1, 1743604160781, 1743604502781, 0, 0, ''),
    (2, 1743604274634, 1743604454634, 1, 0, ''),
    (2, 1743604314992, 1743604476992, 0, 1, 'Bernice Becker'),
    (2, 1743604339185, 1743604681185, 0, 0, 'Bernice Becker'),
    (2, 1743604160781, 1743604502781, 0, 0, 'The Drifter');

-- Step 2: Insert session notes
INSERT INTO sessionNotes (sessionID, deputyNotes, armsDealerNotes, preacherNotes, drifterNotes, rancherNotes, saloonOwnerNotes)
VALUES (1, '', '', '', '', '', '');

-- Step 3: Insert session visits
INSERT INTO sessionVisits (sessionID, crossroadsVisited, jailVisited, parishVisited, saloonVisited, gunStoreVisited, ranchVisited)
VALUES (1, 1, 1, 1, 1, 1, 1),
(2, 1, 1, 1, 1, 1, 1),
(3, 1, 1, 0, 1, 1, 1),
(4, 1, 1, 1, 1, 1, 1),
(5, 1, 0, 1, 1, 1, 1),
(6, 1, 1, 1, 1, 0, 1),
(7, 1, 1, 1, 1, 1, 0);

-- Step 4: Insert session items
INSERT INTO sessionItems (sessionID, itemID, inventorySlotName)
VALUES 
    (1, 1, 'slot-1'),
    (1, 2, 'slot-2'),
    (1, 3, 'slot-3'),
    (2, 1, 'slot-1'),
    (2, 7, 'slot-2'),
    (3, 2, 'slot-1'),
    (4, 4, 'slot-1'),
    (4, 2, 'slot-7'),
    (6, 3, 'slot-2');

