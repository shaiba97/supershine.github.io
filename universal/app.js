var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models/db')
const cors = require('cors');


var configRouter = require('./routes/config');
var adminRouter = require('./routes/admin');
var visitorRouter = require('./routes/visitor');

var app = express();
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/config', configRouter);
app.use('/admin', adminRouter);
app.use('/visitor', visitorRouter);

module.exports = app;
