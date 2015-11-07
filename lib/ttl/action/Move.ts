import core = require('../core');
import PositionComponent = require('../component/Position');


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

        var positionComponent = this.target.getComponent<PositionComponent>('position_component');
        positionComponent.pos.x += this.dx;
        positionComponent.pos.y += this.dy;

        return true;
    }
}

export = MoveAction;