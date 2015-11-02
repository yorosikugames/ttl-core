var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var interfaces = require('../interfaces');
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
})(interfaces.Action);
module.exports = MoveAction;
//# sourceMappingURL=Move.js.map