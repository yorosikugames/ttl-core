import core = require('../core');
import MoveAction = require('../action/Move');
import SpawnAction = require('../action/Spawn');


class DeltaFactory {

    createStepDelta(step_num: number): Map<string, any> {
        var delta = new Map<string, any>();
        delta.set('type', 'step');
        delta.set('step_num', step_num);
        return delta;
    }

    createSpawnDelta(entity: core.Entity, spawnAction: SpawnAction): Map<string, any> {
        var delta = new Map<string, any>();
        delta.set('type', 'spawn');
        delta.set('entity_id', entity.globalId);
        delta.set('x', spawnAction.x);
        delta.set('y', spawnAction.y);
        return delta;
    }

    createMoveDelta(entity: core.Entity, moveAction: MoveAction): Map<string, any> {
        var delta = new Map<string, any>();
        delta.set('type', 'move');
        delta.set('entity_id', entity.globalId);
        delta.set('dx', moveAction.dx);
        delta.set('dy', moveAction.dy);
        return delta;
    }
}

export = DeltaFactory;