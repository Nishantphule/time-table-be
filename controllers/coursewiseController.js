
const mysql = require('mysql');

const institutesConnection = mysql.createConnection({
    host: "localhost", // MySQL server host
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'institutes', // MySQL database name
});

// Connect to MySQL
institutesConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to Institutes database');
});

const coursewiseController = {
getcoursecodes:(req, res) => {
    institutesConnection.query('SELECT * FROM `courses1` ORDER BY `courses1`.`course_code` ASC', (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
},

getyearcodes:(req, res) => {
    const course_code = req.params.coursecode;
    institutesConnection.query(`select distinct(year_code) from s24_timetable_subjects_course_all where course_code="${course_code}" order by year_code;`, (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
},

getmastercodes:(req, res) => {
    const course_code = req.params.coursecode;
    const year_code = req.params.yearcode;
    institutesConnection.query(`select distinct(master_code) from s24_timetable_subjects_course_all where course_code="${course_code}" and year_code="${year_code}" order by year_code,master_code`, (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        } 
        res.json(results); // Return data as JSON
    });
},
dayquery:(req,res)=>{
    const course_code = req.params.coursecode;
    const year_code = req.params.yearcode;
    const master_code = req.params.mastercode;
    institutesConnection.query(`SELECT exam_dayw,daysession FROM s24_timetable_subjects_course_all where course_code=${course_code} and year_code=${year_code} and master_code=${master_code} and block='N' group by exam_dayw,daysession ORDER BY exam_dayw ASC,daysession DESC;`, (error, results, fields) => {
        if (error) {
            console.error('Error querying MySQL:', error);
            res.status(500).send('Error fetching data from MySQL');
            return;
        }
        res.json(results); // Return data as JSON
    });
},

}

module.exports = coursewiseController

