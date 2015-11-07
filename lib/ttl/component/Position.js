var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, core) {
    var PositionComponent = (function (_super) {
        __extends(PositionComponent, _super);
        function PositionComponent(pos, dir) {
            _super.call(this, 'position');
            this.pos = pos;
            this.dir = dir;
        }
        return PositionComponent;
    })(core.Component);
    return PositionComponent;
});
//# sourceMappingURL=Position.js.map