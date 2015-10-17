var WorldAttackAction = (function () {
    function WorldAttackAction(actor, attackPower) {
        this.target = actor;
        this.attackPower = attackPower;
        this.done = false;
    }
    WorldAttackAction.prototype.isDone = function () {
        return this.isDone;
    };
    WorldAttackAction.prototype.execute = function (actor) {
        this.target.applyDamage(actor, this.attackPower);
        this.done = true;
    };
    return WorldAttackAction;
})();
module.exports = WorldAttackAction;
//# sourceMappingURL=WorldAttackAction.js.map