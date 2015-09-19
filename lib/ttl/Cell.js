'use strict';
function Cell(ix, iy) {
    this.owner = null;
    this.ix = ix;
    this.iy = iy;
}

Cell.prototype.isEmpty = function() {
    return this.owner === null;
}

Cell.prototype.isOccupied = function() {
    return this.isEmpty() == false;
}

Cell.prototype.place = function(a) {
    this.owner = a;
}

Cell.prototype.move = function(cell) {
    cell.owner = this.owner;
    this.owner = null;
}

Cell.prototype.getOwner = function() {
    return this.owner;
}

module.exports = Cell;
