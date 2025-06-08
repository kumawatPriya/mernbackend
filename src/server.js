//mongodb 
require("./config/db");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const routes = require("./routes");
const server = express();


//cors
const corsOptions = {
    origin: "*"
}
server.use(cors(corsOptions));

// For accepting post form data
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())



// server.use(routes);


module.exports = server;

