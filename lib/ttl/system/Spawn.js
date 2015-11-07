var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, core) {
    var SpawnSystem = (function (_super) {
        __extends(SpawnSystem, _super);
        function SpawnSystem() {
            _super.call(this, 'spawn');
        }
        SpawnSystem.prototype.process = function (entityMap) {
            entityMap.forEach(function (entity, index) {
                for (var idx in entity.actionQueue) {
                    var action = entity.actionQueue[idx];
                    if (action.name != 'spawn_action')
                        continue;
                    if (action.execute()) {
                        core.globalDeltaLogger.enqueue(core.globalDeltaFactory.createSpawnDelta(entity, action));
                    }
                    if (action.isRemovable()) {
                        entity.actionQueue.splice(idx, 1);
                    }
                }
            });
        };
        return SpawnSystem;
    })(core.System);
    return SpawnSystem;
});
//# sourceMappingURL=Spawn.js.map