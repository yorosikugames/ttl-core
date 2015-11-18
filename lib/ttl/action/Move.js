var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core', '../globals'], function (require, exports, core, globals) {
    var MoveAction = (function (_super) {
        __extends(MoveAction, _super);
        function MoveAction(preCost, postCost, target, dx, dy) {
            _super.call(this, 'move', preCost, postCost);
            this.target = target;
            this.dx = dx;
            this.dy = dy;
        }
        MoveAction.prototype.isValid = function (pos) {
            if ((0 <= pos.x && pos.x < globals.screenSize.width) &&
                (0 <= pos.y && pos.y < globals.screenSize.height)) {
                return true;
            }
            return false;
        };
        MoveAction.prototype.getNextPosition = function (pos) {
            return new core.Position(pos.x + this.dx, pos.y + this.dy);
        };
        MoveAction.prototype.doExecute = function () {
            var positionComponent = this.target.getComponent('position_component');
            var nextPos = this.getNextPosition(positionComponent.pos);
            if (this.isValid(nextPos)) {
                positionComponent.pos = nextPos;
                return true;
            }
            return false;
        };
        return MoveAction;
    })(core.Action);
    return MoveAction;
});
//# sourceMappingURL=Move.js.map