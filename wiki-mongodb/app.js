// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routesIndex = require('./routes/index');
var routesEntryViewer = require('./routes/entry_viewer');
var routesEntryList = require('./routes/entry_list');
var routesEntryEditor = require('./routes/entry_editor');
var routesEntryHistory = require('./routes/entry_history');
var routesUserHistory = require('./routes/users');
var routesCathegories = require('./routes/cathegories');
var routesUploader = require('./routes/uploader');

var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routesIndex);
app.use('/', routesEntryViewer);
app.use('/', routesEntryList);
app.use('/', routesEntryEditor);
app.use('/', routesCathegories);
app.use('/', routesUploader);
app.use('/', routesEntryHistory);
app.use('/', routesUserHistory);


// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost:27017/hjbello');
//mongoose.connect('mongodb://hjbello:3141592625@ds121494.mlab.com:21494/hjbello');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(req, res, next) {
    if (req.session.user == null){
// if user is not logged-in redirect back to login page //
        res.redirect('/');
    }   else{
        next();
    }
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
