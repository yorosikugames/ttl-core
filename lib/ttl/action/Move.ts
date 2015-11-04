import core = require('../core');


class MoveAction extends core.Action {

    target: core.Entity;
    dx: number;
    dy: number;

    constructor(preCost: core.ICost, postCost: core.ICost, target: core.Entity, dx: number, dy: number) {
        super('move', preCost, postCost);
        this.target = target;
        this.dx = dx;
        this.dy = dy;
    }

    protected doExecute(): boolean {

        var moveComponent = this.target.components.get("move_component");

        return true;
    }
}

export = MoveAction;