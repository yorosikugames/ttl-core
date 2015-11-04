var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, interfaces) {
    var SpawnAction = (function (_super) {
        __extends(SpawnAction, _super);
        function SpawnAction(preCost, postCost, target, x, y) {
            _super.call(this, 'spawn', preCost, postCost);
            this.target = target;
            this.x = x;
            this.y = y;
        }
        SpawnAction.prototype.doExecute = function () {
            return true;
        };
        return SpawnAction;
    })(interfaces.Action);
    return SpawnAction;
});
//# sourceMappingURL=Spawn.js.map