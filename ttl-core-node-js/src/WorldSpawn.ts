import Actor = require("./Actor.ts");
import World = require("./World.ts");
import Cell = require("./Cell.ts");

class WorldSpawn {

    actor: Actor;
    ix: number;
    iy: number;
    done: boolean;
    
    constructor(actor: Actor, ix: number, iy: number) {
        this.actor = actor;
        this.ix = ix;
        this.iy = iy;
    }

    public isDone() {
        return this.isDone;
    }

    public execute(world: World) {

        var c = world.getCell(this.ix, this.iy);
        if (c.isEmpty()) {
            c.place(this.actor);
            this.actor.setWorld(world);
            this.actor.setIx(this.ix);
            this.actor.setIy(this.iy);
            this.done = true;

            world.enqueueBasic('spawn ' + this.actor.getSpawnId() + ' ' + this.ix + ' ' + this.iy);
        }
    }

}

export = WorldSpawn;