function StepCost(cost) {
    this.cost = cost;
}

StepCost.prototype.isCostMet = function() {
    return false;
}

StepCost.prototype.nextStep = function() {
    
}

module.exports = StepCost;
