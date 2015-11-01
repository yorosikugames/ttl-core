var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../interfaces'], function (require, exports, interfaces) {
    var MoveAction = (function (_super) {
        __extends(MoveAction, _super);
        function MoveAction(preCost, postCost, dx, dy) {
            _super.call(this, 'move', preCost, postCost);
            this.dx = dx;
            this.dy = dy;
        }
        MoveAction.prototype.doExecute = function () {
            return false;
        };
        return MoveAction;
    })(interfaces.Action);
    return MoveAction;
});
//# sourceMappingURL=Move.js.map