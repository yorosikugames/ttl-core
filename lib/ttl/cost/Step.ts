import interfaces = require('../core');


class StepCost implements interfaces.ICost {

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

    onStep(stepCount: number): void {
        this.processedStepCount += stepCount;
    }

    isCostMet(): boolean {
        return this.processedStepCount >= this.stepCount;
    }
}

export = StepCost;