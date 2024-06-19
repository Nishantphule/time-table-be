const {
  getPapercodes,
  getdayw,
  getTimetable,
} = require("../controllers/examcenterwiseController");

const examcenterRouter = require("express").Router();

// inst_courses route to fetch data from MySQL
examcenterRouter.get("/papercodes/:centercode", getPapercodes);

examcenterRouter.get("/examdays", getdayw);

examcenterRouter.get("/timetable/:day/:code", getTimetable);

module.exports = examcenterRouter;
