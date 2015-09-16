function StepCost(cost) {
    this.cost = cost;
    this.remainCost = cost;
}

StepCost.prototype.isCostMet = function() {
    return this.remainCost <= 0;
}

StepCost.prototype.nextStep = function() {
    this.remainCost--;
}

module.exports = StepCost;
