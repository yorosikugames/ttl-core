import core = require('../core');


class PatrolAIComponent extends core.Component {

    patrolPositions: core.Position[];
    patrolIndex: number;

    constructor(patrolPositions: core.Position[]) {
        super('patrolAI');
        this.patrolPositions = patrolPositions;
        this.patrolIndex = 0;
    }
}

export = PatrolAIComponent;