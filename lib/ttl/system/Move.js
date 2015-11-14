var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, core) {
    var MoveSystem = (function (_super) {
        __extends(MoveSystem, _super);
        function MoveSystem() {
            _super.call(this, 'move');
        }
        MoveSystem.prototype.process = function (entityMap) {
            entityMap.forEach(function (entity, edx) {
                entity.actionQueue.forEach(function (action, adx) {
                    if (action.name != 'move_action')
                        return;
                    if (action.execute()) {
                        core.globalDeltaLogger.enqueue(core.globalDeltaFactory.createMoveDelta(entity, action));
                    }
                    if (action.isRemovable()) {
                        entity.actionQueue.splice(adx, 1);
                    }
                });
            });
        };
        return MoveSystem;
    })(core.System);
    return MoveSystem;
});
//# sourceMappingURL=Move.js.map