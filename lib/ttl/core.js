var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './delta/DeltaLogger', './delta/DeltaFactory'], function (require, exports, DeltaLogger, DeltaFactory) {
    exports.globalIDCounter = 0;
    exports.globalDeltaLogger = new DeltaLogger();
    exports.globalDeltaFactory = new DeltaFactory();
    var Base = (function () {
        function Base(name) {
            this.name = name;
            this.globalId = exports.globalIDCounter++;
        }
        Base.prototype.print = function () {
            console.log(JSON.stringify(this, null, 4));
        };
        return Base;
    })();
    exports.Base = Base;
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(name) {
            _super.call(this, name + '_entity');
            this.components = new Map();
            this.actionQueue = [];
        }
        Entity.prototype.addComponent = function (component) {
            if (this.components.has(component.name)) {
                return false;
            }
            this.components.set(component.name, component);
            return true;
        };
        Entity.prototype.getComponent = function (componentName) {
            if (this.components.has(componentName)) {
                return this.components.get(componentName);
            }
            return null;
        };
        Entity.prototype.removeComponent = function (component) {
            return this.components.delete(component.name);
        };
        return Entity;
    })(Base);
    exports.Entity = Entity;
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(name) {
            _super.call(this, name + '_component');
        }
        return Component;
    })(Base);
    exports.Component = Component;
    var System = (function (_super) {
        __extends(System, _super);
        function System(name) {
            _super.call(this, name + '_system');
        }
        return System;
    })(Base);
    exports.System = System;
    var Action = (function () {
        function Action(name, preCost, postCost) {
            this.name = name + '_cost';
            this.preCost = preCost;
            this.postCost = postCost;
        }
        Action.prototype.preCostCheck = function () {
            if (this.preCost == null) {
                return true;
            }
            return this.preCost.isCostMet();
        };
        Action.prototype.postCostCheck = function () {
            if (this.postCost == null) {
                return true;
            }
            return this.postCost.isCostMet();
        };
        Action.prototype.execute = function () {
            if (!this.preCost.isCostMet() || this.executed) {
                return false;
            }
            this.doExecute();
            this.executed = true;
            return true;
        };
        return Action;
    })();
    exports.Action = Action;
});
//# sourceMappingURL=core.js.map