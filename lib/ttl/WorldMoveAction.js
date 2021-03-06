'use strict';
function WorldMoveAction(dix, diy) {
    if (dix == 0 && diy == 0) {
        throw new Error("Not a valid movement");
    }
    this.dix = dix;
    this.diy = diy;
    this.costs = [];
    this.done = false;
    this.interrupted = false;
}

WorldMoveAction.prototype.appendCost = function(cost) {
    this.costs.push(cost);
}

WorldMoveAction.prototype.getCostCount = function() {
    return this.costs.length;
}

WorldMoveAction.prototype.execute = function(actor) {
    actor.move(this, this.dix, this.diy);
    /*
    if (actor.move(this.dix, this.diy) == false) {
        this.interrupted = true;
    }
    */
    this.done = true;
}

WorldMoveAction.prototype.setInterrupted = function(b) {
    this.interrupted = b;
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
    if (this.interrupted == true) {
        return false;
    } else if (this.isDone()) {
        return true;
    } else {
        return undefined;
    }
}

WorldMoveAction.prototype.nextStep = function(actor) {
    for (var i = 0; i < this.costs.length; i++) {
        this.costs[i].nextStep();
    }
}

module.exports = WorldMoveAction;
