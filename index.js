// Import required modules
const express = require('express');
const mysql = require('mysql');
require("dotenv").config()
const cors = require("cors");
const coursewiseRouter = require('./routes/coursewiseRoutes');

// Create Express app
const app = express();
app.use(cors())
// MySQL connection configuration
const institutesConnection = mysql.createConnection({
    host: "localhost", // MySQL server host
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'institutes', // MySQL database name
});

const mdTimetableConnection = mysql.createConnection({
    host: "localhost", // MySQL server host
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'md_timetable_s24', // MySQL database name
});

// Connect to MySQL
institutesConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to Institutes database');
});

// Connect to MySQL
mdTimetableConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to mdTimetable MySQL database');
});

app.get("/",async(req,res)=>{
    res.send("<h1><center>Welcome to Time Table backend</center></h1>")
})


app.use('/coursewise',coursewiseRouter)

// Institutes route to fetch data from MySQL
app.get('/institutes', (req, res) => {
    institutesConnection.query('SELECT * FROM institutes', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

// inst_courses route to fetch data from MySQL
app.get('/course', (req, res) => {
    institutesConnection.query('SELECT * FROM `courses1` ORDER BY `courses1`.`course_code` ASC', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

// inst_courses route to fetch data from MySQL
app.get('/yearcode/:coursecode', (req, res) => {
    const course_code = req.params.coursecode
    institutesConnection.query(`select distinct(year_code) from s24_timetable_subjects_course_all where course_code="${course_code}" order by year_code;`, (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

// inst_courses route to fetch data from MySQL
app.get('/mastercode/:coursecode/:yearcode', (req, res) => {
    const course_code = req.params.coursecode
    const year_code = req.params.yearcode
    console.log(course_code,year_code);
    institutesConnection.query(`select distinct(master_code) from s24_timetable_subjects_course_all where course_code="${course_code}" and year_code="${year_code}" order by year_code,master_code`, (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        } 
        res.json(results); // Return data as JSON
    });
});

// papercode route to fetch data from MySQL
app.get('/papercode', (req, res) => {
    institutesConnection.query('SELECT * FROM paper_code_s24', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

// exam center route to fetch data from MySQL
app.get('/examcenter', (req, res) => {
    institutesConnection.query('SELECT distinct(exam_center) FROM s24_rac_dc_details', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

// mdTimetable route to fetch data from MySQL
app.get('/mdtimetable', (req, res) => {
    mdTimetableConnection.query('SELECT * FROM course_sub_marks_01022024_s24', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
});

 
// Start the Express server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = institutesConnection