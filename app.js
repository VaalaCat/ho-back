var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var introductionRoute = require('./routes/introduction')
var applyRoute = require('./routes/apply')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: true, origin: '*' }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/introduction', introductionRoute);
app.use('/apply', applyRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(res.status(404).json({ code: '1', result: 'error' }));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	if (err.statusCode !== 404)
		res.status(err.statusCode || 500).json({ code: 1, result: 'error' + err.message })
});

app.options("/*", function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.send(200);
});

module.exports = app;
