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
var path = require('path');

var routes = require('./routes'); //to require the routes folder

app.set('port', process.env.PORT);

//IMPORTANT: runs in order they're put in the code; our middleware is above where we define the static path - if below, we would not get all the static files logged
//TIP: app.use('/css', function(req, res, next){ middleware will only put out to the console any requests where the path starts with /css 
app.use(function(req, res, next){ //this will run our middleware - takes 3 arguments
    console.log(req.method, req.url);//will show 2 properties of the request object - the requested method (GET, etc) and requested URL
    next();
});

// in public folder: this is where we will store all of our static resources
//after the port definition but before the root is defined, we define the static folder using the method app.use which introduces middleware
app.use(express.static(path.join(__dirname, 'public'))); //when express receives a request for a root: 1)it will check to see if that root is matched by any of the files within that public folder; if it finds a match, it will deliver that file directly to the browser without any need to add in any extra routes

// app.use('/public', express.static(path.join(__dirname, 'public')));
//within app.use, to define a subset of routes - example: public/index.html
//we need to specify the folder structure we want before we define the express static method
//when launched, express will look for static routes that start with /public

//to tell Express to use the routes - we'll set the app.use command below where we set the public folder to be a static path
app.use('/api', routes); //Express will look inside the routes file for any route (if only '/' is used)

// app.get('/', function(req, res){ //due to adding the app use method, we had to get rid of this current homepage route to ensure we are getting the index.html file from the above static approach
//     console.log("GET the homepage");
//     res.status(200);
//     // res.send("Express Yourself");
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/json', function(req, res){
//     console.log("GET the json");
//     res.status(200);
//     res.json( {"jsonData" : true}); 
// });


// //configure Express to return a file (delivered as is) to the Browser - instead of .send, use .sendFile method and pass it the path of the file you want to send
// app.get('/file', function(req, res){
//     console.log("GET the file");
//     res.status(200);
//     res.sendFile(path.join(__dirname, 'app.js')); //to find the path use method .join to join in a number of different arguments used to create the file path
//     //__dirname finds the current directory we are working in (finds the directory of the app.js file); pass in this file -- will return app.js to the browser when you request /file 
// });

// app.listen(3000); //listen for requests without app.set -- upgrade below
var server = app.listen(app.get('port'), function(){ //confirms app.listen has been called - the .listen method can accept a callback
    var port = server.address().port;
    // console.log('Magic happens on port ' + app.get('port')); -- ARCHIVED
    console.log("Magic happens on port " + port);
});

// console.log("Me first!"); // added to verify the listen method is asynchronous

//the app.listen method returns an object we can use to access various properties of the server - such as the port
//to do this, we need to assign the app.listen method to a variable (revised above upgraded app.listen)
