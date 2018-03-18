//this controller will run when the /api/hotels route is called and GET all hotels
//syntax: module.exports.functionName - assign a function that takes request & response objects
//works the same way as defining the functionality at the route, below is copied from '/hotels' in index.js
//Once route is defined, to use the controller instead of the inline function, we must:
//require the controllers file into the routes file (index.js), so it knows where the functions are & has access to the exported functions from the controllers.js file

var hotelData = require('../data/hotel-data.json'); //added before the first module.exports

module.exports.hotelsGetAll = function(req, res){
    console.log("GET the hotels");
    res.status(200);
    res.json( hotelData );
};


