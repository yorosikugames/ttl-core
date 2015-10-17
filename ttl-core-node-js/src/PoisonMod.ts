import Actor = require("./Actor.ts");
import World = require("./World.ts");
import Cell = require("./Cell.ts");

class PoisonMod {

    damagePerStep: number;
    duration: number;
    age: number;

    constructor(damagePerStep: number, duration: number) {
        this.damagePerStep = damagePerStep;
        this.duration = duration;
    }   
     
    public execute(actor: Actor) {
        if (this.age < this.duration) {
            // 독 데미지는 스스로 입히는 것이다?
            actor.applyDamage(actor, this.damagePerStep);
        }
        this.age++;
        return this.age < this.duration;
    }

}

export = PoisonMod;