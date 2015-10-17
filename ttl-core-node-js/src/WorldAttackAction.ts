import Actor = require("./Actor.ts");

class WorldAttackAction {

    target: Actor;
    attackPower: number;
    done: boolean;
    
    constructor(actor: Actor, attackPower: number) {
        this.target = actor;
        this.attackPower = attackPower;
        this.done = false;
    }

    public isDone() {
        return this.isDone;
    }

    public execute(actor: Actor) {
        this.target.applyDamage(actor, this.attackPower);
        this.done = true;
    }

}

export = WorldAttackAction;