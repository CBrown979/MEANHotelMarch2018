//this controller will run when the /api/hotels route is called and GET all hotels
//syntax: module.exports.functionName - assign a function that takes request & response objects
//works the same way as defining the functionality at the route, below is copied from '/hotels' in index.js
//Once route is defined, to use the controller instead of the inline function, we must:
//require the controllers file into the routes file (index.js), so it knows where the functions are & has access to the exported functions from the controllers.js file

//below to be replaced with Mongoose - Lecture28
// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json'); //added before the first module.exports

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    
    // A geoJSON point
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    
    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };
    
    Hotel.geoNear(point, geoOptions, function(err, results, stats){
        console.log("Geo results", results);
        console.log("Geo stats", stats);
        res.status(200);
        res.json( results );
    });
};

module.exports.hotelsGetAll = function(req, res){
    //for Lecture28, below has been removed as they are references to the native driver
    // var db = dbconn.get();
    // var collection = db.collection("hotels");
    
    // //set default values for offset and count - to slice hotelData array
    var offset = 0;
    var count = 5;
    
    // var returnData = hotelData.slice(offset, offset+count);//this line takes the hotelData array from the .json file and using the offset value as the starting point, and count value to get the end point of the slice; and returning that final value into a new variable called returnData
    
    // //now must extract the values from the req.query object; and check that those properties actually exist in the query object
    if (req.query && req.query.offset){//checks that query property exists on the request object - if yes, then checks if query property has its own property of offset - if both exist, we have an offset parameter from the queryString
        offset = parseInt(req.query.offset, 10);//takes the offset value of the queryString and sets it as being the offset value in our controller; and since queryString values are strings, must run through parseInt to make it a number
    }
    
    if (req.query && req.query.count){//checks that query property exists on the request object - if yes, then checks if query property has its own property of offset - if both exist, we have an offset parameter from the queryString
        count = parseInt(req.query.count, 10);//takes the offset value of the queryString and sets it as being the offset value in our controller; and since queryString values are strings, must run through parseInt to make it a number
    }
    
    Hotel.find();//find everything
    Hotel.skip(offset); //skip a certain number
    Hotel.limit(count);//limit it to a certain number
    Hotel.exec(function(err, hotels){//execute query
        console.log("Found hotels ", hotels.length);//callback will get returned hotels value
        res.json(hotels); //spit value out as json
    });
    
    //below has been replaced by above in Lecture 28
    // var docs = collection.find();
    // collection.find();
    // collection.skip(offset);//# of documents we will skip
    // collection.limit(count);//# of documents we want to return
    // collection.toArray(function(err, docs){
    //     console.log("Found hotels", docs);
    //     res.status(200);
    //     res.json(docs);
    // });
};

module.exports.hotelsGetOne = function(req, res){
    //for Lecture28, below has been removed as they are references to the native driver
    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    
    var hotelId = req.params.hotelId; //Id will be on the request object; URL parameters are put into another object on the request object called params; and then our URL parameter will be in there (so we type hotelId);
    // var thisHotel = hotelData[hotelId];//variable holds info about individual hotel, and uses the URL parameter as the location index on the hotelData array (which is the json object (an array itself))
    console.log("GET hotelId", hotelId);
    
    //The native driver below has been updated for Lecture 28, as Hotel is our model
    // collection.findOne({
    //     _id : ObjectId(hotelId)
    // }, function(err, doc){
    //     res.status(200);
    //     res.json( doc ); //test localhost:3000/api/hotels/5, or 3, 1 to get individual hotel info
    // })
    Hotel.findById(hotelId);
    Hotel.exec(function(err, doc){
        res.status(200);
        res.json( doc );
    });
    
};

//passing data from websites to servers
//Two Most Common: queryStrings for GET requests; and formBodies for POST requests
//To set up pagination (to not return everything), must set up a count of # of hotels to return at once; and then offset (the starting position)
//sample url: localhost:3000/api/hotels?offset=2&count=2
//queryStrings commonly used when forms have a GET method - that's how they send data to the server, they get all the form info and send same as queryStrings on the URL
//when a form is POSTed, the field is added to the body of the request
//unlike queryStrings, Express cannot notably deal with a posted form, body-parser middleware must be installed using npm (npm install --save body-parser), then require it in app.js

module.exports.hotelsAddOne = function(req, res){
  var db = dbconn.get();
  var collection = db.collection('hotels');
  var newHotel;
  console.log("POST new hotel");
  
  if(req.body && req.body.name && req.body.stars){
      newHotel = req.body;
      newHotel.stars = parseInt(req.body.stars, 10);
      collection.insertOne(newHotel, function(err, response){
          console.log(response);//related to operations, but info obtained is not really needed
          console.log(response.ops);//document that was created in property called ops on response object
          res.status(201);//created
          res.json(response.ops);
      });
    //   console.log(newHotel);
    //   console.log(req.body); //this is where the bodyParser middleware we've applied will put all the data that it parses out of the posted from
    //   res.json(req.body);
    //   res.json(newHotel);
  } else {
      console.log("Data missing from body");
      res.status(400);
      res.json({ message : "Required data missing from body"});
  }
  
};