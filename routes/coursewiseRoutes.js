const {
  getcoursecodes,
  getyearcodes,
  getmastercodes,
  dayquery,
  timetabledata,
} = require("../controllers/coursewiseController");

const coursewiseRouter = require("express").Router();

// inst_courses route to fetch data from MySQL
coursewiseRouter.get("/coursecode", getcoursecodes);

// inst_courses route to fetch data from MySQL
coursewiseRouter.get("/yearcode/:coursecode", getyearcodes);

// inst_courses route to fetch data from MySQL
coursewiseRouter.get("/mastercode/:coursecode/:yearcode", getmastercodes);

// day query route
coursewiseRouter.get("/dayquery/:coursecode/:yearcode/:mastercode", dayquery);

coursewiseRouter.get(
  "/timetable/:coursecode/:yearcode/:mastercode/:exam_dayw/:daysession",
  timetabledata
);

module.exports = coursewiseRouter;
