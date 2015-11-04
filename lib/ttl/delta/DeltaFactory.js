define(["require", "exports"], function (require, exports) {
    var DeltaFactory = (function () {
        function DeltaFactory() {
        }
        DeltaFactory.prototype.createStepDelta = function (step_num) {
            var delta = new Map();
            delta.set('type', 'step');
            delta.set('step_num', step_num);
            return delta;
        };
        DeltaFactory.prototype.createSpawnDelta = function (entity, spawnAction) {
            var delta = new Map();
            delta.set('type', 'spawn');
            delta.set('entity_id', entity.globalId);
            delta.set('x', spawnAction.x);
            delta.set('y', spawnAction.y);
            return delta;
        };
        DeltaFactory.prototype.createMoveDelta = function (entity, moveAction) {
            var delta = new Map();
            delta.set('type', 'move');
            delta.set('entity_id', entity.globalId);
            delta.set('dx', moveAction.dx);
            delta.set('dy', moveAction.dy);
            return delta;
        };
        return DeltaFactory;
    })();
    return DeltaFactory;
});
//# sourceMappingURL=DeltaFactory.js.map