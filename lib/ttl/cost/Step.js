define(["require", "exports"], function (require, exports) {
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
        StepCost.prototype.onStep = function () {
            this.processedStepCount++;
        };
        StepCost.prototype.isCostMet = function () {
            return this.processedStepCount >= this.stepCount;
        };
        return StepCost;
    })();
    return StepCost;
});
//# sourceMappingURL=Step.js.map