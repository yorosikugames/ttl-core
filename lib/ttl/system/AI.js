var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core', '../globals', '../action/Move', '../cost/Step'], function (require, exports, core, globals, MoveAction, StepCost) {
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
        AISystem.prototype.processAIObjectiveComponent = function (entity, aiObjectiveComponent) {
            var objective = aiObjectiveComponent.objective;
            var param = aiObjectiveComponent.parameter;
            if (objective == 'patrol') {
                var positionComponent = entity.getComponent('position_component');
                if (positionComponent == null)
                    return;
                var pIdx = param.patrolIndex;
                var posArr = param.patrolPositions;
                var patrolTarget = posArr[pIdx];
                // 목표 위치가 바뀌어야 하는가?
                if (patrolTarget.x == positionComponent.pos.x && patrolTarget.y == positionComponent.pos.y) {
                    param.patrolIndex++;
                    param.patrolIndex %= posArr.length;
                    pIdx = param.patrolIndex;
                    patrolTarget = posArr[pIdx];
                }
                // action queue에 move가 있으면 아무것도 안함
                var pushMoveAction = true;
                for (var idx in entity.actionQueue) {
                    var action = entity.actionQueue[idx];
                    if (action.name == 'move_action') {
                        pushMoveAction = false;
                        break;
                    }
                }
                if (pushMoveAction == false) {
                    return;
                }
                var moveActionArr = new Array();
                var dx = this.sign(patrolTarget.x - positionComponent.pos.x);
                if (dx != 0) {
                    // x 좌표가 만족될때까지 x로만 이동
                    var preMoveCost = new StepCost(3);
                    var postMoveCost = new StepCost(3);
                    var moveAction = new MoveAction(preMoveCost, postMoveCost, entity, dx, 0);
                    moveActionArr.push(moveAction);
                }
                var dy = this.sign(patrolTarget.y - positionComponent.pos.y);
                if (dy != 0) {
                    // y 좌표가 만족될때까지 y로만 이동
                    var preMoveCost = new StepCost(3);
                    var postMoveCost = new StepCost(3);
                    var moveAction = new MoveAction(preMoveCost, postMoveCost, entity, 0, dy);
                    moveActionArr.push(moveAction);
                }
                entity.actionQueue.push(globals.randomNumberGenerator.pick(moveActionArr));
            }
        };
        AISystem.prototype.process = function (entityMap) {
            var _this = this;
            entityMap.forEach(function (entity, edx) {
                entity.components.forEach(function (component, cdx) {
                    if (component.name == 'ai_objective_component') {
                        _this.processAIObjectiveComponent(entity, component);
                    }
                });
            });
        };
        return AISystem;
    })(core.System);
    return AISystem;
});
//# sourceMappingURL=AI.js.map