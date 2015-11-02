var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var interfaces = require('../interfaces');
var AISystem = (function (_super) {
    __extends(AISystem, _super);
    function AISystem() {
        _super.call(this, 'ai');
    }
    AISystem.prototype.process = function (entityMap) {
        for (var entityName in entityMap.keys()) {
            var entity = entityMap.get(entityName);
            for (var componentName in entity.components.keys()) {
                var component = entity.components.get(componentName);
                if (component.name != "component_ai")
                    continue;
            }
        }
    };
    return AISystem;
})(interfaces.System);
module.exports = AISystem;
//# sourceMappingURL=AI.js.map