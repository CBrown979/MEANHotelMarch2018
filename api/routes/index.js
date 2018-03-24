//require express and instantiate express router
//export router we've instantiated so we can access it from the app.js file
//redefine json route in app.js

var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers.reviews.controllers.js');
//define your route, then define your method, then define the function you want to run
// router.route('/json');

router.route('/hotels');
router.get(ctrlHotels.hotelsGetAll); //to map controller to a route
// router.get(function(req, res){ //GET method - now, with the controller we are replacing this inline function assigned to the GET method with a call to the controller function 
//     console.log("GET the json");
//     res.status(200);
//     res.json( {"jsonData" : true} );
// });

router.route('/hotels/:hotelId');//to define parameters in express, use colon and parameter name - now Express will match any routes of URLs that come in with /api/hotels/somethingElse to this route; 
//and the hotelId is a parameter that controller can access - 1)create a controller to work with this route - define controller name
router.get(ctrlHotels.hotelsGetOne); //now create corresponding controller in hotels.controllers.js file

router.route('/hotels/new');
router.post(ctrlHotels.hotelsAddOne);

// router.post(function(req, res){ // POST method
//     console.log("POST the json route");
//     res.status(200);
//     res.json( {"jsonData" : "POST received"} );
// });

//Review routes to get a single hotel
//GET /api/hotels/12345/reviews
router.route('/hotels/:hotelId/reviews');
router.get(ctrlReviews.reviewsGetAll);

//GET /api/hotels/12345/reviews/54321
router.route('/hotels/:hotelId/reviews/:reviewId');
router.get(ctrlReviews.reviewsGetOne);


module.exports = router;