var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './delta/DeltaLogger', './delta/DeltaFactory'], function (require, exports, DeltaLogger, DeltaFactory) {
    exports.globalIDCounter = 0;
    exports.globalDeltaLogger = new DeltaLogger();
    exports.globalDeltaFactory = new DeltaFactory();
    var Direction = (function () {
        function Direction() {
        }
        Direction.EAST = 'EAST';
        Direction.WEST = 'WEST';
        Direction.SOUTH = 'SOUTH';
        Direction.NORTH = 'NORTH';
        return Direction;
    })();
    exports.Direction = Direction;
    var Position = (function () {
        function Position(x, y) {
            this.x = x;
            this.y = y;
        }
        return Position;
    })();
    exports.Position = Position;
    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    })();
    exports.Size = Size;
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
            this.name = name + '_action';
            this.preCost = preCost;
            this.postCost = postCost;
            this.executed = false;
        }
        Action.prototype.execute = function () {
            this.onStep();
            if (!this.preCostCheck() || this.executed) {
                return false;
            }
            this.executed = true;
            return this.doExecute();
        };
        Action.prototype.isRemovable = function () {
            return this.preCostCheck() && this.postCostCheck();
        };
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
        // 일단 StepCost는 여기서 처리하지만 나중에 다른 코스트가 들어온다면 따로 시스템을 빼야하지 않을까?
        Action.prototype.onStep = function () {
            if (this.executed == false) {
                if (this.preCost != null)
                    this.preCost.onStep();
            }
            else {
                if (this.postCost != null)
                    this.postCost.onStep();
            }
        };
        return Action;
    })();
    exports.Action = Action;
    var AIObjectiveParameter = (function () {
        function AIObjectiveParameter() {
            this.patrolIndex = -1;
            this.patrolPositions = [];
        }
        return AIObjectiveParameter;
    })();
    exports.AIObjectiveParameter = AIObjectiveParameter;
    var RNG = (function () {
        function RNG(seed) {
            this.seed = seed;
        }
        RNG.prototype.next = function (min, max) {
            max = max || 0;
            min = min || 0;
            this.seed = (this.seed * 9301 + 49297) % 233280;
            var rnd = this.seed / 233280;
            return min + rnd * (max - min);
        };
        // http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        RNG.prototype.nextInt = function (min, max) {
            return Math.round(this.next(min, max));
        };
        RNG.prototype.nextDouble = function () {
            return this.next(0, 1);
        };
        RNG.prototype.pick = function (collection) {
            return collection[this.nextInt(0, collection.length - 1)];
        };
        return RNG;
    })();
    exports.RNG = RNG;
});
//# sourceMappingURL=core.js.map