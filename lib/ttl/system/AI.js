var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core', '../action/Move'], function (require, exports, core, MoveAction) {
    var AISystem = (function (_super) {
        __extends(AISystem, _super);
        function AISystem() {
            _super.call(this, 'ai');
        }
        AISystem.prototype.sign = function (value) {
            if (value > 0)
                return 1;
            if (value < 0)
                return -1;
            return 0;
        };
        AISystem.prototype.processPatrolAIComponent = function (entity, patrolAIComponent) {
            var positionComponent = entity.getComponent('position_component');
            if (positionComponent == null)
                return;
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
        };
        AISystem.prototype.process = function (entityMap) {
            var _this = this;
            entityMap.forEach(function (entity, edx) {
                entity.components.forEach(function (component, cdx) {
                    if (component.name == 'patrolAI_component') {
                        _this.processPatrolAIComponent(entity, component);
                    }
                });
            });
        };
        return AISystem;
    })(core.System);
    return AISystem;
});
//# sourceMappingURL=AI.js.map