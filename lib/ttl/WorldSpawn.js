'use strict';

function WorldSpawn(a, ix, iy) {
    this.actor = a;
    this.ix = ix;
    this.iy = iy;
    this.done = false;
}

WorldSpawn.prototype.isDone = function() {
    return this.done;
}

WorldSpawn.prototype.execute = function(world) {

    var c = world.getCell(this.ix, this.iy);
    if (c.isEmpty()) {
        c.place(this.actor);
        this.actor.setWorld(world);
        this.actor.setIx(this.ix);
        this.actor.setIy(this.iy);
        this.done = true;
    }
}

module.exports = WorldSpawn;
