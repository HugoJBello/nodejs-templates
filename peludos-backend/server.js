const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
var registry = require('./routes/registry');


require('dotenv').load();

//Here we add the routes
app.use('/api/registry/', registry);

//We configure express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//We connect to the database
mongoose.Promise = require('bluebird');
mongoUrl = process.env['MONGODB_URL']
mongoose.connect(mongoUrl, { promiseLibrary: require('bluebird') })
    .then(() => console.log('Mongodb connection succesful'))
    .catch((err) => console.error(err));

//We start listening
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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

module.exports = app;