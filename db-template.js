// Get an instance of mysql we can use in the app
const mysql = require('mysql');
const util = require('util'); // Necessary to use async/await functions on query

const port = XXXX; //FILL IN PORT NUMBER

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_someusername', // FILL IN
    password        : 'somepassword', // FILL IN
    database        : 'cs340_somedatabase' // FILL IN
});

pool.query = util.promisify(pool.query);

// Export it for use in our application
module.exports.pool = pool;
module.exports.port = port;