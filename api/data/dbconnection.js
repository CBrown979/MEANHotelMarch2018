
var MongoClient = require('mongodb').MongoClient;

var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null; //private variable to hold connection

var open = function(){ //function to eventually open the connection
    MongoClient.connect(dburl, function(err,db){
        if(err){
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open", db);
    });
    //set connection
};

var get = function(){ //function to get connection once it's created
    return _connection;
};

module.exports = {//expose the open and get methods
    open : open,
    get : get
};