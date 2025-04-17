//This script reads my resume.pdf file and inserts it into the databse

const fs = require('fs');
const db = require('./db');

async function uploadResume(){
    try{
        const file = fs.readFileSync('./ADAMM-Resume.pdf');
        const filename = 'ADAMM-Resume.pdf';
        const filetype = 'application/pdf';

        await db.query(
            'INSERT INTO resumes (filename, filetype, data) VALUES ($1, $2, $3)',
            [filename, filetype, file]
        );

        console.log("Resume uplaoded successfully");
    }
    catch(err){
        console.error("Failed to upload uploadResume", err);
    }
}

uploadResume();