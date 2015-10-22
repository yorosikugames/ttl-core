
module ttl {

    export class World {

        step: number;
        spawnIdCounter: number;
        intentQueue: Array<any>;
        actorIntentQueue: Array<any>;
        cells: Array<any>;
        beforeCellMap: Map<Cell, boolean>;
        afterCellMap: Map<Cell, boolean>;
        dl: any;

        constructor() {
            this.step = 0;
            this.spawnIdCounter = 1;
            this.intentQueue = new Array<any>();
            this.actorIntentQueue = new Array<any>();
            this.cells = new Array<any>();
            for (var iy = 0; iy < 160; iy++) {
                this.cells.push(new Array<any>());
                for (var ix = 0; ix < 9; ix++) {
                    this.cells[iy].push(new ttl.Cell(ix, iy));
                }
            }
            this.beforeCellMap = new Map<Cell, boolean>();
            this.afterCellMap = new Map<Cell, boolean>();
            this.dl = {
                enqueue: (delta) => { },
            };
        }


        getNewSpawnId() {
            return this.spawnIdCounter++;
        }

        enqueue(delta: any) {
            this.dl.enqueue(delta);
        }

        enqueueBasic(str: any) {
            this.enqueue({
                toString: function () {
                    return str;
                },
            });
        }

        setDeltaLogger(dl: ttl.DeltaLogger) {
            this.dl = dl;

            this.enqueueBasic('step ' + this.step);
        }

        getStep() {
            return this.step;
        }

        nextStep() {
            this.step++;
            for (var i = 0; i < this.intentQueue.length; i++) {
                var intent = this.intentQueue[i];
                intent.execute(this);
            }
            this.intentQueue = new Array<any>();

            this.forEachCell(function (ix, iy, cell) {
                if (cell.isEmpty() == false) {
                    cell.getOwner().nextStep();
                }
            });

            for (var i = 0; i < this.actorIntentQueue.length; i++) {
                var actorIntent = this.actorIntentQueue[i];
                actorIntent.intent.execute(actorIntent.actor);
            }
            this.actorIntentQueue = new Array<any>();

            this.commitMove();

            this.enqueueBasic('step ' + this.step);

            return true;
        }

        appendActorIntent(actor: ttl.Actor, intent: any) {
            this.actorIntentQueue.push({
                actor: actor,
                intent: intent
            });
        }

        forEachCell(cb: Function) {
            for (var iy = 0; iy < 160; iy++) {
                for (var ix = 0; ix < 9; ix++) {
                    cb(ix, iy, this.cells[iy][ix]);
                }
            }
        }

        getCellCountX() {
            return 9;
        }

        getCellCountY() {
            return 160;
        }

        getCell(ix: number, iy: number) {
            if (ix < 0 || ix >= 9 || iy < 0 || iy >= 160) {
                return null;
            } else {
                return this.cells[iy][ix];
            }
        }

