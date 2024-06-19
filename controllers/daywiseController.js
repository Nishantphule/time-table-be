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
  console.log("Connected to Institutes database for Daywise router");
});

const daywiseController = {
  getdayw: async (req, res) => {
    institutesConnection.query(
      `select distinct(exam_dayw) from s24_timetable_subjects_course_all where exam_dayw!=0 order by exam_dayw`,
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
  getAllTimetable: async (req, res) => {
    const { day, slot } = req.params;
    institutesConnection.query(
      `select exam_dayw,paper_code,daysession,subject_name,Course_Year_Master_Code,duration,paper_time,date_format( tt.tentative_date, '%d-%m-%Y' ) AS date from s24_timetable_subjects_course_all tt where exam_dayw =${day} and daysession='${slot}' and paper_code!='' and tt.duration!='' and tt.paper_time!='' and exam_dayw !='' and daysession !='' and block='N' ORDER BY paper_code,FIELD(master_code,'G','E','C','D','B','A','S','R','M','N','O','T');`,
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

module.exports = daywiseController;
