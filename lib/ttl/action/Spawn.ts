import interfaces = require('../core');


class SpawnAction extends interfaces.Action {

    target: interfaces.Entity;
    x: number;
    y: number;

    constructor(preCost: interfaces.ICost, postCost: interfaces.ICost, target: interfaces.Entity, x: number, y: number) {
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