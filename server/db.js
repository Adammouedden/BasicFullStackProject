//Import the Pool class from the pg library, this is a PostGreSQL driver for Node.js
const { Pool } = require('pg');

//create a connection pool for PostgreSQL
//This lets me reuse DB connections instead of opening a new one ach time
const pool = new Pool({
    user: 'adam',      //PostgreSQL username
    host: 'localhost',          //Host (localhost for local dev)
    database: 'demo_db',        //Name of the database I'm using
    password: 'adam',  //Database password
    port: 5432,                 //Default PostgreSQL port
});

//Export an object with a query method
module.exports = {
    //The query method wraps ool.query and forwards the SQL command and parameters
    //Example db.query('SELECT * FROM employees WHERE id = ...')
    query: (text, params) => pool.query(text, params),
};


