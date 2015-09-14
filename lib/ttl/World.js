function World() {
    this.step = 0;
    this.intentQueue = [];
    this.cells = [];
    for (var iy = 0; iy < 160; iy++) {
        this.cells.push([]);
        for (var ix = 0; ix < 9; ix++) {
            this.cells[iy].push(new Cell());
        }
    }
}

World.prototype.getStep = function() {
    return this.step;
}

World.prototype.nextStep = function() {
    this.step++;
    for (var i = 0; i < this.intentQueue.length; i++) {
        var intent = this.intentQueue[i];
        intent.execute(this);
    }
    this.intentQueue = [];

    this.forEachCell(function(ix, iy, cell) {
        if (cell.isEmpty() == false) {
            cell.getOwner().nextStep();
        }
    });
    return true;
}

World.prototype.forEachCell = function(cb) {
    for (var iy = 0; iy < 160; iy++) {
        for (var ix = 0; ix < 9; ix++) {
            cb(ix, iy, this.cells[iy][ix]);
        }
    }
}

World.prototype.getCellCountX = function() {
    return 9;
}

World.prototype.getCellCountY = function() {
    return 160;
}

World.prototype.getCell = function(ix, iy) {
    return this.cells[iy][ix];
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

World.prototype.getOccupiedCellCount = function() {
    var c = 0;
    for (var iy = 0; iy < 160; iy++) {
        for (var ix = 0; ix < 9; ix++) {
            if (this.cells[iy][ix].isEmpty() == false) {
                c++;
            }
        }
    }
    return c;
}

module.exports = World;
