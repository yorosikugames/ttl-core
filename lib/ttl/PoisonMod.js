var ttl;
(function (ttl) {
    var PoisonMod = (function () {
        function PoisonMod(damagePerStep, duration) {
            this.damagePerStep = damagePerStep;
            this.duration = duration;
            this.age = 0;
        }
        PoisonMod.prototype.execute = function (actor) {
            if (this.age < this.duration) {
                // 독 데미지는 스스로 입히는 것이다?
                actor.applyDamage(actor, this.damagePerStep);
            }
            this.age++;
            return this.age < this.duration;
        };
        return PoisonMod;
    })();
    ttl.PoisonMod = PoisonMod;
})(ttl || (ttl = {}));
//# sourceMappingURL=PoisonMod.js.map