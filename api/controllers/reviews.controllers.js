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