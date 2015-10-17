var DeltaLogger = (function () {
    function DeltaLogger() {
    }
    DeltaLogger.prototype.pop = function () {
        if (this.deltaList.length > 0) {
            var r = this.deltaList[0];
            this.deltaList.splice(0, 1);
            return r;
        }
        else {
            return null;
        }
    };
    DeltaLogger.prototype.enqueue = function (delta) {
        this.deltaList.push(delta);
    };
    return DeltaLogger;
})();
module.exports = DeltaLogger;
//# sourceMappingURL=DeltaLogger.js.map