'use strict';
function WorldAttackAction(target, attackPower) {
    this.target = target;
    this.attackPower = attackPower;
    this.done = false;
}

WorldAttackAction.prototype.isDone = function() {
    return this.done;
}

WorldAttackAction.prototype.execute = function(actor) {
    this.target.applyDamage(actor, this.attackPower);
    this.done = true;
}

module.exports = WorldAttackAction;
