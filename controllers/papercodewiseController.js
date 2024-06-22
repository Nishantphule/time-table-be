const mysql = require("mysql");
const { PAPER_CODES, TIMETABLE_ALL_COURSES } = require("../main_tbl_conf");

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
  console.log("Connected to Institutes database for Paper code router");
});

const papercodewiseController = {
  getpapercodes: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${PAPER_CODES}`,
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
  getexamdayw: async (req, res) => {
    const { papercode } = req.params;
    institutesConnection.query(
      `SELECT distinct(exam_dayw) as exam_dayw FROM ${TIMETABLE_ALL_COURSES} where paper_code=${papercode} and block='N' ORDER BY paper_code`,
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
    const { day, code } = req.params;
    institutesConnection.query(
      `SELECT exam_dayw,exam_day,paper_time,date_format(tentative_date,'%d-%m-%Y') as date,subject_name,paper_code,daysession,year_code,subject_no,duration,Course_Year_Master_Code FROM ${TIMETABLE_ALL_COURSES} where paper_code=${code} and exam_dayw=${day} and paper_code!='' and block='N' ORDER BY FIELD(master_code,'G','E','C','D','B','A','S','R','M','N','O','T');`,
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

module.exports = papercodewiseController;
