import core = require('../core');


class AIObjectiveComponent extends core.Component {

    objective: string;
    parameter: core.AIObjectiveParameter;

    constructor(objective: string, param: core.AIObjectiveParameter) {
        super('ai_objective');
        this.objective = objective;
        this.parameter = param;
    }
}

export = AIObjectiveComponent;