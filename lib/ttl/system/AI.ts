import core = require('../core');
import PatrolAIComponent = require('../component/PatrolAI');
import PositionComponent = require('../component/Position');
import MoveAction = require('../action/Move');
import StepCost = require('../cost/Step');


class AISystem extends core.System {

    constructor() {
        super('ai');
    }


    private sign(value: number) {
        if (value > 0) return 1;
        if (value < 0) return -1;
        return 0;
    }

    private processPatrolAIComponent(entity: core.Entity, patrolAIComponent: PatrolAIComponent): void {
        var positionComponent = entity.getComponent<PositionComponent>('position_component');
        if (positionComponent == null) return;

        var pIdx = patrolAIComponent.patrolIndex;
        var pPosArr = patrolAIComponent.patrolPositions;
        var patrolTarget = pPosArr[pIdx];

        // 목표 위치가 바뀌어야 하는가?
        if (patrolTarget.x == positionComponent.pos.x && patrolTarget.y == positionComponent.pos.y) {
            patrolAIComponent.patrolIndex++;
            patrolAIComponent.patrolIndex %= pPosArr.length;

            pIdx = patrolAIComponent.patrolIndex;
            pPosArr = patrolAIComponent.patrolPositions;
            patrolTarget = pPosArr[pIdx];
        }

        var dx = this.sign(patrolTarget.x - positionComponent.pos.x);
        var dy = this.sign(patrolTarget.y - positionComponent.pos.y);
        if (dx != 0) {
            // x 좌표가 만족될때까지 x로만 이동
            var moveAction = new MoveAction(null, null, entity, dx, 0);
            entity.actionQueue.push(moveAction);
        }
        else if (dy != 0) {
            // y 좌표가 만족될때까지 y로만 이동
            var moveAction = new MoveAction(null, null, entity, 0, dy);
            entity.actionQueue.push(moveAction);
        }

    }

    process(entityMap: Map<string, core.Entity>): void {

        entityMap.forEach((entity, edx) => {
            entity.components.forEach((component, cdx) => {
                if (component.name == 'patrolAI_component') {
                    this.processPatrolAIComponent(entity, <PatrolAIComponent>component);
                }
            });
        });

    }
}

export = AISystem;