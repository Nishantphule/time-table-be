// Import required modules
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const coursewiseRouter = require("./routes/coursewiseRoutes");
const institutewiseRouter = require("./routes/institutewiseRoutes");
const daywiseRouter = require("./routes/daywiseRoutes");
const papercodewiseRouter = require("./routes/papercodewiseRoutes");
const examcenterRouter = require("./routes/examcenterwiseRoutes");

// Create Express app
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("<h1><center>Welcome to Time Table backend</center></h1>");
});

app.use("/coursewise", coursewiseRouter);

app.use("/institutewise", institutewiseRouter);

app.use("/daywise", daywiseRouter);

app.use("/papercodewise", papercodewiseRouter);

app.use("/examcenterwise", examcenterRouter);

// Start the Express server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
