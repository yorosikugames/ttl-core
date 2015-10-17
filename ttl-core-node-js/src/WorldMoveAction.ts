import Actor = require("./Actor.ts");
import World = require("./World.ts");
import Cell = require("./Cell.ts");

class WorldMoveAction {

    dix: number;
    diy: number;
    costs: Array<number>;
    done: boolean;
    interrupted: boolean;

    constructor(dix: number, diy: number) {
        if (dix == 0 && diy == 0) {
            throw new Error("Not a valid movement");
        }

        this.dix = dix;
        this.diy = diy;
        this.done = false;
        this.interrupted = false;
    }   
     
    public appendCost(cost: number) {
        this.costs.push(cost);
    }

    public getCostCount() {
        return this.costs.length;
    }

    public setInterrupted(flag: boolean) {
        this.interrupted = flag;
    }

    public isCostMet() {
        for (var i = 0; i < this.costs.length; i++) {
            if (this.costs[i].isCostMet() == false) {
                return false;
            }
        }
        return true;
    }

    public isDone() {
        return this.done;
    }

    public canBeAchieved() {
        if (this.interrupted == true) {
            return false;
        } else if (this.isDone()) {
            return true;
        } else {
            return undefined;
        }
    }
    
    public nextStep(actor: Actor) {
        for (var i = 0; i < this.costs.length; i++) {
            this.costs[i].nextStep();
        }
    }

    public execute(actor: Actor) {
        actor.move(this, this.dix, this.diy);
        /*
        if (actor.move(this.dix, this.diy) == false) {
            this.interrupted = true;
        }
        */
        this.done = true;
    }
}

export = WorldMoveAction;