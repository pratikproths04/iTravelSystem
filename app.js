var express = require('express');
var app = express();

app.get('/search', function (req, res) {
  var location=req.param("location");
  console.log("location: "+location);
  res.send('Processed'+ location);
});

app.listen(3000, function () {
  console.log('iTravelSystem app listening on port 3000!')
});