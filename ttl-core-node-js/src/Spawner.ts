import World = require("./World.ts");
import WorldMoveAction = require("./WorldMoveAction.ts");
import Cell = require("./Cell.ts");
import Actor = require("./Actor.ts");
import WorldSpawn = require("./WorldSpawn.ts");

import IAction = require("./IAction.ts");

class Spawner implements IAction {

    actor: Actor;
    intent: IAction;

    world: World;
    team: number;
    hp: number;
    age: number;
    intentQueue: Array<IAction>;
    mods: Array<string>;
    ix: number;
    iy: number;

    constructor() {
        this.world = undefined;
        this.team = undefined;
        this.hp = 100;
        this.age = 0;
        this.ix = undefined;
        this.iy = undefined;
    }

    public setPrefab() {
    }

    public getEmptyCell() {
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

    nextStep(actor: Actor) {
        var emptyCell = this.getEmptyCell();
        if (emptyCell) {
            var sa = new WorldSpawn(new Actor(), emptyCell.ix, emptyCell.iy);
            this.world.appendIntent(sa);
        }
    }

    execute(world: World) {
    }

    public canSpawn() {
        return this.getEmptyCell() !== null;
    }

    public setWorld = Actor.prototype.setWorld;

    public getIx = Actor.prototype.getIx;

    public getIy = Actor.prototype.getIy;

    public setIx = Actor.prototype.setIx;

    public setIy = Actor.prototype.setIy;

    public getSpawnId = Actor.prototype.getSpawnId;
}

export = Spawner;