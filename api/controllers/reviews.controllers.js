/* global id */

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//Two review controllers placeholders
//Get all reviews for a hotel
module.exports.reviewsGetAll = function(req, res){
    var hotelId = req.params.hotelId; //Id will be on the request object; URL parameters are put into another object on the request object called params; and then our URL parameter will be in there (so we type hotelId);
    console.log("GET hotelId", hotelId);
   
    Hotel.findById(hotelId);
    Hotel.select('reviews');
    Hotel.exec(function(err, doc){
        console.log("Returned doc", doc);
        res.status(200);
        res.json( doc.reviews );
    });
};

//Get a single review for a hotel
//Path is: /api/hotels/:hotelID/reviews/:reviewID - in browser localhost:3000/api et al
module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);
    
    Hotel.findById(hotelId);
    Hotel.select('reviews');
    Hotel.exec(function(err, hotel){
        console.log("Returned hotel", hotel);
        var review = hotel.reviews.id(reviewId);
        res.status(200);
        res.json( review );
    });
};

var _addReview = function(req, res, hotel){//function used to manage the saving of the review - hotel is the document in the database being referenced
    //this mongoose modeling instance maps directly to a single document in the database
    //subdocuments in mongo are objects held in an array - and the reviews array is a property of the hotel document that is being returned from our mongoose model instance
    //need to add a review to the reviews array & then save that hotel model instance
    //we need to push in new review data into that array
    hotel.reviews.push({
      name: req.body.name,
      rating: parseInt(req.body.rating, 10),
      review: req.body.review
    });
    //to save a subdocument, you must save the parent document - mongoose gives us a method called save, that runs on the model instance (lowercase hotel), not the whole model
    hotel.save(function(err, hotelUpdated){//save method accepts a callback with 2 parameters, error object & returned data object(which will be the hotel returned from mongoDB with new review added)
      if(err){
        res.status(500);
        res.json(err);
      } else {
        res.status(201);
        res.json(hotelUpdated.reviews.length-1);//to get the last review
      }
    
    });
};

module.exports.reviewsAddOne = function(req, res){//remember: sub-documents are accessed thru their parent documents -so to add a review as a subdocument, we must first find the hotel document
    var hotelId = req.params.hotelId; //Id will be on the request object; URL parameters are put into another object on the request object called params; and then our URL parameter will be in there (so we type hotelId);
    console.log('POST review to hotelId', id);

  Hotel
    .findById(id)
    .select('reviews')
    .exec(function(err, doc) {//we get a document back from mongoose when we ran our exec function
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("HotelId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      if (doc) {//if document exists, we'll call a new function that will send everything needed to add a review
        _addReview(req, res, doc);//passing document (received from above exec function) in to the model instance, which is a mapping between the document we're working with here, and the document in the database itself
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};