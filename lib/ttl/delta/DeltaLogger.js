define(["require", "exports"], function (require, exports) {
    var DeltaLogger = (function () {
        function DeltaLogger() {
            this.deltaList = new Array();
        }
        DeltaLogger.prototype.enqueue = function (delta) {
            this.deltaList.push(delta);
        };
        DeltaLogger.prototype.toJSON = function () {
            var jsonArray = new Array();
            for (var delta in this.deltaList) {
                jsonArray.push(JSON.stringify(delta));
            }
            return jsonArray.join('\n');
        };
        return DeltaLogger;
    })();
    return DeltaLogger;
});
//# sourceMappingURL=DeltaLogger.js.map