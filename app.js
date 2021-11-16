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
    {   var playerGet = 'SELECT * FROM player';
        const inserts = [];
        if (req.query.salaryFilter) {
            const { salaryFilter } = req.query;
            inserts.push(salaryFilter);
            playerGet += ' WHERE salary > ?';
        };
        rows = await pool.query(playerGet, inserts);
        res.render('player/index', { rows });
});

app.post('/player', async function(req, res) // Add new player
    {   // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        // Capture NULL values
        if (data.name.length == 0) { req.body.name = null };
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
        const locationGet = 'SELECT locationName FROM team';
        const inserts = [];
        if (req.query.locationFilter) {
            const { locationFilter } = req.query;
            inserts.push(locationFilter);
            teamGet += ' WHERE locationName = ?';
        };
        rows = await pool.query(teamGet, inserts);
        teamLocations = await pool.query(locationGet);
        res.render('team/index', { rows, teamLocations });
});

app.post('/team', async function(req, res) // Add new player
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

app.delete('/team/:teamId', async function(req, res) // Delete existing player
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
    {   const posGet = 'SELECT * FROM `position`';
        const posPlayGet = 'SELECT * FROM positionplayer';
        const posCoachGet = 'SELECT * FROM positioncoach';
        posRows = await pool.query(posGet);
        posPlayRows = await pool.query(posPlayGet);
        posCoachRows = await pool.query(posCoachGet);
        res.render('position/index', { posRows, posPlayRows, posCoachRows });
});

// Coach Routes //
app.get('/coach', async function(req, res)
    {   const coachGet = 'SELECT * FROM coach';
        rows = await pool.query(coachGet);
        res.render('coach/index', { rows });
});
   
// Listener //
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
