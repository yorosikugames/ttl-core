var Cell = (function () {
    function Cell(ix, iy) {
        this.ix = ix;
        this.iy = iy;
    }
    Cell.prototype.isEmpty = function () {
        return this.owner === null;
    };
    Cell.prototype.isOccupied = function () {
        return this.isEmpty() == false;
    };
    Cell.prototype.place = function (actor) {
        this.owner = actor;
    };
    Cell.prototype.setEmpty = function () {
        this.owner = null;
    };
    Cell.prototype.move = function (cell) {
        cell.owner = this.owner;
        this.owner = null;
    };
    Cell.prototype.getOwner = function () {
        return this.owner;
    };
    return Cell;
})();
module.exports = Cell;
//# sourceMappingURL=Cell.js.map