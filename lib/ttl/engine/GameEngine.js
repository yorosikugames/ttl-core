var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core', '../system/AI', '../system/Spawn', '../system/Move'], function (require, exports, core, AISystem, SpawnSystem, MoveSystem) {
    var GameEngine = (function (_super) {
        __extends(GameEngine, _super);
        function GameEngine() {
            _super.call(this, 'engine');
            this.stepNumber = 1;
            this.systems = new Array();
            this.entityMap = new Map();
            // system register
            // AI > Spawn > Move
            this.systems.push(new AISystem());
            this.systems.push(new SpawnSystem());
            this.systems.push(new MoveSystem());
        }
        GameEngine.prototype.registerEntity = function (entity) {
            if (this.entityMap.has(entity.name)) {
                return false;
            }
            this.entityMap.set(entity.name, entity);
        };
        GameEngine.prototype.deregisterEntity = function (entity) {
            return this.entityMap.delete(entity.name);
        };
        GameEngine.prototype.onStep = function () {
            core.globalDeltaLogger.enqueue(core.globalDeltaFactory.createStepDelta(this.stepNumber));
            for (var idx in this.systems) {
                var system = this.systems[idx];
                system.process(this.entityMap);
            }
            this.stepNumber++;
        };
        return GameEngine;
    })(core.Base);
    return GameEngine;
});
//# sourceMappingURL=GameEngine.js.map