import interfaces = require('../interfaces');


class MoveAction extends interfaces.Action {

    dx: number;
    dy: number;

    constructor(preCost: interfaces.ICost, postCost: interfaces.ICost, dx: number, dy: number) {
        super('move', preCost, postCost);
        this.dx = dx;
        this.dy = dy;
    }

    doExecute(): boolean {
        return false;
    }
}

export = MoveAction;