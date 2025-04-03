    DROP TABLE `sessionItems`;
    DROP TABLE `sessionNotes`;
    DROP TABLE `itemData`;
    DROP TABLE `sessionVisits`;
    DROP TABLE `sessionData`;
    DROP TABLE `userData`;

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

INSERT INTO itemData (itemID, itemName, itemDescription, itemPath) VALUES
(3, 'Muddy Cloth', 'A muddy cloth found at the ranch. It has marks on it', 'assets/muddy-rag.png'),
(4, 'Letter to Drifter', 'A letter found in the drifter''s bag, addressed ''Dear friend,''. It requests his presence, simply signed "S".', 'assets/drifters-note.png'),
(5, 'Yellow Boy Specifications', 'Fires a .44 caliber round, 24 inches long, with lever action and a tubular magazine', 'assets/yellow-boy-gun-specs.png'),
(6, 'Colt Single Action Revolver Specifications', 'Fires a colt .45, 11 inches long, unparalleled durability, with hammer loading', 'assets/colt-revolver-gun-specs.png'),
(7, 'Torn Poster', 'An old torn poster found blown behind a gravestone. It states: "WANTED: Bandit McCrea". It must be over 20 years old', 'assets/torn-poster.png'),
(8, 'Customer Logbook', 'A logbook that contains records of all the customers that visited the saloon.', 'assets/ledger.png'),
(9, 'Deputy''s Notes', 'A note taken from the deputy''s desk. Rants of hatred directed towards the Sheriff.', 'assets/deputy-notes.png'),
(10. 'Glass Shard', 'Found at the arms dealer''s, likely from an arguement about money', 'assets/glass-shard.png');

-- INSERT INTO userData (usernameField, passwordField, playerName, currentSessionID, noOfSessions, totalTime, noOfWins) 
-- VALUES 
--     ('pass', 'pass', 'pass', 1, 3, 3629730, 5),
--     ('john_doe', 'password123', 'john doe', 0, 4, 500000, 0),
--     ('jane_smith', 'securePass456', 'jane smith', 0, 2, 594027, 2),
--     ('emily_clark', 'abc123xyz', 'emily clark', 0, 7, 3849503, 1),
--     ('david_brown', 'myPass789', 'david brown', 0, 1, 284950, 0),
--     ('lucas_jones', '1234Secure!', 'lucas jones', 0, 6, 103948, 3);
-- 
-- -- Step 1: Insert session
-- INSERT INTO sessionData (userID, timeStart, timePause, runningBoolean, winBoolean, accusedName)
-- VALUES (1, 1743604274634, 1743604454634, 1, 0, ''),
--     (1, 1743604314992, 1743604477992, 0, 1, 'Bernice Becker'),
--     (1, 1743604160781, 1743604502781, 0, 0, ''),
--     (2, 1743604274634, 1743604454634, 1, 0, ''),
--     (2, 1743604314992, 1743604476992, 0, 1, 'Bernice Becker'),
--     (2, 1743604339185, 1743604681185, 0, 0, 'Bernice Becker'),
--     (2, 1743604160781, 1743604502781, 0, 0, 'The Drifter');

-- -- Step 2: Insert session notes
-- INSERT INTO sessionNotes (sessionID, deputyNotes, armsDealerNotes, preacherNotes, drifterNotes, rancherNotes, saloonOwnerNotes)
-- VALUES (1, '', '', '', '', '', '');

-- -- Step 3: Insert session visits
-- INSERT INTO sessionVisits (sessionID, crossroadsVisited, jailVisited, parishVisited, saloonVisited, gunStoreVisited, ranchVisited)
-- VALUES (1, 1, 1, 1, 1, 1, 1),
-- (2, 1, 1, 1, 1, 1, 1),
-- (3, 1, 1, 0, 1, 1, 1),
-- (4, 1, 1, 1, 1, 1, 1),
-- (5, 1, 0, 1, 1, 1, 1),
-- (6, 1, 1, 1, 1, 0, 1),
-- (7, 1, 1, 1, 1, 1, 0);

-- -- Step 4: Insert session items
-- INSERT INTO sessionItems (sessionID, itemID, inventorySlotName)
-- VALUES 
--     (1, 1, 'slot-1'),
--     (1, 2, 'slot-2'),
--     (1, 3, 'slot-3'),
--     (2, 1, 'slot-1'),
--     (2, 7, 'slot-2'),
--     (3, 2, 'slot-1'),
--     (4, 4, 'slot-1'),
--     (4, 2, 'slot-7'),
--     (6, 3, 'slot-2');







