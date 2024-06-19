const {
  getpapercodes,
  getAllTimetable,
  getexamdayw,
} = require("../controllers/papercodewiseController");

const papercodewiseRouter = require("express").Router();

// inst_courses route to fetch data from MySQL
papercodewiseRouter.get("/papercodes", getpapercodes);

papercodewiseRouter.get("/examday/:papercode", getexamdayw);

papercodewiseRouter.get("/alltimetable/:day/:code", getAllTimetable);

module.exports = papercodewiseRouter;
