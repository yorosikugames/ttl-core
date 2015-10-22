module ttl {

    export class WorldSpawn {

        actor: any;
        ix: any;
        iy: any;
        done: boolean;

        constructor(a: any, ix: any, iy: any) {
            this.actor = a;
            this.ix = ix;
            this.iy = iy;
            this.done = false;
        }

        isDone() {
            return this.done;
        }

        execute(world: any) {

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
}