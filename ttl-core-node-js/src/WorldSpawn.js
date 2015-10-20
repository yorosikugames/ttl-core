var World = require("./World.ts");
var WorldSpawn = (function () {
    function WorldSpawn(actor, ix, iy) {
        this.actor = actor;
        this.ix = ix;
        this.iy = iy;
    }
    WorldSpawn.prototype.isDone = function () {
        return this.isDone;
    };
    WorldSpawn.prototype.validate = function () {
    };
    //public execute(world: World) {
    WorldSpawn.prototype.execute = function (entity) {
        var world = (World), entity;
        var c = world.getCell(this.ix, this.iy);
        if (c.isEmpty()) {
            c.place(this.actor);
            this.actor.setWorld(world);
            this.actor.setIx(this.ix);
            this.actor.setIy(this.iy);
            this.done = true;
            world.enqueueBasic('spawn ' + this.actor.getSpawnId() + ' ' + this.ix + ' ' + this.iy);
        }
    };
    return WorldSpawn;
})();
module.exports = WorldSpawn;
//# sourceMappingURL=WorldSpawn.js.map