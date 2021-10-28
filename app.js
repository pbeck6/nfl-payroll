// Express
const express = require('express');
const app = express();     

// Database -> Gets credential from local db-connector file, not included in repo
const db = require('./db-connector');
const PORT = db.port;

// Hnadlebars -> For displaying database results into HTML pages
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', exphbs({                     // Create an instance of the handlebars engine to process templates
    extname: ".hbs"
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Routes
app.get('/', function(req, res)
    {   res.render('home');
});
   
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});