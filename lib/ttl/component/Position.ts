import core = require('../core');


class PositionComponent extends core.Component {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        super('position');
        this.x = x;
        this.y = y;
    }
}

export = PositionComponent;