var StepCost = (function () {
    function StepCost() {
    }
    StepCost.prototype.isCostMet = function () {
        return this.remainCost <= 0;
    };
    StepCost.prototype.nextStep = function () {
        this.remainCost--;
    };
    return StepCost;
})();
module.exports = StepCost;
//# sourceMappingURL=StepCost.js.map