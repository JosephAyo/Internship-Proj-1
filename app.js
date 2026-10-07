var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

	var indexRouter = require('./routes/index');
	var usersRouter = require('./routes/api');

var mongoose = require('mongoose');
var uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/proj-1';

mongoose.connect(uri).catch(function (err) {
  console.error('Database connection failed:', err.message);
});

var app = express();

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
})); 
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// import routes
// const index = require('./routes/index');
const api = require('./routes/api');

// set routes
// app.use('/', index);
app.use('/api',api); // sample API Routes

app.use(express.static('public'));
app.get('/',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'public','index.html'));
});

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

const port = process.env.PORT || 3000;
// app.listen(3000,function(){
// 	console.log(`app is listenig on port 3000`);
// });

app.listen(port,()=>{
	console.log(`app is listening on port ${port}`);
});


module.exports = app;
