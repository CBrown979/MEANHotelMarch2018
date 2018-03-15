//We cant make this run asynchonously b/c it is not an I/O operation - and we don't want it to run in the main Node process b/c it is slowing it down

//Computational Non Blocking
//need to spawn (and call) a child process - to run another process to run another node command, that will run this function - and will not block the main node process
//to create a child process in node: we use another native node module called child process - require it, and assign it to variable so we can use a spawn method on it
var child_process = require('child_process'); //node module

console.log(1);

//re: the spawn method of the module, when we call it, we need to send it the command (of node) and some arguments (fibonacci file)
var newProcess = child_process.spawn('node', ['_fibonacci.js'], {
    stdio : 'inherit' //ensures the console.log of the child process will show in the command line of the main process when we run it
});

// require('./_fibonacci.js'); //no longer needed

console.log(2);