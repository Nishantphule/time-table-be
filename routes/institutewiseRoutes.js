const {
  institutesData,
  examsdays,
  timetabledata,
} = require("../controllers/institutewiseController");

const institutewiseRouter = require("express").Router();

// inst_courses route to fetch data from MySQL
institutewiseRouter.get("/institutes", institutesData);
institutewiseRouter.get("/examdays", examsdays);
institutewiseRouter.get("/timetable/:code/:day/:session", timetabledata);

module.exports = institutewiseRouter;
