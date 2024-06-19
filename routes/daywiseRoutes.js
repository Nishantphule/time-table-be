const {
  getdayw,
  getAllTimetable,
} = require("../controllers/daywiseController");

const daywiseRouter = require("express").Router();

// inst_courses route to fetch data from MySQL
daywiseRouter.get("/examdays", getdayw);

daywiseRouter.get("/alltimetable/:day/:slot", getAllTimetable);

module.exports = daywiseRouter;
