module ttl {

    var globalActorIdCounter: number = 1;

    export class Actor {
        globalActorId: number;
        spawnId: any;
        world: any;
        team: any;
        hp: number;
        age: number;
        intentQueue: Array<any>;
        mods: Array<any>;
        ix: any;
        iy: any;
        exp: number;

        constructor() {
            this.globalActorId = globalActorIdCounter++;
            this.spawnId = undefined;
            this.world = undefined;
            this.team = undefined;
            this.hp = 100;
            this.age = 0;
            this.intentQueue = new Array<any>();
            this.mods = new Array<any>();
            this.ix = undefined;
            this.iy = undefined;
            this.exp = 0;
        }

        getSpawnId() {
            return this.spawnId;
        }


        getIx() {
            return this.ix;
        }

        getIy() {
            return this.iy;
        }

        setIx(ix: number) {
            if (this.world === undefined) {
                throw new Error('Not attached to world');
            } else {
                this.ix = ix;
            }
        }

        setIy(iy: number) {
            if (this.world === undefined) {
                throw new Error('Not attached to world');
            } else {
                this.iy = iy;
            }
        }

        getHp() {
            return this.hp;
        }

        getTeam() {
            return this.team;
        }

        getWorld() {
            return this.world;
        }

        setWorld(world: any) {
            this.world = world;
            this.spawnId = world.getNewSpawnId();
        }

        getAge() {
            return this.age;
        }

        incrementAge() {
            this.age++;
        }

        nextStep() {
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

        applyMods() {
            for (var i = 0; i < this.mods.length; /*empty*/) {
                if (this.mods[i].execute(this)) {
                    i++;
                } else {
                    this.mods.splice(i, 1);
                }
            }
        }

        appendIntent(intent: any) {
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

        getIntentCount() {
            return this.intentQueue.length;
        }

        getActualDamageFromAttackPower(attackerExp: number, attackPower: number) {
            return Math.round((Math.floor(attackerExp / 1000 * 10) / 10 + 1) * attackPower);
        }

        applyDamage(actor: any, attackPower: number) {
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

        onKillActor(killedActor: any) {
            this.exp += 100;
        }

        isDead() {
            return this.hp <= 0;
        }

        appendMod(mod: any) {
            this.mods.push(mod);
        }

        getModCount() {
            return this.mods.length;
        }

        move(action: any, dix: number, diy: number) {
            var beforeCell = this.world.getCell(this.getIx(), this.getIy());
            var afterCell = this.world.getCell(this.getIx() + dix, this.getIy() + diy);

            if (beforeCell == null || afterCell == null) {
                action.setInterrupted(true);
            } else {
                this.world.appendMove(this, action, beforeCell, afterCell);
            }
        }

        commitMove(beforeCell: ttl.Cell, afterCell: ttl.Cell) {
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

        getExp() {
            return this.exp;
        }

        setExp(exp: number) {
            this.exp = exp;
        }

    }
}