// Database -> Gets credential from local db-connector file, not included in repo
const { pool } = require('./db-connector');

// Access database via CLI: mysql -u [your_database_username] -p -h classmysql.engr.oregonstate.edu
// Seed -> DROP/CREATE tables, fills with starter values
(async () => {
    try { 
        await pool.query('DROP TABLE IF EXISTS positionplayer, positioncoach');
        await pool.query('DROP TABLE IF EXISTS player, coach, `position`');

        await pool.query('CREATE OR REPLACE TABLE team (teamId INT UNSIGNED NOT NULL AUTO_INCREMENT, locationName VARCHAR(255) NOT NULL, teamName VARCHAR(255) NOT NULL, stadium VARCHAR(255) DEFAULT "", salaryCap INT DEFAULT 10000000, PRIMARY KEY (teamId)) ENGINE = InnoDB');
        await pool.query('INSERT INTO team VALUES (NULL, "Chicago", "Bears", "Soldier Field", 70000000)');
        
        await pool.query('CREATE TABLE player (playerId INT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, birthdate DATE NULL, debut DATE NULL, `number` INT DEFAULT 0, teamId INT UNSIGNED NULL, rating FLOAT DEFAULT 0, salary INT DEFAULT 0, FOREIGN KEY (teamId) REFERENCES team (teamId) ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY (playerId)) ENGINE = InnoDB');
        await pool.query('INSERT INTO player VALUES (NULL, "Dick Butkus", "1942-12-09", "1965-09-01", 51, 1, 5.0, 5000000)');
        await pool.query('INSERT INTO player VALUES (NULL, "Dick Butkus Jr.", "1972-12-09", NULL, 55, NULL, 5.0, 2000000)');
        
        await pool.query('CREATE TABLE coach (coachId INT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, coachType VARCHAR(255) DEFAULT "", teamId INT UNSIGNED NULL, rating FLOAT DEFAULT 0, salary INT DEFAULT 0, FOREIGN KEY (teamId) REFERENCES team (teamId) ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY (coachId)) ENGINE = InnoDB');
        await pool.query('INSERT INTO coach VALUES (NULL, "George Halas", "Head Coach", 1, 5.0, 20000000)');
        await pool.query('INSERT INTO coach VALUES (NULL, "Heorge Galas", "Assistant Coach", NULL, 2.0, 1000)');

        await pool.query('CREATE TABLE `position` (positionId INT UNSIGNED NOT NULL AUTO_INCREMENT, positionName VARCHAR(255) NOT NULL, teamGroup VARCHAR(255) NOT NULL, PRIMARY KEY (positionId)) ENGINE = InnoDB');
        await pool.query('INSERT INTO `position` VALUES (NULL, "Linebacker", "Defense")');

        await pool.query('CREATE TABLE positionplayer (playerId INT UNSIGNED NOT NULL, positionId INT UNSIGNED NOT NULL, FOREIGN KEY (playerId) REFERENCES player (playerId), FOREIGN KEY (positionId) REFERENCES `position` (positionId)) ENGINE = InnoDB');
        await pool.query('INSERT INTO positionplayer VALUES (1, 1)');

        await pool.query('CREATE TABLE positioncoach (coachId INT UNSIGNED NOT NULL, positionId INT UNSIGNED NOT NULL, FOREIGN KEY (coachId) REFERENCES coach (coachId), FOREIGN KEY (positionId) REFERENCES `position` (positionId)) ENGINE = InnoDB');
        await pool.query('INSERT INTO positioncoach VALUES (1, 1)');
        
        } catch (err) {
        // Manage Errors
        console.log("Error starting database: ", err);
    }
})();

console.log("Ctrl+C to terminate");