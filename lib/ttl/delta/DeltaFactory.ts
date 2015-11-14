import core = require('../core');
import MoveAction = require('../action/Move');
import SpawnAction = require('../action/Spawn');
import HealthComponent = require('../component/Health');


class DeltaFactory {

    createStepDelta(step_num: number): Object {
        var delta = new Object();
        delta['type'] = 'step';
        delta['step_num'] = step_num;
        return delta;
    }

    createSpawnDelta(entity: core.Entity, spawnAction: SpawnAction): Object {
        var delta = new Object();
        delta['type'] = 'spawn';
        delta['entity_id'] = entity.globalId;
        delta['entity_name'] = entity.name;
        delta['x'] = spawnAction.pos.x;
        delta['y'] = spawnAction.pos.y;
        delta['dir'] = spawnAction.dir;

        var healthComponent = entity.getComponent<HealthComponent>("health_component");
        if (healthComponent != null) {
            delta['health'] = healthComponent.hp;
        }

        return delta;
    }

    createMoveDelta(entity: core.Entity, moveAction: MoveAction): Object {
        var delta = new Object();
        delta['type'] = 'move';
        delta['entity_id'] = entity.globalId;
        delta['dx'] = moveAction.dx;
        delta['dy'] = moveAction.dy;
        return delta;
    }
}

export = DeltaFactory;