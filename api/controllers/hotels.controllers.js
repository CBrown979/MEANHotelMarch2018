/* global isNAN */

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
    var maxCount = 10;
    
    // var returnData = hotelData.slice(offset, offset+count);//this line takes the hotelData array from the .json file and using the offset value as the starting point, and count value to get the end point of the slice; and returning that final value into a new variable called returnData
    
    // //now must extract the values from the req.query object; and check that those properties actually exist in the query object
    if (req.query && req.query.offset){//checks that query property exists on the request object - if yes, then checks if query property has its own property of offset - if both exist, we have an offset parameter from the queryString
        offset = parseInt(req.query.offset, 10);//takes the offset value of the queryString and sets it as being the offset value in our controller; and since queryString values are strings, must run through parseInt to make it a number
    }
    
    if (req.query && req.query.count){//checks that query property exists on the request object - if yes, then checks if query property has its own property of offset - if both exist, we have an offset parameter from the queryString
        count = parseInt(req.query.count, 10);//takes the offset value of the queryString and sets it as being the offset value in our controller; and since queryString values are strings, must run through parseInt to make it a number
    }
    
    if (isNAN(offset) || isNAN(count)){
        res.status(400);
        res.json({
            "message": "If supplied in querystring count & offset should be numbers"
        });
        return;
    }
    
    if (count > maxCount){
        res.status(400);
        res.json({
            "message": "Count limit of " + maxCount + " exceeded"
        });
        return;
    }
    
    Hotel.find();//find everything
    Hotel.skip(offset); //skip a certain number
    Hotel.limit(count);//limit it to a certain number
    Hotel.exec(function(err, hotels){//execute query
        if(err){
            console.log("Error finding hotels");
            res.status(500);//internal server error
            res.json(err);
        } else{
            console.log("Found hotels ", hotels.length);//callback will get returned hotels value
            res.json(hotels); //spit value out as json
        }
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
        var response = {//refactor response so there are so many if/else statements
            status : 200,
            message : doc
        };
        if(err){
            console.log("Error finding hotel");
            res.status(500);//internal server error
            res.json(err);
        } else if(!doc){
            res.status(404);
            res.json({
                "message": "Hotel ID not found"
            });
        } 
        // else {
        //     res.status(200);
        //     res.json( doc );
        // }
        res.status(response.status);
        res.json(response.message);
    });
    
};

//passing data from websites to servers
//Two Most Common: queryStrings for GET requests; and formBodies for POST requests
//To set up pagination (to not return everything), must set up a count of # of hotels to return at once; and then offset (the starting position)
//sample url: localhost:3000/api/hotels?offset=2&count=2
//queryStrings commonly used when forms have a GET method - that's how they send data to the server, they get all the form info and send same as queryStrings on the URL
//when a form is POSTed, the field is added to the body of the request
//unlike queryStrings, Express cannot notably deal with a posted form, body-parser middleware must be installed using npm (npm install --save body-parser), then require it in app.js

var _splitArray = function(input) {//helper function to create an empty array - accepts input, returns output - if input exists and has some length, split it on a semicolon, otherwise return an empty array
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

//test create in POSTMAN - not working for me - in Udemy, use POST http://localhost:3000/api/hotels
module.exports.hotelsAddOne = function(req, res){
    Hotel.create({//start with model (Hotel), chain create method to it: accepts 2 parameters - object containing the data to be added to the database, and a callback function for when the operation is complete
          name : req.body.name,
          description : req.body.description,
          stars : parseInt(req.body.stars,10),
          services : _splitArray(req.body.services),
          photos : _splitArray(req.body.photos),
          currency : req.body.currency,
          location : {
            address : req.body.address,
            coordinates : [
                parseFloat(req.body.lng), 
                parseFloat(req.body.lat)
                ]
          }
    }, function(err, hotel){//error object and new document as returned from the database - called hotel because that's the object we're expecting to get back
        if(err){//this callback will run will create method is completed
            console.log("Error creating hotel");
            res.status(400);
            res.json(err);
        } else{
            console.log("Hotel created", hotel);
            res.status(201);//resource has been created
            res.json(hotel);
        }
    });

//in lecture32, the below was removed as it's from the native driver
//   var db = dbconn.get();
//   var collection = db.collection('hotels');
//   var newHotel;
//   console.log("POST new hotel");
  
//   if(req.body && req.body.name && req.body.stars){
//       newHotel = req.body;
//       newHotel.stars = parseInt(req.body.stars, 10);
//       collection.insertOne(newHotel, function(err, response){
//           console.log(response);//related to operations, but info obtained is not really needed
//           console.log(response.ops);//document that was created in property called ops on response object
//           res.status(201);//created
//           res.json(response.ops);
//       });
//     //   console.log(newHotel);
//     //   console.log(req.body); //this is where the bodyParser middleware we've applied will put all the data that it parses out of the posted from
//     //   res.json(req.body);
//     //   res.json(newHotel);
//   } else {
//       console.log("Data missing from body");
//       res.status(400);
//       res.json({ message : "Required data missing from body"});
//   }
};

module.exports.hotelsUpdateOne = function(req, res){
    var hotelId = req.params.hotelId; //Id will be on the request object; URL parameters are put into another object on the request object called params; and then our URL parameter will be in there (so we type hotelId);
    console.log("GET hotelId", hotelId);
    
    Hotel.findById(hotelId);
    Hotel.select("-reviews -rooms")//to exclude fields, use -fieldname
    Hotel.exec(function(err, doc){
        var response = {//refactor response so there are so many if/else statements
            status : 200,
            message : doc
        };
        if(err){
            console.log("Error finding hotel");
            res.status(500);//internal server error
            res.json(err);
        } else if(!doc){
            response.status = 404;
            response.message = {
                "message": "Hotel ID not found"
            };
        } 
        if(response.status != 200){
            res.status(response.status);
            res.json(response.message);
        } else {//update the data in the model instance
            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.stars = parseInt(req.body.stars,10);
            doc.services = _splitArray(req.body.services);
            doc.photos = _splitArray(req.body.photos);
            doc.currency = req.body.currency;
            doc.location = {
                address : req.body.address,
                coordinates : [
                    parseFloat(req.body.lng), 
                    parseFloat(req.body.lat)
                ]
              };
              
              doc.save(function(err, hotelUpdated){//saving the model instance
                  if(err){
                      res.status(500)
                      res.json(err);
                  } else {//put request should return a 204 response if successful
                      res.status(204)
                      res.json(); //send empty response if successful
                  }
              });
            }
    });
};

//REMINDER & TIPS: 
//subdocuments can only be accessed thru their parent document
//subdocuments cannot be saved by themselves, only the parent can be saved
//You can try combining parts of the code from finding a specific review, updating a hotel and creating a new review
//with bits of the code altogether, should be str8 frwd to create the controller for updating review
