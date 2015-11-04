import interfaces = require('../core');


class MoveAction extends interfaces.Action {

    target: interfaces.Entity;
    dx: number;
    dy: number;

    constructor(preCost: interfaces.ICost, postCost: interfaces.ICost, target: interfaces.Entity, dx: number, dy: number) {
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