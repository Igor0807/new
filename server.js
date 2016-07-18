var express = require('express');
var open = require('open');
var path = require('path');

var app = express();
var port = 3000;



//Lets define a port we want to listen to
 
app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, './index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});