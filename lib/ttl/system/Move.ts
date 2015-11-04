import core = require('../core');
import globals = require('../globals');
import PositionComponent = require('../component/Position');
import MoveAction = require('../action/Move');


class MoveSystem extends core.System {

    constructor() {
        super('move');
    }

    process(entityMap: Map<string, core.Entity>): void {

        for (var entityName in entityMap.keys()) {
            var entity = entityMap.get(entityName);

            for (var idx in entity.actionQueue) {
                var action = entity.actionQueue[idx];
                if (action.name != 'move_action') continue;
                if (action.execute()) {
                    core.globalDeltaLogger.enqueue(
                        core.globalDeltaFactory.createMoveDelta(entity, <MoveAction>action));
                }
            }
        }

    }
}

export = MoveSystem;