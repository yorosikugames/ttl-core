'use strict';

function Spawner() {

}

Spawner.prototype.setPrefab = function() {

}

Spawner.prototype.nextStep = function() {

}

Spawner.prototype.canSpawn = function() {
    return true;
}

Spawner.prototype.setWorld = Actor.prototype.setWorld;

Spawner.prototype.getIx = Actor.prototype.getIx;

Spawner.prototype.getIy = Actor.prototype.getIy;

Spawner.prototype.setIx = Actor.prototype.setIx;

Spawner.prototype.setIy = Actor.prototype.setIy;

module.exports = Spawner;
