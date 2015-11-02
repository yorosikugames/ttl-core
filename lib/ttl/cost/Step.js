var StepCost = (function () {
    function StepCost(stepCount) {
        this.stepCount = stepCount;
        this.processedStepCount = 0;
    }
    StepCost.prototype.getStepCost = function () {
        return this.stepCount;
    };
    StepCost.prototype.getProcessedStepCost = function () {
        return this.processedStepCount;
    };
    StepCost.prototype.onStep = function (stepCount) {
        this.processedStepCount += stepCount;
    };
    StepCost.prototype.isCostMet = function () {
        return this.processedStepCount >= this.stepCount;
    };
    return StepCost;
})();
module.exports = StepCost;
//# sourceMappingURL=Step.js.map