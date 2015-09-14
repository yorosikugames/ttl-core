function WorldMoveAction(dix, diy) {
    this.dix = dix;
    this.diy = diy;
    this.costs = [];
    this.done = false;
}

WorldMoveAction.prototype.appendCost = function(cost) {
    this.costs.push(cost);
}

WorldMoveAction.prototype.getCostCount = function() {
    return this.costs.length;
}

WorldMoveAction.prototype.execute = function(actor) {
    actor.setIx(actor.getIx() + this.dix);
    actor.setIy(actor.getIy() + this.diy);
    this.done = true;
}

WorldMoveAction.prototype.isCostMet = function() {
    for (var i = 0; i < this.costs.length; i++) {
        if (this.costs[i].isCostMet() == false) {
            return false;
        }
    }
    return true;
}

WorldMoveAction.prototype.isDone = function() {
    return this.done;
}

WorldMoveAction.prototype.canBeAchieved = function() {
    return true;
}

WorldMoveAction.prototype.nextStep = function() {
    for (var i = 0; i < this.costs; i++) {
        this.costs[i].nextStep();
    }
}

module.exports = WorldMoveAction;
