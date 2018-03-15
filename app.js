// require('./instanthello'); //best practice to not use .js
// var goodbye = require('./talk/goodbye'); //in order to get access to call the function, we need to require to goodbye.js file and assign it thru a variable - via the path to the goodbye file

// var talk = require('./talk'); //for require, if you have an index.js file inside of a folder, no need to specify the file name itself just the parent folder name
// var question = require('./talk/question');

// talk.intro();
// talk.hello("Candice");

// var answer = question.ask("What is the meaning of life?");
// console.log(answer);

// goodbye();

console.log("It works!"); //based on package.json dependencies scripts section -- from command line, entered npm start