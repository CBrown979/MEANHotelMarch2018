//require express and instantiate express router
//export router we've instantiated so we can access it from the app.js file
//redefine json route in app.js

var express = require('express');
var router = express.Router();

//define your route, then define your method, then define the function you want to run
router.route('/json');
router.get(function(req, res){ //GET method
    console.log("GET the json");
    res.status(200);
    res.json( {"jsonData" : true} );
});
router.post(function(req, res){ // POST method
    console.log("POST the json route");
    res.status(200);
    res.json( {"jsonData" : "POST received"} );
});

module.exports = router;