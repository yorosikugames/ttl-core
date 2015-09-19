'use strict';

function Actor() {
    this.world = undefined;
    this.team = undefined;
    this.hp = 100;
    this.age = 0;
    this.intentQueue = [];
    this.mods = [];
    this.ix = undefined;
    this.iy = undefined;
}

Actor.prototype.getIx = function() {
    return this.ix;
}

Actor.prototype.getIy = function() {
    return this.iy;
}

Actor.prototype.setIx = function(ix) {
    if (this.world === undefined) {
        throw new Error('Not attached to world');
    } else {
        this.ix = ix;
    }
}

Actor.prototype.setIy = function(iy) {
    if (this.world === undefined) {
        throw new Error('Not attached to world');
    } else {
        this.iy = iy;
    }
}

Actor.prototype.getHp = function() {
    return this.hp;
}

Actor.prototype.getTeam = function() {
    return this.team;
}

Actor.prototype.getWorld = function() {
    return this.world;
}

Actor.prototype.setWorld = function(world) {
    this.world = world;
}

Actor.prototype.getAge = function() {
    return this.age;
}

Actor.prototype.incrementAge = function() {
    this.age++;
}

Actor.prototype.nextStep = function() {
    for (var i = 0; i < this.intentQueue.length; /*empty*/ ) {
        var intent = this.intentQueue[i];

        if (typeof intent.nextStep !== 'undefined') {
            intent.nextStep(this);
        }

        if (typeof intent.isCostMet === 'undefined' || intent.isCostMet()) {
            var self = this;
            this.world.appendActorIntent(this, intent);
            this.intentQueue.splice(i, 1);
        } else {
            i++;
        }
    }

    this.incrementAge();

    this.applyMods();
}

Actor.prototype.applyMods = function() {
    for (var i = 0; i < this.mods.length; /*empty*/ ) {
        if (this.mods[i].execute(this)) {
            i++;
        } else {
            this.mods.splice(i, 1);
        }
    }
}

Actor.prototype.appendIntent = function(intent) {
    if (this.isDead()) {
        throw new Error('Dead actor');
    }
    for (var i = 0; i < this.intentQueue.length; i++) {
        if (this.intentQueue[i] === intent) {
            throw new Error('Duplicated intent');
        }
    }
    this.intentQueue.push(intent);
    return true;
}

Actor.prototype.getIntentCount = function() {
    return this.intentQueue.length;
}

Actor.prototype.applyDamage = function(actor, attackPower) {
    this.hp -= attackPower;
}

Actor.prototype.isDead = function() {
    return this.hp <= 0;
}

Actor.prototype.appendMod = function(mod) {
    this.mods.push(mod);
}

Actor.prototype.getModCount = function() {
    return this.mods.length;
}

Actor.prototype.move = function(action, dix, diy) {
    var beforeCell = this.world.getCell(this.getIx(), this.getIy());
    var afterCell = this.world.getCell(this.getIx() + dix, this.getIy() + diy);

    if (beforeCell == null || afterCell == null) {
        action.setInterrupted(true);
    } else {
        this.world.appendMove(this, action, beforeCell, afterCell);
    }
}

Actor.prototype.commitMove = function(beforeCell, afterCell) {
    if (afterCell == null || afterCell.isOccupied()) {
        return false; // interrupted
    } else {
        beforeCell.move(afterCell);
        this.setIx(afterCell.ix);
        this.setIy(afterCell.iy);
        return true;
    }
}

module.exports = Actor;
