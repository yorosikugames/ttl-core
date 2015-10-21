
module ttl {
    export class WorldAttackAction {

        target: Actor;
        attackPower: number;
        done: boolean;

        constructor(target: ttl.Actor, attackPower: number) {
            this.target = target;
            this.attackPower = attackPower;
            this.done = false;
        }

        isDone() {
            return this.done;
        }

        execute(actor: ttl.Actor) {
            this.target.applyDamage(actor, this.attackPower);
            this.done = true;
        }
    }
}