        appendIntent(intent: any) {
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

        getOccupiedCellCount() {
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

        // actor가 action을 통해 beforeCell에서 afterCell로 이동하려고 한다.
        appendMove(actor: ttl.Actor, action: any, beforeCell: Cell, afterCell: Cell) {
            beforeCell.afterCell = afterCell;
            beforeCell.moveActor = actor;
            beforeCell.moveAction = action;

            if (typeof afterCell.beforeCells === 'undefined') {
                afterCell.beforeCells = new Array<any>();
            }
            afterCell.beforeCells.push(beforeCell);

            this.beforeCellMap.set(beforeCell, true);
            this.afterCellMap.set(afterCell, true);
        }

        commitCycleMoveTree(cell: Cell) {
            var cursor = cell;
            var circularCheck = new Array<any>();
            do {
                for (var i = 0; i < circularCheck.length; i++) {
                    if (cursor === circularCheck[i]) {

                        if (circularCheck.length - i > 2) {
                            var circularOwners = new Array<any>();
                            for (var j = i; j < circularCheck.length; j++) {
                                var beforeCell = circularCheck[j];
                                circularOwners.push(beforeCell.getOwner())
                            }

                            for (var j = i; j < circularCheck.length; j++) {
                                var beforeCell = circularCheck[j];
                                var beforeBeforeIndex = (j == i) ? (circularCheck.length - 1) : (j - 1);
                                var beforeBeforeCell = circularCheck[beforeBeforeIndex];
                                beforeCell.owner = circularOwners[beforeBeforeIndex];
                                var moveActor = beforeCell.moveActor
                                var moveAction = beforeCell.moveAction;
                                moveActor.setIx(moveActor.getIx() + moveAction.dix);
                                moveActor.setIy(moveActor.getIy() + moveAction.diy);

                                this.beforeCellMap.delete(beforeCell);

                                for (var k = 0; k < beforeCell.beforeCells.length; k++) {
                                    if (beforeCell.beforeCells[k] !== beforeBeforeCell) {
                                        beforeCell.beforeCells[k].moveAction.setInterrupted(true);
                                        this.beforeCellMap.delete(beforeCell.beforeCells[k]);
                                    }
                                }
                            }
                        } else {
                            for (var j = i; j < circularCheck.length; j++) {
                                var beforeCell = circularCheck[j];
                                beforeCell.moveAction.setInterrupted(true);
                                this.beforeCellMap.delete(beforeCell);

                                var beforeBeforeIndex = (j == i) ? (circularCheck.length - 1) : (j - 1);
                                var beforeBeforeCell = circularCheck[beforeBeforeIndex];

                                for (var k = 0; k < beforeCell.beforeCells.length; k++) {
                                    if (beforeCell.beforeCells[k] !== beforeBeforeCell) {
                                        beforeCell.beforeCells[k].moveAction.setInterrupted(true);
                                        this.beforeCellMap.delete(beforeCell.beforeCells[k]);
                                    }
                                }
                            }
                        }

                        return;
                    }
                }

                circularCheck.push(cursor);
            } while (cursor = cursor.afterCell);
    
            // cell을 시작으로 cell.afterCell을 재귀적으로 찾아 올라간
            // 리스트가 circularCheck에 쌓여있지만, cycle은 발견되지
            // 않았다. circularCheck에 있는 모든 셀 및 이 셀에 의존하는
            // 셀은 움직일 수 없다!
            for (var i = 0; i < circularCheck.length; i++) {
                if (typeof circularCheck[i].moveAction !== 'undefined') {
                    circularCheck[i].moveAction.setInterrupted(true);
                }
                this.beforeCellMap.delete(circularCheck[i]);


                var beforeBeforeIndex = (i == 0) ? (circularCheck.length - 1) : (i - 1);
                var beforeBeforeCell = circularCheck[beforeBeforeIndex];
                if (typeof circularCheck[i].beforeCells !== 'undefined') {
                    for (var j = 0; j < circularCheck[i].beforeCells.length; j++) {
                        if (circularCheck[i].beforeCells[j] !== beforeBeforeCell) {
                            if (typeof circularCheck[i].beforeCells[j].moveAction !== 'undefined') {
                                circularCheck[i].beforeCells[j].moveAction.setInterrupted(true);
                            }
                            this.beforeCellMap.delete(circularCheck[i].beforeCells[j]);
                        }
                    }
                }
            }
        }

        // appendMove로 형성된 move tree를 커밋하여 실제 액터의 이동을 실행한다.
        commitMove() {
            // afterCellMap 중 비어 있는 셀이 있다면
            // 해당 셀을 루트로 하는 이동 트리가 하나 구성됨을 뜻한다.
            // 이러한 이동 트리를 'simple move tree'라고 한다.
            var thisWorld = this;
            this.afterCellMap.forEach(function (flag, cell) {
                if (cell.isEmpty()) {
                    thisWorld.commitSimpleMoveTreeWithRoot(cell);
                }
            });
            //for (var cell in this.afterCellMap.keys()) {
            //    if (cell.isEmpty()) {
            //        this.commitSimpleMoveTreeWithRoot(cell);
            //    }
            //}

            while (this.beforeCellMap.size > 0) {
                var beforeCell = this.beforeCellMap.keys().next().value;
                if (beforeCell) {
                    this.commitCycleMoveTree(beforeCell);
                }
            }

            this.afterCellMap.forEach(function (flag: boolean, cell: Cell) {
                cell.beforeCells = new Array<Cell>();
            });
 
            //this.afterCellMap.keys().forEach(function (cell, index) {
            //    cell.beforeCells = new Array<any>();
            //});
            //for (let cell of this.afterCellMap.keys()) {
            //    cell.beforeCells = new Array<any>();
            //}

            if (this.beforeCellMap.size > 0) {
                throw new Error('beforeCellMap should be empty at this point');
            }
        }

        hasOneOrMoreBeforeCells(cell: Cell) {
            return typeof cell.beforeCells !== 'undefined' &&
                cell.beforeCells.length > 0;
        }

        commitSimpleMoveTreeWithRoot(cell: Cell) {
            if (this.hasOneOrMoreBeforeCells(cell)) {
                var beforeCell = cell.beforeCells[0];
                beforeCell.getOwner().commitMove(beforeCell, cell);
                this.beforeCellMap.delete(beforeCell);
        
                // 들어가고자 했지만 못들어간 2순위 이하 셀은 탈락!
                for (var i = 1; i < cell.beforeCells.length; i++) {
                    cell.beforeCells[i].moveAction.setInterrupted(true);
                    this.beforeCellMap.delete(cell.beforeCells[i]);
                }
        
                // 재귀 호출
                if (this.hasOneOrMoreBeforeCells(beforeCell)) {
                    this.commitSimpleMoveTreeWithRoot(beforeCell);
                }
            }
        }
    }
}
