let express = require('express');
let router = express.Router();
let app = express();
let serverPort = 8080;
let indexRoute = require('./routes/index');
let apiRoute = require('./routes/api');

// main routes
app.use('/', indexRoute);
app.use('/api', apiRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error(`Not Found`);
    err.status = 404;
    next(err);
});

// setting up error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(`Houston, we have a problem! Error ${err.status}`);
});

app.use(express.static('dist'));
app.listen(serverPort, () => console.log(`Listening on port ${serverPort}!`));

module.exports = app;