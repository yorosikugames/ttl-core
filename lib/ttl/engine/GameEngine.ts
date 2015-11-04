import core = require('../core');
import AISystem = require('../system/AI');
import SpawnSystem = require('../system/Spawn');
import MoveSystem = require('../system/Move');


class GameEngine extends core.Base {

    stepNumber: number;
    systems: Array<core.System>;
    entityMap: Map<string, core.Entity>;

    constructor() {
        super('engine');

        this.stepNumber = 1;
        this.systems = new Array<core.System>();
        this.entityMap = new Map<string, core.Entity>();

        // system register
        // AI > Spawn > Move
        this.systems.push(new AISystem());
        this.systems.push(new SpawnSystem());
        this.systems.push(new MoveSystem());
    }

    registerEntity(entity: core.Entity): boolean {
        if (this.entityMap.has(entity.name)) {
            return false;
        }
        this.entityMap.set(entity.name, entity);
    }

    deregisterEntity(entity: core.Entity): boolean {
        return this.entityMap.delete(entity.name);
    }

    onStep(): void {

        core.globalDeltaLogger.enqueue(
            core.globalDeltaFactory.createStepDelta(this.stepNumber));
        for (var idx in this.systems) {
            var system = this.systems[idx];
            system.process(this.entityMap);
        }

        this.stepNumber++;
    }

}

export = GameEngine;