var express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage,
localstorage = LocalStorage('./scratch');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {

  // Check if localstorage exists
  if (localstorage === null) {
    var storageMessage = "Local storage was not found, your data will not be stored";
  } else {
    var storageMessage = "Your data will be stored locally";
  }

  if (localstorage.getItem('dataExists')) {
    var tripsList = JSON.parse(localstorage.getItem('trips'));
    console.log(tripsList);
  }

  // Trips
  var trips;

  if (tripsList) {
    trips = tripsList;
  } else {
    trips = [];
  }

  res.render('dashboard', { title: 'Go Solo', storageMessage: storageMessage, trips: trips});
});

module.exports = router;