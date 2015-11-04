import interfaces = require('../core');


class HealthComponent extends interfaces.Component {

    hp: number;

    constructor(hp: number) {
        super('health');
        this.hp = hp;
    }
}

export = HealthComponent;