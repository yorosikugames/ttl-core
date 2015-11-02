var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var interfaces = require('../interfaces');
var PositionComponent = (function (_super) {
    __extends(PositionComponent, _super);
    function PositionComponent(x, y) {
        _super.call(this, 'position');
        this.x = x;
        this.y = y;
    }
    return PositionComponent;
})(interfaces.Component);
module.exports = PositionComponent;
//# sourceMappingURL=Position.js.map