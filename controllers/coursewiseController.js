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
  console.log("Connected to Institutes database for course wise");
});

const coursewiseController = {
  getcoursecodes: (req, res) => {
    institutesConnection.query(
      "SELECT * FROM `courses1` ORDER BY `courses1`.`course_code` ASC",
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

  getyearcodes: (req, res) => {
    const course_code = req.params.coursecode;
    institutesConnection.query(
      `select distinct(year_code) from s24_timetable_subjects_course_all where course_code="${course_code}" order by year_code;`,
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

  getmastercodes: (req, res) => {
    const course_code = req.params.coursecode;
    const year_code = req.params.yearcode;
    institutesConnection.query(
      `select distinct(master_code) from s24_timetable_subjects_course_all where course_code="${course_code}" and year_code="${year_code}" order by year_code,master_code`,
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
  dayquery: (req, res) => {
    const course_code = req.params.coursecode;
    const year_code = req.params.yearcode;
    const master_code = req.params.mastercode;
    console.log(course_code, year_code, master_code);
    institutesConnection.query(
      `SELECT exam_dayw,daysession FROM s24_timetable_subjects_course_all where course_code='${course_code}' and year_code=${year_code} and master_code='${master_code}' and block='N' group by exam_dayw,daysession ORDER BY exam_dayw ASC,daysession DESC;`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        console.log(results, "hi from day query");
        res.json(results); // Return data as JSON
      }
    );
  },
  timetabledata: (req, res) => {
    const course_code = req.params.coursecode;
    const year_code = req.params.yearcode;
    const master_code = req.params.mastercode;
    const exam_dayw = req.params.exam_dayw;
    const daysession = req.params.daysession;
    console.log(
      course_code,
      year_code,
      master_code,
      exam_dayw,
      daysession,
      "hii"
    );
    institutesConnection.query(
      `SELECT exam_dayw,exam_day,paper_time,date_format(tentative_date,'%d-%m-%Y') as date,subject_name,paper_code,daysession,year_code,subject_no,duration FROM s24_timetable_subjects_course_all where course_code="${course_code}" and year_code=${year_code} and master_code="${master_code}" and exam_dayw=${exam_dayw} and daysession="${daysession}" and paper_code!='' and block='N'
		 and duration!='' and paper_time!='' and exam_dayw !='' and daysession !=''
		ORDER BY paper_code;`,
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

module.exports = coursewiseController;
