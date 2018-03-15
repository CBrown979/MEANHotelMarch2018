//Not Asynchronous
var fs = require('fs'); //to work with filesystem in node, we must bring in a native node module called fs - using require

console.log("Going to get a file");
//we can then use a method on fs called readFileSync to read in a file from the file system
var file = fs.readFileSync('readFileSync.js');//we'll be reading in the current file we're working in, readFileSync.js
console.log("Got the file");

console.log("App continues...");