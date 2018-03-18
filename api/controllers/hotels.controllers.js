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

module.exports.hotelsGetOne = function(req, res){
    var hotelId = req.params.hotelId; //Id will be on the request object; URL parameters are put into another object on the request object called params; and then our URL parameter will be in there (so we type hotelId);
    var thisHotel = hotelData[hotelId];//variable holds info about individual hotel, and uses the URL parameter as the location index on the hotelData array (which is the json object (an array itself))
    console.log("GET hotelId", hotelId);
    res.status(200);
    res.json( thisHotel ); //test localhost:3000/api/hotels/5, or 3, 1 to get individual hotel info
};
