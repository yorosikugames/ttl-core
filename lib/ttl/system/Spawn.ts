import core = require('../core');
import globals = require('../globals');
import PositionComponent = require('../component/Position');
import SpawnAction = require('../action/Spawn');


class SpawnSystem extends core.System {

    constructor() {
        super('spawn');
    }

    process(entityMap: Map<string, core.Entity>): void {

        entityMap.forEach((entity, index) => {
            console.log(entity.actionQueue.length);
            for (var idx in entity.actionQueue) {
                var action = entity.actionQueue[idx];
                if (action.name != 'spawn_action') continue;
                if (action.execute()) {
                    console.log('exected in spawn system');
                    core.globalDeltaLogger.enqueue(
                        core.globalDeltaFactory.createSpawnDelta(entity, <SpawnAction>action));
                }

                if (action.isRemovable()) {
                    entity.actionQueue.splice(idx, 1);
                }
            }
        });

    }
}

export = SpawnSystem;