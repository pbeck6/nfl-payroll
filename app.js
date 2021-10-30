// Express
const express = require('express');
const app = express();     

// Database -> Gets credential from local db-connector file, not included in repo
const db = require('./db-connector');
const PORT = db.port;  // CURRENTLY RUNNING "FOREVER" ON PORT 7270

// Hnadlebars -> For displaying database results into HTML pages
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', exphbs({                     // Create an instance of the handlebars engine to process templates
    extname: ".hbs"
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Home Route
app.get('/', function(req, res)
    {   res.render('home');
});

// Player Routes
app.get('/player', function(req, res)
    {   res.render('player/index');
});

// Team Routes
app.get('/team', function(req, res)
    {   res.render('team/index');
});

// Position Routes
app.get('/position', function(req, res)
    {   res.render('position/index');
});

// Coach Routes
app.get('/coach', function(req, res)
    {   res.render('coach/index');
});
   
// Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});