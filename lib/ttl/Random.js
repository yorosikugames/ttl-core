Math.seed = function(s) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};

getRandomRange = function (seedFunc, min, max) {
    return seedFunc() * (max - min) + min;
}

getIntRandomRange = function (seedFunc, min, max) {
    return Math.floor(getRandomRange(seedFunc, min, max));
}

//module.exports = getRandomRange;
