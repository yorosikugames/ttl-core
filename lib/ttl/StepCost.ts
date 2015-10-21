
module ttl {
    
    export class StepCost {
        cost: number;
        remainCost: number;

        constructor(cost: number) {
            this.cost = cost;
            this.remainCost = cost;
        }

        isCostMet() {
            return this.remainCost <= 0;
        }

        nextStep() {
            this.remainCost--;
        }
    }
}
