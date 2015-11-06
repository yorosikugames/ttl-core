define(["require", "exports"], function (require, exports) {
    var DeltaFactory = (function () {
        function DeltaFactory() {
        }
        DeltaFactory.prototype.createStepDelta = function (step_num) {
            var delta = new Object();
            delta['type'] = 'step';
            delta['step_num'] = step_num;
            return delta;
        };
        DeltaFactory.prototype.createSpawnDelta = function (entity, spawnAction) {
            var delta = new Object();
            delta['type'] = 'spawn';
            delta['entity_id'] = entity.globalId;
            delta['x'] = spawnAction.x;
            delta['y'] = spawnAction.y;
            return delta;
        };
        DeltaFactory.prototype.createMoveDelta = function (entity, moveAction) {
            var delta = new Object();
            delta['type'] = 'move';
            delta['entity_id'] = entity.globalId;
            delta['dx'] = moveAction.dx;
            delta['dy'] = moveAction.dy;
            return delta;
        };
        return DeltaFactory;
    })();
    return DeltaFactory;
});
//# sourceMappingURL=DeltaFactory.js.map