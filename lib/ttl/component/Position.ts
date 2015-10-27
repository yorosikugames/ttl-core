import interfaces = require('../interfaces');


class PositionComponent extends interfaces.Component {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        super('position');
        this.x = x;
        this.y = y;
    }
}

export = PositionComponent;