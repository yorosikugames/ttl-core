import World = require("./World.ts");
import WorldMoveAction = require("./WorldMoveAction.ts");
import Action = require("./EmptyAction.ts");
import Cell = require("./Cell.ts");

var globalActorIdCounter: number = 0;

class Actor {

    globalActorId: number;
    world: World;
    spawnId: number;
    team: number;
    hp: number;
    age: number;
    intentQueue: Array<Action>;
    mods: Array<string>;
    ix: number;
    iy: number;
    exp: number;

    constructor() {
        // 액터가 생성되는 시점에 할당되는 고유 ID
        this.globalActorId = globalActorIdCounter++;

        // 월드에 스폰되어 있는 동안에만 할당되는 (월드당) 고유 ID
        this.spawnId = undefined;
        this.world = undefined;
        this.team = undefined;
        this.hp = 100;
        this.age = 0;
        this.ix = undefined;
        this.iy = undefined;
        this.exp = 0;
    }

    public getWorld() {
        return this.world;
    }

    public setWorld(world: World) {
        this.world = world;
        this.spawnId = world.getNewSpawnId();
    }

    public getIx() {
        return this.ix;
    }

    public setIx(ix: number) {
        if (this.world === undefined) {
            throw new Error('Not attached to world');
        } else {
            this.ix = ix;
        }
    }

    public getIy() {
        return this.iy;
    }

    public setIy(iy: number) {
        if (this.world === undefined) {
            throw new Error('Not attached to world');
        } else {
            this.iy = iy;
        }
    }

    public getHp() {
        return this.hp;
    }

    public getTeam() {
        return this.team;
    }

    public getSpawnId() {
        return this.globalActorId;
    }

    public getAge() {
        return this.age;
    }

    public incrementAge() {
        return this.age++;
    }

    public isDead() {
        return this.hp <= 0;
    }

    public getExp() {
        return this.exp;
    }

    public setExp(exp) {
        this.exp = exp;
    }

    public getModCount() {
        this.mods.length;
    }

    public appendMod(mod: string) {
        this.mods.push(mod);
    }

    public applyMods() {
        for (var i = 0; i < this.mods.length; /*empty*/) {
            if (this.mods[i].execute(this)) {
                i++;
            } else {
                this.mods.splice(i, 1);
            }
        }
    }

    public appendIntent(intent: string) {
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

    public getIntentCount() {
        return this.intentQueue.length;
    }

    public nextStep() {
        for (var i = 0; i < this.intentQueue.length; /*empty*/) {
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

    public move(action: WorldMoveAction, dix: number, diy: number) {
        var beforeCell = this.world.getCell(this.getIx(), this.getIy());
        var afterCell = this.world.getCell(this.getIx() + dix, this.getIy() + diy);

        if (beforeCell == null || afterCell == null) {
            action.setInterrupted(true);
        } else {
            this.world.appendMove(this, action, beforeCell, afterCell);
        }
    }

    public commitMove(beforeCell: Cell, afterCell: Cell) {
        if (afterCell == null || afterCell.isOccupied()) {
            return false; // interrupted
        } else {
            beforeCell.move(afterCell);
            this.setIx(afterCell.ix);
            this.setIy(afterCell.iy);
            this.world.enqueueBasic('moveto ' + this.spawnId + ' ' + afterCell.ix + ' ' + afterCell.iy);
            return true;
        }
    }

    public getActualDamageFromAttackPower(attackerExp: number, attackPower: number) {
        return Math.round((Math.floor(attackerExp / 1000 * 10) / 10 + 1) * attackPower);
    }

    public applyDamage(actor: Actor, attackPower: number) {
        const beforeDead = this.isDead();
        this.hp -= this.getActualDamageFromAttackPower(actor.getExp(), attackPower);
        // 이번 공격으로 죽게 되었으면...
        if (!beforeDead && this.isDead()) {
            actor.onKillActor(this);
            this.world.getCell(this.ix, this.iy).setEmpty();
            this.ix = undefined;
            this.iy = undefined;
        }
    }


    public onKillActor(killedActor: Actor) {
        this.exp += 100;
    }

}

export = Actor;