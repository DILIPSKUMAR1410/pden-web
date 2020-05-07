var express = require("express");
var expressWS = require("express-ws");
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const { setup } = require("radiks-server");

const app = express();

setup().then((RadiksController) => {
  app.use("/radiks", RadiksController);
});

expressWS(app);

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// e

module.exports = app;
