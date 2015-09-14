function Cell() {
    this.owner = null;
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

Cell.prototype.getOwner = function() {
    return this.owner;
}

module.exports = Cell;
