function World() {
    this.step = 0;
    this.intentQueue = [];
}

World.prototype.spawn = function(actor, ix, iy) {
    return true;
}

World.prototype.getStep = function() {
    return this.step;
}

World.prototype.nextStep = function() {
    this.step++;
    this.intentQueue = [];
    return true;
}

World.prototype.getCellCountX = function() {
    return 9;
}

World.prototype.getCellCountY = function() {
    return 160;
}

World.prototype.getCell = function(ix, iy) {
    return new Cell();
}

World.prototype.appendIntent = function(intent) {
    for (var i = 0; i < this.intentQueue.length; i++) {
        if (this.intentQueue[i] === intent) {
            throw new Error('Duplicated intent');
        }
    }
    this.intentQueue.push(intent);
    return true;
}

World.prototype.getIntentCount = function() {
    return this.intentQueue.length;
}

module.exports = World;
