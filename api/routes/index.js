//require express and instantiate express router
//export router we've instantiated so we can access it from the app.js file
//redefine json route in app.js

var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

//define your route, then define your method, then define the function you want to run
// router.route('/json');

router.route('/hotels');
router.get(ctrlHotels.hotelsGetAll); //to map controller to a route
// router.get(function(req, res){ //GET method - now, with the controller we are replacing this inline function assigned to the GET method with a call to the controller function 
//     console.log("GET the json");
//     res.status(200);
//     res.json( {"jsonData" : true} );
// });

// router.post(function(req, res){ // POST method
//     console.log("POST the json route");
//     res.status(200);
//     res.json( {"jsonData" : "POST received"} );
// });

module.exports = router;