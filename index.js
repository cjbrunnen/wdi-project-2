const express    = require("express");
const morgan     = require("morgan");
const bodyParser = require("body-parser");
const cors       = require("cors");
const mongoose   = require('mongoose');
const expressJWT = require('express-jwt');

const app        = express();
const routes     = require('./config/routes');
const webRoutes  = require('./config/webRoutes');
const config     = require('./config/config');
const User       = require('./models/user');

mongoose.connect(config.db);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", expressJWT({ secret: config.secret })
  .unless({
    path: [
      { url: "/api/login", methods: ["POST"] },
      { url: "/api/register", methods: ["POST"] }
    ]
  })
);
app.use("/", webRoutes);
app.use("/api", routes);

app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== "UnauthorizedError") return next();
  return res.status(401).json({ message: "request unauthorised!" });
}

app.listen(config.port, () => console.log(`coming in loud and clear on port: ${config.port}`));

module.exports = app;
