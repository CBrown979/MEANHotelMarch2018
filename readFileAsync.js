//Asynchronous Method using CallBacks is how we deal w/ Potentially Blocking I/O operations in Node - particularly with databases
var fs = require('fs'); //to work with filesystem in node, we must bring in a native node module called fs - using require

var onFileLoad = function(err, file){ //named callback used instead of anonymous function below - easier to test as cannot do unit testing on a callback function
    console.log("Got the file");
};

console.log("Going to get a file");
//below will get the file asynchronously w/ anonymous function & should not block the main process - so when we run it, the console logs will print in a different order
// fs.readFile('readFileSync.js', function(err, file){ //anonymous function - confusing for large programs
//     console.log("Got the file");
// });//we'll be reading in the current file we're working in, readFileSync.js

fs.readFile('readFileSync.js', onFileLoad);//makes code more readable - know exactly what is going to happen when file loads

console.log("App continues...");