// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");

// //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// // Cors for cross origin allowance
const cors = require("cors");
// app.use(cors);
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log("Server running on localhost:", port);
});

// GET Method
app.get("/weather", (_, res) => {
  console.log("hello");
  res.send(projectData);
});

//POST Method
app.post("/weather", (req, res) => {
  console.log(req);
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.status(200).end();
  console.log(projectData);
});
