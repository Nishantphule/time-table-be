const mysql = require("mysql");

const institutesConnection = mysql.createConnection({
  host: "localhost", // MySQL server host
  user: "root", // MySQL username
  password: "", // MySQL password
  database: "institutes", // MySQL database name
});

// Connect to MySQL
institutesConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to Institutes database for Exam center router");
});

const examcenterwiseController = {
  getPapercodes: async (req, res) => {
    institutesConnection.query(
      `SELECT exam_dayw,exam_day,paper_time,date_format(tentative_date,'%d-%m-%Y') as date,subject_name,paper_code,daysession,year_code,subject_no,duration,Course_Year_Master_Code FROM s24_timetable_subjects_course_all where paper_code=${code} and exam_dayw=${day} and paper_code!='' and block='N' ORDER BY FIELD(master_code,'G','E','C','D','B','A','S','R','M','N','O','T');`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
};

module.exports = examcenterwiseController;
