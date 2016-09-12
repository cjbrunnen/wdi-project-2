const express    = require("express");
const morgan     = require("morgan");
const bodyParser = require("body-parser");
const cors       = require("cors");
const mongoose   = require('mongoose');
// const expressJWT = require('express-jwt');

const app        = express();
const router     = require('./config/routes');
const config     = require('./config/config');

mongoose.connect(config.db);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.listen(config.port, () => console.log(`coming in loud and clear on port: ${config.port}`));
