'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var request = require('request');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.render('home');
});

app.post('/', function(req, res){
  var url = 'http://api.wunderground.com/api/467fe65116e04adf/conditions/q/' + req.body.zip + '.json';
  request(url, function(err, response, body){
    body = JSON.parse(body);
    var temp = body.current_observation.temp_f;
    var height = Math.round(temp) * 5;
    var color;
    if(temp <= 32){color = 'blue';}else 
    if(temp <= 70){color = 'green';}else 
    if(temp <= 80){color = 'yellow';}else 
    if(temp <= 95){color = 'orange';}else 
    if(temp > 95){color = 'red';}
   res.render('update', {temp:temp,height:height,color:color});
  });
});

var port = process.env.PORT;

app.listen(port, function(){
    console.log('Express is now listening on PORT',port);
});
