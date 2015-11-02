var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var interfaces = require('../interfaces');
var MoveSystem = (function (_super) {
    __extends(MoveSystem, _super);
    function MoveSystem() {
        _super.call(this, 'move');
    }
    MoveSystem.prototype.process = function (entityMap) {
        for (var entityName in entityMap.keys()) {
            var entity = entityMap.get(entityName);
            for (var componentName in entity.components.keys()) {
                var component = entity.components.get(componentName);
                if (component.name != "component_position")
                    continue;
            }
        }
    };
    return MoveSystem;
})(interfaces.System);
module.exports = MoveSystem;
//# sourceMappingURL=Move.js.map