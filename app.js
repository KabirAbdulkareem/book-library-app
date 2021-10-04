var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
const uri =
  'mongodb+srv://kabir:wTQiA4ir3iTAlEnd@cluster0.bd9c3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('WEEEEEEE');
  } catch (error) {
    console.error.bind(console, 'MongoDB initial connection error:');
  }
};

connect()

let db = mongoose.connection;

db.on('error', (err) => {
  console.error.bind(console, 'Mongodb Error on connection error: ' + err);
});

db.once("open", function () {
  console.log("Connected successfully");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* 

mongoose.connect(uri, options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
});



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.bd9c3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/

module.exports = app;
