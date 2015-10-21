var ttl;
(function (ttl) {
    var StepCost = (function () {
        function StepCost(cost) {
            this.cost = cost;
            this.remainCost = cost;
        }
        StepCost.prototype.isCostMet = function () {
            return this.remainCost <= 0;
        };
        StepCost.prototype.nextStep = function () {
            this.remainCost--;
        };
        return StepCost;
    })();
    ttl.StepCost = StepCost;
})(ttl || (ttl = {}));
//# sourceMappingURL=StepCost.js.map