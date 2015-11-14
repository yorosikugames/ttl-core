var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, core) {
    var AIObjectiveComponent = (function (_super) {
        __extends(AIObjectiveComponent, _super);
        function AIObjectiveComponent(objective, param) {
            _super.call(this, 'ai_objective');
            this.objective = objective;
            this.parameter = param;
        }
        return AIObjectiveComponent;
    })(core.Component);
    return AIObjectiveComponent;
});
//# sourceMappingURL=AIObjective.js.map