// Run 'forever' module using command ./node_modules/forever/bin/forever start app.js XXXX

// Express
const express = require('express');
const app = express();
const methodOverride = require('method-override'); // Used to handle non-GET/POST requests such as DELETE
app.use(express.json());  // Handle input JSON data from forms
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Database -> Gets credential from local db-connector file, not included in repo
const { port, pool } = require('./db-connector');
const PORT = port;  // CURRENTLY RUNNING "FOREVER" ON PORT 7270

// Hnadlebars -> For displaying database results into HTML pages
const exphbs = require('express-handlebars');     // Import express-handlebars
const helpers = require('handlebars-helpers')();  // Need helpers for formatting dates
app.engine('.hbs', exphbs({                     // Create an instance of the handlebars engine to process templates
    extname: ".hbs"
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// Home Route //
app.get('/', function(req, res)
    {   res.render('home');
});

// Player Routes //
app.get('/player', async function(req, res)
    {   let playerGet = 'SELECT * FROM player';
        const teamsGet = 'SELECT teamId, locationName, teamName FROM team';
        const inserts = [];
        if (req.query.salaryFilter) {
            const { salaryFilter } = req.query;
            inserts.push(salaryFilter);
            playerGet += ' WHERE salary > ?';
        };
        const teams = await pool.query(teamsGet);
        const rows = await pool.query(playerGet, inserts);
        res.render('player/index', { rows, teams });
});

app.post('/player', async function(req, res) // Add new player
    {   // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        // Capture NULL values
        if (data.birthdate.length == 0) { req.body.birthdate = null };
        if (data.debut.length == 0) { req.body.debut = null };
        if (data.teamId.length == 0) { req.body.teamId = null };
        const inserts = [ data.name, data.birthdate, data.debut, data.number, data.teamId, data.rating, data.salary ];
        const addPlayer = 'INSERT INTO player VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
        try {
            await pool.query(addPlayer, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/player');
});

app.delete('/player/:playerId', async function(req, res) // Delete existing player
    {   let { playerId } = req.params;
        const inserts = [playerId];
        const deletePlayer = 'DELETE FROM player WHERE playerId=?';
        try {
            await pool.query(deletePlayer, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/player');
});

// Team Routes //
app.get('/team', async function(req, res)
    {   let teamGet = 'SELECT * FROM team';
        const locationGet = 'SELECT DISTINCT locationName FROM team';
        const inserts = [];
        if (req.query.locationFilter) {
            const { locationFilter } = req.query;
            inserts.push(locationFilter);
            teamGet += ' WHERE locationName = ?';
        };
        const rows = await pool.query(teamGet, inserts);
        const teamLocations = await pool.query(locationGet);
        res.render('team/index', { rows, teamLocations });
});

app.post('/team', async function(req, res) // Add new team
    {   // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        // Capture DEFAULT values
        if (data.salaryCap.length == 0) { req.body.salaryCap = 10000000 };
        const inserts = [ data.locationName, data.teamName, data.stadium, data.salaryCap ];
        const addTeam = 'INSERT INTO team VALUES (NULL, ?, ?, ?, ?)';
        try {
            await pool.query(addTeam, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/team');
});

app.delete('/team/:teamId', async function(req, res) // Delete existing team
    {   let { teamId } = req.params;
        const inserts = [teamId];
        const deleteTeam = 'DELETE FROM team WHERE teamId=?';
        try {
            await pool.query(deleteTeam, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/team');
});

// Position Routes //
app.get('/position', async function(req, res)
    {   let posGet = 'SELECT * FROM `position`';
        let posPlayGet = 'SELECT positionplayer.playerId, positionplayer.positionId, player.name, position.positionName FROM positionplayer INNER JOIN player ON positionplayer.playerId=player.playerId INNER JOIN `position` ON positionplayer.positionId=position.positionId';
        let posCoachGet = 'SELECT positioncoach.coachId, positioncoach.positionId, coach.name, position.positionName FROM positioncoach INNER JOIN coach ON positioncoach.coachId=coach.coachId INNER JOIN `position` ON positioncoach.positionId=position.positionId';
        const teamGroupsGet = 'SELECT DISTINCT teamGroup FROM `position`';
        const playersGet = 'SELECT DISTINCT playerId, `name` FROM player';
        const coachesGet = 'SELECT DISTINCT coachId, `name` FROM coach';

        const inserts = []
        if (req.query.teamGroupFilter) {
            const { teamGroupFilter } = req.query;
            inserts.push(teamGroupFilter);
            posGet += ' WHERE teamGroup = ?';
        };

        if (req.query.posPlayerFilter) {
            const { posPlayerFilter } = req.query;
            inserts.push(posPlayerFilter);
            posPlayGet += ' WHERE positionName = ?';
        };

        if (req.query.posCoachFilter) {
            const { posCoachFilter } = req.query;
            inserts.push(posCoachFilter);
            posCoachGet += ' WHERE positionName = ?';
        };

        const teamGroups = await pool.query(teamGroupsGet);
        const players = await pool.query(playersGet);
        const coaches = await pool.query(coachesGet);
        const posRows = await pool.query(posGet, inserts);
        const posPlayRows = await pool.query(posPlayGet, inserts);
        const posCoachRows = await pool.query(posCoachGet, inserts);
        res.render('position/index', { teamGroups, players, coaches, posRows, posPlayRows, posCoachRows });
});

app.post('/position', async function(req, res) // Add new position
    {   // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        const inserts = [ data.positionName, data.teamGroup ];
        const addPosition = 'INSERT INTO `position` VALUES (NULL, ?, ?)';
        try {
            await pool.query(addPosition, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/position');
});

app.post('/positionplayer', async function(req, res) // Add new positionplayer
    {   // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        const inserts = [ data.ppPlayerName, data.ppPositionName ];
        const addPositionPlayer = 'INSERT INTO positionplayer VALUES (?, ?)';
        try {
            await pool.query(addPositionPlayer, inserts);
        } catch (err) {
            res.send(err);
        };
        res.redirect('/position');
});

app.post('/positioncoach', async function(req, res) { //Add new positioncoach
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    const inserts = [data.pcCoachName, data.pcPositionName];
    const addPositionCoach = 'INSERT INTO positioncoach VALUES (?, ?)';
    try {
        await pool.query(addPositionCoach, inserts);
    } catch (err) {
        res.send(err);
    }
    res.redirect('/position');
})

app.delete('/position/:positionId', async function(req, res) // Delete existing position
    {   let { positionId } = req.params;
        const inserts = [positionId];
        const deletePosition = 'DELETE FROM `position` WHERE positionId=?';
        try {
            await pool.query(deletePosition, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/position');
});

app.delete('/positionplayer/:positionId/:playerId', async function(req, res) // Delete existing positionplayer
    {   let { positionId, playerId } = req.params;
        const inserts = [positionId, playerId];
        const deletePositionPlayer = 'DELETE FROM `positionplayer` WHERE positionId=? AND playerId=?';
        try {
            await pool.query(deletePositionPlayer, inserts);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/position');
});

app.delete('/positioncoach/:positionId/:coachId', async function(req, res) { // Delete existing positioncoach
    let { positionId, coachId } = req.params;
    const inserts = [positionId, coachId];
    const deletePositionCoach = 'DELETE FROM `positioncoach` WHERE positionId=? AND coachId=?';
    try {
        await pool.query(deletePositionCoach, inserts);
    } catch (err) {
        res.send(err);
    }
    res.redirect('/position');
});

// Coach Routes //
app.get('/coach', async function(req, res)
    {   let coachGet = 'SELECT * FROM coach';
        const teamsGet = 'SELECT teamId, locationName, teamName FROM team';
        const inserts = [];
        if (req.query.ratingFilter) {
            const { ratingFilter } = req.query;
            inserts.push(ratingFilter);
            coachGet += ' WHERE rating > ?';
        }
        const teams = await pool.query(teamsGet);
        const rows = await pool.query(coachGet, inserts);
        res.render('coach/index', { rows, teams });
});
   
app.post('/coach', async function(req,res) { // Add new coach
    // Capture incoming data and parse it back to a JS object
    let data = req.body
    // Capture NULL values
    if (data.teamId.length == 0) {req.body.teamId = null};
    const inserts = [ data.name, data.coachType, data.teamId, data.rating, data.salary];
    const addCoach = 'INSERT INTO coach VALUES (NULL, ?, ?, ?, ?, ?)';
    try {
        await pool.query(addCoach, inserts);
    } catch (err) {
        res.send(err);
    };
    res.redirect('/coach');
});

app.delete('/coach/:coachId', async function(req, res) { // Delete existing coach
    let { coachId } = req.params;
    const inserts = [coachId]
    const deleteCoach = 'DELETE FROM coach WHERE coachId=?';
    try {
        await pool.query(deleteCoach, inserts);
    } catch (err) {
        res.send(err);
    }
    res.redirect('/coach');
})

// Listener //
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
