import core = require('../core');


class PositionComponent extends core.Component {

    pos: core.Position;
    dir: core.Direction;

    constructor(pos: core.Position, dir: core.Direction) {
        super('position');
        this.pos = pos;
        this.dir = dir;
    }
}

export = PositionComponent;