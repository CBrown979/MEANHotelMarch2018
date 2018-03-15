//Computation Blockers is a process where the code takes long to execute and this can block the main process
//Example below - calculate a high fibonacci number

var recursive = function(n){
    if (n <= 2){
        return 1;
    }else {
        return recursive(n-1) + recursive(n-2);
    }
};

console.log(recursive(42));