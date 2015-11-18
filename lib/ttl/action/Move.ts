import core = require('../core');
import globals = require('../globals');
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

    isValid(pos: core.Position): boolean {
        if ((0 <= pos.x && pos.x < globals.screenSize.width) &&
            (0 <= pos.y && pos.y < globals.screenSize.height)) {
            return true;
        }
        return false;
    }

    getNextPosition(pos: core.Position): core.Position {
        return new core.Position(pos.x + this.dx, pos.y + this.dy);
    }

    protected doExecute(): boolean {

        var positionComponent = this.target.getComponent<PositionComponent>('position_component');

        var nextPos = this.getNextPosition(positionComponent.pos);
        if (this.isValid(nextPos)) {
            positionComponent.pos = nextPos;
            return true
        }
        return false;
    }
}

export = MoveAction;