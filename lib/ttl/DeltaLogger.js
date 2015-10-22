var ttl;
(function (ttl) {
    var DeltaLogger = (function () {
        function DeltaLogger() {
            this.deltaList = new Array();
        }
        DeltaLogger.prototype.enqueue = function (delta) {
            this.deltaList.push(delta);
        };
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
        return DeltaLogger;
    })();
    ttl.DeltaLogger = DeltaLogger;
})(ttl || (ttl = {}));
//# sourceMappingURL=DeltaLogger.js.map