// the app
var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true })); 

var exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

app.use(express.static('public' ));

var schedule = [
   {flight: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am"},
   {flight: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am"},
   {flight: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm"},
   {flight: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm"}
   ];
app.get('/', function(req, res) {
   res.render('welcome', {page_title: "welcome page"});
});

app.get('/flights', function(req, res) {      
   res.render('flightorder', {page_title: 'Pick a flight', flights: schedule});   
});

app.post('/handleform', function(req, res) {    // handle a post request
	var reqBody = req.body;
   console.log(reqBody);         // print form data to console for troubleshooting
   var name = req.body.fullname;  // retrieve name=value pairs from the html form
   var addr = req.body.flightnumber;
   var seating = req.body.seating;
   var meal = req.body.meal;
   	   
      
   order_summary = {page_title: "summary", name: name, flightnumber: addr, class: seating, 
                inflightmeal: meal}
   res.render('summary', order_summary);
});


app.use(function (req, res) {
  res.status(404).send("Sorry, no such page!")
});

app.listen(3000,  function () {
   console.log('Flight App started on http://localhost:3000, press Ctrl-C to terminate.' );
});
