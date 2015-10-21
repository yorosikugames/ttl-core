module ttl {

    export class Spawner {

        world: any;
        team: any;
        hp: number;
        age: number;
        intentQueue: Array<any>;
        mods: Array<any>;
        ix: number;
        iy: number;

        constructor() {
            this.world = undefined;
            this.team = undefined;
            this.hp = 100;
            this.age = 0;
            this.intentQueue = new Array<any>();
            this.mods = new Array<any>();
            this.ix = undefined;
            this.iy = undefined;
        }

        setPrefab() {
        }

        getEmptyCell() {
            if (this.world.getCell(this.ix + 1, this.iy + 0).isEmpty()) {
                return {
                    ix: this.ix + 1,
                    iy: this.iy + 0,
                };
            } else if (this.world.getCell(this.ix + 0, this.iy + 1).isEmpty()) {
                return {
                    ix: this.ix + 0,
                    iy: this.iy + 1,
                };
            } else if (this.world.getCell(this.ix - 1, this.iy + 0).isEmpty()) {
                return {
                    ix: this.ix - 1,
                    iy: this.iy + 0,
                };
            } else if (this.world.getCell(this.ix + 0, this.iy - 1).isEmpty()) {
                return {
                    ix: this.ix + 0,
                    iy: this.iy - 1,
                };
            }
            return null;
        }

        nextStep() {
            var emptyCell = this.getEmptyCell();
            if (emptyCell) {
                var sa = new ttl.WorldSpawn(new ttl.Actor(), emptyCell.ix, emptyCell.iy);
                this.world.appendIntent(sa);
            }
        }

        canSpawn() {
            return this.getEmptyCell() !== null;
        }

        setWorld = ttl.Actor.prototype.setWorld;

        getIx = ttl.Actor.prototype.getIx;

        getIy = ttl.Actor.prototype.getIy;

        setIx = ttl.Actor.prototype.setIx;

        setIy = ttl.Actor.prototype.setIy;

        getSpawnId = ttl.Actor.prototype.getSpawnId;

    }
}
