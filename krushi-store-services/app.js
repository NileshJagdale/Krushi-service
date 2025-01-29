'use strict';

var express = require('express'),
  cors = require('cors'),
  fileUpload = require('express-fileupload'),
  bodyParser = require('body-parser');

const app = express();

// CORS middleware
// const corsOptions = {
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], // Allow multiple origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true, // Allow cookies to be sent
//   optionsSuccessStatus: 204 // Some legacy browsers choke on 204
// };
// app.use(cors(corsOptions));

app.use(cors());
// app.use(fileUpload());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application." });
});

// Imports routes
var router = require('./app/routes/index.js');
router.init(app);
// require("./app/routes/index.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;