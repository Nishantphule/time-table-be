const mysql = require("mysql");
const { TIMETABLE_ALL_COURSES, INSTITUTES } = require("../main_tbl_conf");

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
  console.log("Connected to Institutes database for institute Wise");
});

const institutewiseController = {
  institutesData: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${INSTITUTES}`,
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
  examsdays: async (req, res) => {
    institutesConnection.query(
      `select distinct(exam_dayw) from ${TIMETABLE_ALL_COURSES} WHERE exam_dayw!=0 order by exam_dayw;`,
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
  timetabledata: async (req, res) => {
    const { code, day, session } = req.params;
    institutesConnection.query(
      `SELECT tt.exam_dayw, date_format( tt.tentative_date, '%d-%m-%Y' ) AS date, tt.course_code, tt.year_code, tt.master_code, tt.daysession, tt.paper_code, tt.subject_name, tt.duration,tt.paper_time FROM ${TIMETABLE_ALL_COURSES} tt, inst_courses ic, courses1 c where tt.course_code = c.course_code and ic.inst_code=${code} AND c.course_id = ic.course_id and exam_dayw=${day} and daysession ='${session}' and paper_code!='' and tt.block='N' and tt.exam_dayw !='' and tt.daysession !=''
and tt.duration!='' and tt.paper_time!=''
ORDER BY tt.exam_day ASC,tt.paper_code,FIELD(tt.master_code,'G','E','C','D','B','A','S','R','M','N','O','T');`,
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

module.exports = institutewiseController;
