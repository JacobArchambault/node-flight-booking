// the app
import express from 'express';
var app = express();

app.use(express.urlencoded({ extended: true }));

import exphbs from 'express-handlebars';
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (_req, res) => res.render('welcome', { page_title: "welcome page" }));

app.get('/flights', (_req, res) => res.render('flightorder', {
   page_title: 'Pick a flight', flights: [
      { flight: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am" },
      { flight: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am" },
      { flight: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm" },
      { flight: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm" }
   ]
}));

app.post('/handleform', (req, res) => res.render('summary', {
   page_title: "summary", name: req.body.fullname, flightnumber: req.body.flightnumber, class: req.body.seating,
   inflightmeal: req.body.meal
}));

app.use((_req, res) => res.status(404).send("Sorry, no such page!"));

app.listen(3000, console.log('Flight App started on http://localhost:3000, press Ctrl-C to terminate.'));
