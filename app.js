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



// Home Route
app.get('/', function(req, res)
    {   res.render('home');
});

// Player Routes
app.get('/player', async function(req, res)
    {   const playerGet = 'SELECT * FROM player';
        rows = await pool.query(playerGet);
        res.render('player/index', { rows });
});

app.post('/player', async function(req, res) // Add new player
    {   // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        // Capture NULL values
        if (data.birthdate.length == 0)
        {
            req.body.birthdate = null;
        } else {
            req.body.birthdate = `'${req.body.birthdate}'`;
        };
        if (data.debut.length == 0)
        {
            req.body.debut = null;
        } else {
            req.body.debut = `'${req.body.debut}'`;
        };
        if (data.teamId.length == 0)
        {
            req.body.teamId = null;
        };
        const addPlayer = `INSERT INTO player VALUES (NULL, '${data.name}', ${data.birthdate}, ${data.debut}, '${data.number}', ${data.teamId}, '${data.rating}', '${data.salary}')`;
        try {
            await pool.query(addPlayer);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/player');
});

app.delete('/player/:playerId', async function(req, res) // Delete existing player
    {   let { playerId } = req.params;
        const deletePlayer = `DELETE FROM player WHERE playerId=${playerId}`;
        try {
            await pool.query(deletePlayer);
        } catch (err) {
            res.send(err);    
        };
        res.redirect('/player');
});

// Team Routes
app.get('/team', async function(req, res)
    {   const teamGet = 'SELECT * FROM team';
        rows = await pool.query(teamGet);
        res.render('team/index', { rows });
});

// Position Routes
app.get('/position', async function(req, res)
    {   const posGet = 'SELECT * FROM `position`';
        const posPlayGet = 'SELECT * FROM positionplayer';
        const posCoachGet = 'SELECT * FROM positioncoach';
        posRows = await pool.query(posGet);
        posPlayRows = await pool.query(posPlayGet);
        posCoachRows = await pool.query(posCoachGet);
        res.render('position/index', { posRows, posPlayRows, posCoachRows });
});

// Coach Routes
app.get('/coach', async function(req, res)
    {   const coachGet = 'SELECT * FROM coach';
        rows = await pool.query(coachGet);
        res.render('coach/index', { rows });
});
   
// Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
