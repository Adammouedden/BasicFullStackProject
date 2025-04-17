//Node.js backend for the project

//Express is a web framework for Node.JS, it allows me to define URLs (routes) and their handlers
const express = require('express');

//CORS = Cross-Origin Resource sharing, this is a middle man software to allow the frontend to access the backend API
//Useful during development when frontend runs on :5500 or :5173 and backend on :3000
const cors = require('cors');

//Creates an instance of the express application
const app = express();

//Import our custom PostgresSQL database logic from db.js file
const db = require('./db');

//The port number the backend server runs on 
const PORT = 3000;

//Enable Cross-Origin requests from the browser
app.use(cors());

//Automatically serve static files (HTML, JS, CSS) from the ../client folder
app.use(express.static('../client')); //Server frontend

//Parse incoming JSON requests
app.use(express.json());

//morgan for logging every HTTP request automatically
const morgan = require('morgan');
app.use(morgan('dev'));

//Defining Routes:
//ROUTE: GET /api/resume. This fetches the latest resume from the db and sends it as a pdf




//Simple GET route
//Lambda expression, when this route is hit we execute a SQL query using the db helper
app.get('/api/resume', async(req, res) => {
    try{
        //Await runs this code asynchronously, awaiting a response before executing
        const result = await db.query('SELECT * FROM resumes ORDER BY id DESC LIMIT 1');

        if (result.rows.length === 0){
            return res.status(404).send('Resume not found');
        }
        
        const resume = result.rows[0];

        //Set response headers to force download or inline view

        res.setHeader('Content-Type', resume.filetype);
        res.setHeader('Content-Disposition', 'inline; filename="${resume.filename}"');
        res.send(resume.data);
    }
    catch (err){
        console.error(err);
        res.status(500).send('Error retrieving resume');
        }
});

//Start Server:
//Start listening for incoming HTTP requests on Port 3000
app.listen(PORT, () => {
    console.log('Server running at http://localhost:${PORT}');
});