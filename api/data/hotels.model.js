var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0, 
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});

var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 0, 
        max: 5,
        default: 0
    },
    services: [String],
    description: String,
    photos: [String],
    currency: String,
    reviews: [reviewSchema],//nested documents in hotel-data.json file
    rooms: [roomSchema],//nested documents in hotel-data.json file
    location: {
        address: Number,
        //Always store order of coordinates: longitude (E/W), latitude (N/S)
        coordinates: {
            type: Number,
            index: '2dsphere'
        }
    }
});

mongoose.model('Hotel', hotelSchema);