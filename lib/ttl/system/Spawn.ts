import interfaces = require('../interfaces');
import globals = require('../globals');
import PositionComponent = require('../component/Position');
import SpawnAction = require('../action/Spawn');


class SpawnSystem extends interfaces.System {

    constructor() {
        super('spawn');
    }

    process(entityMap: Map<string, interfaces.Entity>): void {

        for (var entityName in entityMap.keys()) {
            var entity = entityMap.get(entityName);

            for (var idx in entity.actionQueue) {
                var action = entity.actionQueue[idx];
                if (action.name != 'spawn_action') continue;
                if (action.execute()) {
                    globals.globalDeltaLogger.enqueue(
                        globals.globalDeltaFactory.createSpawnDelta(entity, <SpawnAction>action));
                }
            }
        }

    }
}

export = SpawnSystem;