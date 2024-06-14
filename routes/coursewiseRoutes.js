const { getcoursenames, getcoursecodes, getyearcodes, getmastercodes, dayquery } = require("../controllers/coursewiseController");

const coursewiseRouter = require("express").Router()

// inst_courses route to fetch data from MySQL
coursewiseRouter.get('/coursecode', getcoursecodes);

// inst_courses route to fetch data from MySQL
coursewiseRouter.get('/yearcode/:coursecode', getyearcodes);

// inst_courses route to fetch data from MySQL
coursewiseRouter.get('/mastercode/:coursecode/:yearcode', getmastercodes);

// day query route
coursewiseRouter.get('/dayquery/:coursecode/:yearcode/:mastercode',dayquery);

module.exports = coursewiseRouter;