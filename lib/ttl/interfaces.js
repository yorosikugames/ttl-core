var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var globalIDCounter = 0;
    var Base = (function () {
        function Base(name) {
            this.name = name;
            this.globalId = globalIDCounter++;
        }
        Base.prototype.print = function () {
            console.log(JSON.stringify(this, null, 4));
        };
        return Base;
    })();
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(name) {
            _super.call(this, 'entity_' + name);
            this.components = new Map();
        }
        Entity.prototype.addComponent = function (component) {
            if (this.components.has(component.globalId)) {
                return false;
            }
            this.components[component.globalId] = component;
            return true;
        };
        Entity.prototype.removeComponent = function (component) {
            return this.components.delete(component.globalId);
        };
        return Entity;
    })(Base);
    exports.Entity = Entity;
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(name) {
            _super.call(this, 'component_' + name);
        }
        return Component;
    })(Base);
    exports.Component = Component;
    var System = (function (_super) {
        __extends(System, _super);
        function System(name) {
            _super.call(this, 'system_' + name);
        }
        return System;
    })(Base);
    exports.System = System;
});
//# sourceMappingURL=interfaces.js.map