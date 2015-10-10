'use strict';

function DeltaLogger() {
    this.deltaList = [];
}

DeltaLogger.prototype.pop = function() {
    if (this.deltaList.length > 0) {
        var r = this.deltaList[0];
        this.deltaList.splice(0, 1);
        return r;
    } else {
        return null;
    }
}

DeltaLogger.prototype.enqueue = function(delta) {
    this.deltaList.push(delta);
}

module.exports = DeltaLogger;
