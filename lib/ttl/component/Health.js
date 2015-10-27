var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../interfaces'], function (require, exports, interfaces) {
    var HealthComponent = (function (_super) {
        __extends(HealthComponent, _super);
        function HealthComponent(hp) {
            _super.call(this, 'health');
            this.hp = hp;
        }
        return HealthComponent;
    })(interfaces.Component);
    return HealthComponent;
});
//# sourceMappingURL=Health.js.map