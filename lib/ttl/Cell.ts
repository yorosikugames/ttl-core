module ttl {

    export class Cell {

        owner: any;
        ix: number;
        iy: number;
        beforeCells: Array<Cell>;
        afterCell: Cell;
        moveActor: ttl.Actor;
        moveAction: any;

        constructor(ix: number, iy: number) {
            this.owner = null;
            this.ix = ix;
            this.iy = iy;
        }

        isEmpty() {
            return this.owner === null;
        }

        isOccupied() {
            return this.isEmpty() == false;
        }

        place(a: any) {
            this.owner = a;
        }

        setEmpty() {
            this.owner = null;
        }

        move(cell: Cell) {
            cell.owner = this.owner;
            this.owner = null;
        }

        getOwner() {
            return this.owner;
        }
    }
}