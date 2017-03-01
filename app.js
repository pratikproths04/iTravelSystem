var express = require('express');
var app = express();
var Yelp = require('yelp');

app.get('/search', function (req, res) {
	var place=req.param("name");
	console.log("place: "+place); 
	var yelp = new Yelp({
	  consumer_key: '6qSzExrzRp8VLcup-She5A',
	  consumer_secret: 'h3t8vZyydkeEHg9kaefKhP46nWY',
	  token: 'geCWnAkZMYFWFR4gVYM-mFYg3Bq-_sR6',
	  token_secret: 'wXcRTdTwVO7IQnAZMr_8BQNQQeQ',
	});
	yelp.search({ term: 'tourism', location : place, radius_filter: '10000', limit: '5' })
	.then(function (data) {
	  var jsonParse1=JSON.parse(JSON.stringify(data));
	  console.log("-------------------"+data.businesses[0].name);
	  res.send({status: "hello from server", "data":data.businesses[0].name});  
	});
});

app.listen(3000, function () {
  console.log('iTravelSystem app listening on port 3000!')
});