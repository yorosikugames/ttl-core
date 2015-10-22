
module ttl {

    export class WorldMoveAction {
        dix: number;
        diy: number;
        costs: Array<any>;
        done: boolean;
        interrupted: boolean;

        constructor(dix: number, diy: number) {
            if (dix == 0 && diy == 0) {
                throw new Error("Not a valid movement");
            }
            this.dix = dix;
            this.diy = diy;
            this.costs = new Array<any>();
            this.done = false;
            this.interrupted = false;
        }

        appendCost(cost: number) {
            this.costs.push(cost);
        }

        getCostCount() {
            return this.costs.length;
        }

        execute(actor: ttl.Actor) {
            actor.move(this, this.dix, this.diy);
            /*
            if (actor.move(this.dix, this.diy) == false) {
                this.interrupted = true;
            }
            */
            this.done = true;
        }

        setInterrupted(b: boolean) {
            this.interrupted = b;
        }

        isCostMet() {
            for (var i = 0; i < this.costs.length; i++) {
                if (this.costs[i].isCostMet() == false) {
                    return false;
                }
            }
            return true;
        }

        isDone() {
            return this.done;
        }

        canBeAchieved() {
            if (this.interrupted == true) {
                return false;
            } else if (this.isDone()) {
                return true;
            } else {
                return undefined;
            }
        }

        nextStep(actor: ttl.Actor) {
            for (var i = 0; i < this.costs.length; i++) {
                this.costs[i].nextStep();
            }
        }
    }

}
