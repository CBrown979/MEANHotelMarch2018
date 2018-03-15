// require('./instanthello'); //best practice to not use .js
// var goodbye = require('./talk/goodbye'); //in order to get access to call the function, we need to require to goodbye.js file and assign it thru a variable - via the path to the goodbye file

// var talk = require('./talk'); //for require, if you have an index.js file inside of a folder, no need to specify the file name itself just the parent folder name
// var question = require('./talk/question');

// talk.intro();
// talk.hello("Candice");

// var answer = question.ask("What is the meaning of life?");
// console.log(answer);

// goodbye();

// console.log("It works!"); //based on package.json dependencies scripts section -- from command line, entered npm start

//Express
var express = require('express');
var app = express(); //initialize in order to create an app

app.set('port', 3000);

// app.listen(3000); //listen for requests without set -- upgrade below
var server = app.listen(app.get('port'), function(){ //confirms app.listen has been called - the .listen method can accept a callback
    var port = server.address().port;
    // console.log('Magic happens on port ' + app.get('port')); -- ARCHIVED
    console.log("Magic happens on port" + port);
});

// console.log("Me first!"); // added to verify the listen method is asynchronous

//the app.listen method returns an object we can use to access various properties of the server - such as the port
//to do this, we need to assign the app.listen method to a variable (revised above upgraded app.listen)