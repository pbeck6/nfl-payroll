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
    {   res.render('index');
});
    // {    
    //     // Define our queries
    //     query1 = 'DROP TABLE IF EXISTS diagnostic;';
    //     query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    //     query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
    //     query4 = 'SELECT * FROM diagnostic;';

    //     // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

    //     // DROP TABLE...
    //     db.pool.query(query1, function (err, results, fields){

    //         // CREATE TABLE...
    //         db.pool.query(query2, function(err, results, fields){

    //             // INSERT INTO...
    //             db.pool.query(query3, function(err, results, fields){

    //                 // SELECT *...
    //                 db.pool.query(query4, function(err, results, fields){

    //                     // Send the results to the browser
    //                     let base = "<h1>MySQL Results:</h1>"
    //                     res.send(base + JSON.stringify(results));
    //                 });
    //             });
    //         });
    //     });
    // });

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});