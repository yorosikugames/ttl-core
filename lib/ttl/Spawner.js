'use strict';

function Spawner() {
    this.world = undefined;
    this.team = undefined;
    this.hp = 100;
    this.age = 0;
    this.intentQueue = [];
    this.mods = [];
    this.ix = undefined;
    this.iy = undefined;
}

Spawner.prototype.setPrefab = function() {

}

Spawner.prototype.getEmptyCell = function() {
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

Spawner.prototype.nextStep = function() {
    var emptyCell = this.getEmptyCell();
    if (emptyCell) {
        var sa = new WorldSpawn(new Actor(), emptyCell.ix, emptyCell.iy);
        this.world.appendIntent(sa);
    }
}

Spawner.prototype.canSpawn = function() {
    return this.getEmptyCell() !== null;
}

Spawner.prototype.setWorld = Actor.prototype.setWorld;

Spawner.prototype.getIx = Actor.prototype.getIx;

Spawner.prototype.getIy = Actor.prototype.getIy;

Spawner.prototype.setIx = Actor.prototype.setIx;

Spawner.prototype.setIy = Actor.prototype.setIy;

module.exports = Spawner;
