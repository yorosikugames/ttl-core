
class StepCost {
    cost: number;
    remainCost: number;

    public isCostMet() {
        return this.remainCost <= 0;
    }

    public nextStep() {
        this.remainCost--;
    }
}

export = StepCost;