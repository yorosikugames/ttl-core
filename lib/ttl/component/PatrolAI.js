var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core'], function (require, exports, core) {
    var PatrolAIComponent = (function (_super) {
        __extends(PatrolAIComponent, _super);
        function PatrolAIComponent(patrolPositions) {
            _super.call(this, 'patrolAI');
            this.patrolPositions = patrolPositions;
            this.patrolIndex = 0;
        }
        return PatrolAIComponent;
    })(core.Component);
    return PatrolAIComponent;
});
//# sourceMappingURL=PatrolAI.js.map