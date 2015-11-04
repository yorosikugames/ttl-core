var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, core) {
    var MoveAction = (function (_super) {
        __extends(MoveAction, _super);
        function MoveAction(preCost, postCost, target, dx, dy) {
            _super.call(this, 'move', preCost, postCost);
            this.target = target;
            this.dx = dx;
            this.dy = dy;
        }
        MoveAction.prototype.doExecute = function () {
            var moveComponent = this.target.components.get("move_component");
            return true;
        };
        return MoveAction;
    })(core.Action);
    return MoveAction;
});
//# sourceMappingURL=Move.js.map