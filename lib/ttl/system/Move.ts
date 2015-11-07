import core = require('../core');
import globals = require('../globals');
import PositionComponent = require('../component/Position');
import MoveAction = require('../action/Move');


class MoveSystem extends core.System {

    constructor() {
        super('move');
    }

    process(entityMap: Map<string, core.Entity>): void {


        entityMap.forEach((entity, edx) => {
            entity.actionQueue.forEach((action, adx) => {
                if (action.name != 'move_action') return;
                if (action.execute()) {
                    core.globalDeltaLogger.enqueue(
                        core.globalDeltaFactory.createMoveDelta(entity, <MoveAction>action));
                }
            });
        });

    }
}

export = MoveSystem;