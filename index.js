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

var items = [
  {size: "8 inch pizza", toppings: 'Mushrooms', price: '$9.50'},
  {size: "16 inch pizza", toppings: 'Mushrooms & Sausage', price: '$19.00'},
  {size: "12 inch pizza", toppings: 'Pepperoni', price: '$13.50'},
  {size: "20 inch pizza", toppings: 'Mushrooms, Sausage, Pepperoni', price: '$24.50'}
 ];

app.get('/', function(req, res) {
   res.render('welcome', {page_title: "welcome page", pizzas: items});
});

app.get('/orders', function(req, res) {      
   res.render('orderform', {page_title: 'order page'});   
});

app.post('/handleform', function(req, res) {    // handle a post request
	var reqBody = req.body;
   console.log(reqBody);         // print form data to console for troubleshooting
   var name = req.body.fullname;  // retrieve name=value pairs from the html form
   var addr = req.body.address;
   var size = req.body.size;
   var numberOfToppings = 0;
   var toppings = req.body.toppings;  // might or mignt not be an array of toppings
   
   if(Array.isArray(toppings)) {    // we have an array of toppings
       numberOfToppings = toppings.length
	   var toppings = toppings.join(", ") + ', add $' + numberOfToppings * 1.22;  // convert array to string
   }
   else if(toppings){             // topping is defined, but as a single string value
       numberOfToppings = 1;
	   toppings += ", add $1.22";
   }
	   
   var method = req.body.deliver;
   
   var price = '$' + (parseInt(size) + numberOfToppings * 1.22).toFixed(2);  // calculat total price
   
   order_summary = {page_title: "summary", name: name, address: addr, diameter: size, 
                toppings: toppings, delivery: method, price: price}
   res.render('summary', order_summary);
});


app.use(function (req, res) {
  res.status(404).send("Sorry, no such page!")
});

app.listen(3000,  function () {
   console.log('Pizza App started on http://localhost:3000, press Ctrl-C to terminate.' );
});
