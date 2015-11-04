import core = require('../core');


class HealthComponent extends core.Component {

    hp: number;

    constructor(hp: number) {
        super('health');
        this.hp = hp;
    }
}

export = HealthComponent;