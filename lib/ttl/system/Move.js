var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../interfaces'], function (require, exports, interfaces) {
    var MoveSystem = (function (_super) {
        __extends(MoveSystem, _super);
        function MoveSystem() {
            _super.call(this, 'move');
        }
        MoveSystem.prototype.process = function (entityMap) {
            for (var entityId in entityMap.keys()) {
                var entity = entityMap.get(entityId);
                for (var componentId in entity.components.keys()) {
                    var component = entity.components.get(componentId);
                    if (component.name != "component_position")
                        continue;
                }
            }
        };
        return MoveSystem;
    })(interfaces.System);
    return MoveSystem;
});
//# sourceMappingURL=Move.js.map