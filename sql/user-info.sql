CREATE TABLE Users (
    UserID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    UserName VARCHAR(20),
    Password VARCHAR(20) 
);

CREATE TABLE User_Statistics(
    UserID INT NOT NULL,
    UserName VARCHAR(20),
    
)