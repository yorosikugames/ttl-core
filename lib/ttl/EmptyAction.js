var ttl;
(function (ttl) {
    var EmptyAction = (function () {
        function EmptyAction() {
        }
        EmptyAction.prototype.execute = function (world) {
        };
        return EmptyAction;
    })();
    ttl.EmptyAction = EmptyAction;
})(ttl || (ttl = {}));
//# sourceMappingURL=EmptyAction.js.map