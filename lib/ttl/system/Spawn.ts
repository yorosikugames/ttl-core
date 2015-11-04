import core = require('../core');
import globals = require('../globals');
import PositionComponent = require('../component/Position');
import SpawnAction = require('../action/Spawn');


class SpawnSystem extends core.System {

    constructor() {
        super('spawn');
    }

    process(entityMap: Map<string, core.Entity>): void {

        for (var entityName in entityMap.keys()) {
            var entity = entityMap.get(entityName);

            for (var idx in entity.actionQueue) {
                var action = entity.actionQueue[idx];
                if (action.name != 'spawn_action') continue;
                if (action.execute()) {
                    core.globalDeltaLogger.enqueue(
                        core.globalDeltaFactory.createSpawnDelta(entity, <SpawnAction>action));
                }
            }
        }

    }
}

export = SpawnSystem;