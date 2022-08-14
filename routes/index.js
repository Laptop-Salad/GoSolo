var express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage,
localstorage = LocalStorage('./scratch');
var router = express.Router();

if (localstorage === null) { 
  new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Go Solo'});
});

/* Get form data */
router.post('/new', function(req, res, next) {
  localstorage.setItem('dataExists', true);

  const tripName = req.body.tripName;
  const tripNameArr = {'name' : tripName};

  // Add new trip name
  let trips = JSON.parse(localstorage.getItem('trips'));
  trips.push(tripNameArr);
  localstorage.setItem('trips', JSON.stringify(trips));

  // Add other fields
  localstorage.setItem(tripName+'country', req.body.country);
  localstorage.setItem(tripName+'city', req.body.city);
  localstorage.setItem(tripName+'hotelName', req.body.hotelName);
  localstorage.setItem(tripName+'hotelPrice', req.body.hotelPrice);
  localstorage.setItem(tripName+'nights', req.body.nights);
  localstorage.setItem(tripName+'food', req.body.food);
  localstorage.setItem(tripName+'spending', req.body.spending);
  localstorage.setItem(tripName+'emergency', req.body.emergency);
  localstorage.setItem(tripName+'travel', req.body.travel);
  localstorage.setItem(tripName+'notes', req.body.notes);

  res.redirect('/mydashboard');
});

module.exports = router;
