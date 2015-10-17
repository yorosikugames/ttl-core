import Actor = require('./Actor.ts');
import WorldMoveAction = require("./WorldMoveAction.ts");

class Cell {
    owner: Actor;

    ix: number;
    iy: number;

    beforeCells: Array<Cell>;
    afterCell: Cell;

    moveActor: Actor;
    moveAction: WorldMoveAction;

    constructor(ix: number, iy: number) {
        this.ix = ix;
        this.iy = iy;
    }

    public isEmpty() {
        return this.owner === null;
    }

    public isOccupied() {
        return this.isEmpty() == false;
    }

    public place(actor: Actor) {
        this.owner = actor;
    }

    public setEmpty() {
        this.owner = null;
    }

    public move(cell: Cell) {
        cell.owner = this.owner;
        this.owner = null;
    }

    public getOwner() {
        return this.owner;
    }
}

export = Cell;