import core = require('../core');


class SpawnAction extends core.Action {

    target: core.Entity;
    x: number;
    y: number;

    constructor(preCost: core.ICost, postCost: core.ICost, target: core.Entity, x: number, y: number) {
        super('spawn', preCost, postCost);
        this.target = target;
        this.x = x;
        this.y = y;
    }

    protected doExecute(): boolean {
        return true;
    }
}

export = SpawnAction;