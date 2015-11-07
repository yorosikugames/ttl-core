var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core', '../component/Position'], function (require, exports, core, PositionComponent) {
    var SpawnAction = (function (_super) {
        __extends(SpawnAction, _super);
        function SpawnAction(preCost, postCost, target, pos, dir) {
            _super.call(this, 'spawn', preCost, postCost);
            this.target = target;
            this.pos = pos;
            this.dir = dir;
        }
        SpawnAction.prototype.doExecute = function () {
            return this.target.addComponent(new PositionComponent(this.pos, this.dir));
        };
        return SpawnAction;
    })(core.Action);
    return SpawnAction;
});
//# sourceMappingURL=Spawn.js.map