// Express
const express = require('express');
const app = express();     

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
app.get('/coach', function(req, res)
    {   const coachGet = 'SELECT * FROM coach';
        rows = await pool.query(coachGet);
        res.render('coach/index');
});
   
// Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});