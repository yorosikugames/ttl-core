import core = require('../core');
import PositionComponent = require('../component/Position');


class SpawnAction extends core.Action {

    target: core.Entity;
    pos: core.Position;
    dir: core.Direction;

    constructor(preCost: core.ICost, postCost: core.ICost, target: core.Entity,
        pos: core.Position, dir: core.Direction) {
        super('spawn', preCost, postCost);
        this.target = target;
        this.pos = pos;
        this.dir = dir;
    }

    protected doExecute(): boolean {
        return this.target.addComponent(
            new PositionComponent(this.pos, this.dir));
    }
}

export = SpawnAction;