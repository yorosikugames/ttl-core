'use strict';
Math.seed = function(s) {
    return function() {
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
    };
};

Math.getRandomRange = function(seedFunc, min, max) {
    return seedFunc() * (max - min) + min;
}

Math.getIntRandomRange = function(seedFunc, min, max) {
    return Math.floor(Math.getRandomRange(seedFunc, min, max));
}

/*
module.exports = {
    getRandomRange: getRandomRange,
    getIntRandomRange: getIntRandomRange,
};
*/
