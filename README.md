# NFL Payroll

## - Latest updates
- CREATE, READ, UPDATE and DELETE functionality now working on position, positionplayer, positioncoach, player, team, coach

## - How to run
- When working on FLIP server, need to use nvm to update Node to latest version, or at least v16.5.0.

- app.js needs a db-connector.js file; make a copy of db-template.js, fill in credentials, and rename to db-connector.js. gitignore will ensure credentials are not uploaded to the shared repo on push.

## - Overview
An NFL Team is limited to 53 players and a salary cap per team per year of $208 million. This project seeks to be a database-driven website which will track the players and coaches in an NFL team, to hold their salaries and positions as a human resources database. The project seeks to help teams better keep track of and manage their personnel so that they can best allocate their dollars towards a championship team. Some goals of the project include tracking salary allocated to players and coaches in relation to the teams salary cap or budget to ensure that they stay under the budget along with evaluating if everyone is being paid a fair salary relative to rating.

## - Database Outline, in words
- player: holds individual league player information as attributes including: a unique playerId, the player’s name, their birthdate, their debut or first year in the league, their jersey number, and the name of their team. Lastly the player entity will contain a salary attribute to signify the player’s salary for the year along with a rating attribute to signify how talented of a player they are.
  - playerId: int, auto_increment, unsigned, not NULL, PK
  - name: varchar, not NULL
  - birthdate: date, NULL
  - debut: date, NULL
  - number: int, DEFAULT=0
  - teamId: int, unsigned, FK, NULL
  - rating: float, DEFAULT=0
  - salary: int, DEFAULT=0
 
- team: holds individual team information as attributes including: a unique teamId, the location part of the team name (ex. “Dallas”, “New England”, “Carolina” etc), along with the mascot part of the team name (ex. “Cowboys”, “Patriots”, “Panthers”, etc), and their stadium name. Lastly the entity will hold the team’s salary cap which will signify their player and coach budget for the year.
  - teamId: int, auto_increment, unsigned, not NULL, PK
  - locationName: varchar, not NULL
  - teamName: varchar, not NULL
  - stadium: varchar, DEFAULT=''
  - salaryCap: int, DEFAULT=10000000
  
- position: holds position information as attributes including: a unique positionId, the name of the position, and a teamGroup which denotes what specific group the position belongs to (ex. Offence, Defense, Special Teams).
  - positionId: int, auto_increment, unsigned, not NULL, PK
  - positionName: varchar, not NULL
  - teamGroup (ex. ONE choice: Offence, Defense, Special Teams): varchar, not NULL

- coach: holds coach information as attributes including: a unique coachId, the coaches name, what they coach as coachType (ex. QB Coach, WR Coach, OL Coach etc), and their teamId to represent their team. Lastly the coach entity will contain a salary attribute to signify their salary for the year.
  - coachId: int, auto_increment, unsigned, not NULL, PK
  - name: varchar, not NULL
  - coachType: varchar, DEFAULT=''
  - teamId: int, unsigned, FK, NULL
  - rating: float, DEFAULT=0
  - salary: int, DEFAULT=0

- positionplayer: holds positions for players, composite entity/join table
  - playerId: int, unsigned, not NULL, FK
  - positionId: int, unsigned, not NULL, FK

- positioncoach: holds positions that coaches supervise, composite entity/join table
  - positionId: int, unsigned, not NULL, FK
  - coachId: int, unsigned, not NULL, FK

## - Schema

![Schema](https://github.com/stoneroll6/nfl-payroll/blob/master/views/schema.JPG)