-- Step 1: Insert users
INSERT INTO userData (usernameField, passwordField, playerName, currentSessionID, noOfSessions, totalTime, noOfWins) 
VALUES 
    ('maverick01', 'hunter2', 'MAVERICK01', 0, 5, 4250000, 3),
    ('shadowfox', 'stealth123', 'SHADOWFOX', 0, 3, 2894500, 1),
    ('ironfist', 'strongPass!', 'IRONFIST', 0, 6, 5029800, 4),
    ('stormrider', 'wind123', 'STORMRIDER', 0, 2, 1750000, 0),
    ('nightowl', 'secure$789', 'NIGHTOWL', 0, 4, 3501200, 2);

-- Step 2: Insert session data (sessions that are completed)
INSERT INTO sessionData (userID, timeStart, timePause, runningBoolean, winBoolean, accusedName)
VALUES 
    (1, 1743604274634, 1743604454634, 0, 1, 'Bernice Becker'),
    (1, 1743604314992, 1743604477992, 0, 0, ''),
    (1, 1743604160781, 1743604502781, 0, 0, 'Arms Dealer'),
    (2, 1743604274634, 1743604454634, 0, 0, ''),
    (2, 1743604314992, 1743604476992, 0, 0, 'Rev. Willie McCrea'),
    (3, 1743604339185, 1743604681185, 0, 0, ''),
    (3, 1743604160781, 1743604502781, 0, 0, 'Deputy Cain Chambers'),
    (4, 1743604314992, 1743604477992, 0, 0, 'The Drifter'),
    (5, 1743604339185, 1743604681185, 0, 0, ''),
    (5, 1743604160781, 1743604502781, 0, 0, 'Denice Doherty'); -- Session with all items found

-- Step 3: Insert session notes
INSERT INTO sessionNotes (sessionID, deputyNotes, armsDealerNotes, preacherNotes, drifterNotes, rancherNotes, saloonOwnerNotes)
VALUES 
    (1, 'Deputy was acting strange.', '', '', '', '', ''),
    (2, '', 'Arms dealer denies involvement.', '', '', '', ''),
    (3, '', '', 'The preacher saw something.', '', '', ''),
    (4, '', '', '', 'Drifter had a letter.', '', ''),
    (5, '', '', '', '', 'Rancher was nervous.', ''),
    (10, 'Deputy was at the crime scene.', 'Arms dealer sold the knife.', 'Preacher spoke about the victim.', 'Drifter knew the accused.', 'Rancher saw a rider.', 'Saloon Owner had a ledger.');

-- Step 4: Insert session visits
INSERT INTO sessionVisits (sessionID, crossroadsVisited, jailVisited, parishVisited, saloonVisited, gunStoreVisited, ranchVisited)
VALUES 
    (1, 1, 1, 1, 1, 1, 1),
    (2, 1, 1, 1, 1, 1, 1),
    (3, 1, 1, 0, 1, 1, 1),
    (4, 1, 1, 1, 1, 1, 1),
    (5, 1, 0, 1, 1, 1, 1),
    (6, 1, 1, 1, 1, 0, 1),
    (7, 1, 1, 1, 1, 1, 0),
    (10, 1, 1, 1, 1, 1, 1); -- All locations visited in session with all items found

-- Step 5: Insert session items (one session with all items found)
INSERT INTO sessionItems (sessionID, itemID, inventorySlotName)
VALUES 
    (1, 7, 'slot-1'),
    (1, 4, 'slot-2'),
    (2, 8, 'slot-3'),
    (3, 7, 'slot-1'),
    (4, 9, 'slot-7'),
    (5, 3, 'slot-2'),
    (5, 4, 'slot-1'),
    (6, 3, 'slot-2'),
    -- Session where all items are found (sessionID = 10)
    (10, 3, 'slot-3'),
    (10, 4, 'slot-4'),
    (10, 5, 'slot-5'),
    (10, 6, 'slot-6'),
    (10, 7, 'slot-7'),
    (10, 8, 'slot-8'),
    (10, 9, 'slot-9'),
    (10, 10, 'slot-11');