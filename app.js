var express = require('express');
var app = express();
var Yelp = require('yelp');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

//error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

app.get('/search', function (req, res) {
	var place=req.param("name");
	console.log("place: "+place); 
	var yelp = new Yelp({
	  consumer_key: '',
	  consumer_secret: '',
	  token: '',
	  token_secret: '',
	});
	yelp.search({ term: 'tourism', location : place, radius_filter: '10000', limit: '5' })
	.then(function (data) {	
		var jsonParse1=JSON.parse(JSON.stringify(data));
		//console.log("data: "+data);
		//console.log("-------------------"+data.businesses[0]);
		var arr = [], i;
		for(i=0; i<data.businesses.length; i++){
			arr.push(data.businesses[i].name);
		}
		//console.log("DATA IN THE ARRAY: "+arr);
		res.send({status: "hello from server", "data":arr});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
