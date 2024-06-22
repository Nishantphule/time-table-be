const mysql = require("mysql");
const {
  TH_INPUT,
  TIMETABLE_ALL_COURSES,
  RAC_DC_DETAILS,
} = require("../main_tbl_conf");

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
  getexamcenters: async (req, res) => {
    institutesConnection.query(
      `SELECT distinct(exam_center) FROM ${RAC_DC_DETAILS}`,
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
  getPapercodes: async (req, res) => {
    const { centercode } = req.params;
    institutesConnection.query(
      `select paper_code from ${TH_INPUT} where center_code=${centercode} group by paper_code;`,
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
  getdayw: async (req, res) => {
    institutesConnection.query(
      `select distinct(exam_dayw) from ${TIMETABLE_ALL_COURSES} where exam_dayw!=0 order by exam_dayw`,
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
  getTimetable: async (req, res) => {
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

module.exports = examcenterwiseController;
