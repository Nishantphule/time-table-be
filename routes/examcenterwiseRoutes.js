const examcenterRouter = require("express").Router();

// inst_courses route to fetch data from MySQL
examcenterRouter.get("/papercodes", getPapercodes);

module.exports = examcenterRouter;
