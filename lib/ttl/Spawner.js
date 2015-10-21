var ttl;
(function (ttl) {
    var Spawner = (function () {
        function Spawner() {
            this.setWorld = ttl.Actor.prototype.setWorld;
            this.getIx = ttl.Actor.prototype.getIx;
            this.getIy = ttl.Actor.prototype.getIy;
            this.setIx = ttl.Actor.prototype.setIx;
            this.setIy = ttl.Actor.prototype.setIy;
            this.getSpawnId = ttl.Actor.prototype.getSpawnId;
            this.world = undefined;
            this.team = undefined;
            this.hp = 100;
            this.age = 0;
            this.intentQueue = new Array();
            this.mods = new Array();
            this.ix = undefined;
            this.iy = undefined;
        }
        Spawner.prototype.setPrefab = function () {
        };
        Spawner.prototype.getEmptyCell = function () {
            if (this.world.getCell(this.ix + 1, this.iy + 0).isEmpty()) {
                return {
                    ix: this.ix + 1,
                    iy: this.iy + 0,
                };
            }
            else if (this.world.getCell(this.ix + 0, this.iy + 1).isEmpty()) {
                return {
                    ix: this.ix + 0,
                    iy: this.iy + 1,
                };
            }
            else if (this.world.getCell(this.ix - 1, this.iy + 0).isEmpty()) {
                return {
                    ix: this.ix - 1,
                    iy: this.iy + 0,
                };
            }
            else if (this.world.getCell(this.ix + 0, this.iy - 1).isEmpty()) {
                return {
                    ix: this.ix + 0,
                    iy: this.iy - 1,
                };
            }
            return null;
        };
        Spawner.prototype.nextStep = function () {
            var emptyCell = this.getEmptyCell();
            if (emptyCell) {
                var sa = new ttl.WorldSpawn(new ttl.Actor(), emptyCell.ix, emptyCell.iy);
                this.world.appendIntent(sa);
            }
        };
        Spawner.prototype.canSpawn = function () {
            return this.getEmptyCell() !== null;
        };
        return Spawner;
    })();
    ttl.Spawner = Spawner;
})(ttl || (ttl = {}));
//# sourceMappingURL=Spawner.js.map