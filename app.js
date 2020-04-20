var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');

var url = 'mongodb://localhost/proj-1';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://josephayo:ND5xr-wGptQARHw@proj-1-ys6nl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
	client.connect(err => {
	const collection = client.db("test").collection("devices");
  // perform actions on the collection object
	client.close();
});


// MongoClient.connect(url,(err,db)=>{
// 	console.log(`Database connected successfully`);
// 	db.close();
// });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
})); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// import routes
const index = require('./routes/index');
const api = require('./routes/api');

// set routes
app.use('/', index);
app.use('/api', api); // sample API Routes



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

app.listen(3000,function(){
	console.log(`app is listenig on port 3000`);
});


module.exports = MongoClient;
module.exports = app;