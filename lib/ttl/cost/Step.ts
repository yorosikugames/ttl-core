import core = require('../core');


class StepCost implements core.ICost {

    private stepCount: number;
    private processedStepCount: number;

    constructor(stepCount: number) {
        this.stepCount = stepCount;
        this.processedStepCount = 0;
    }

    getStepCost(): number {
        return this.stepCount;
    }

    getProcessedStepCost(): number {
        return this.processedStepCount;
    }

    onStep(): void {
        this.processedStepCount++;
    }

    isCostMet(): boolean {
        return this.processedStepCount >= this.stepCount;
    }
}

export = StepCost;