import interfaces = require('../core');
import AISystem = require('../system/AI');
import SpawnSystem = require('../system/Spawn');
import MoveSystem = require('../system/Move');


class GameEngine extends interfaces.Base {

    stepNumber: number;
    systems: Array<interfaces.System>;
    entityMap: Map<string, interfaces.Entity>;

    constructor() {
        super('engine');

        this.stepNumber = 1;
        this.systems = new Array<interfaces.System>();
        this.entityMap = new Map<string, interfaces.Entity>();

        // system register
        // AI > Spawn > Move
        this.systems.push(new AISystem());
        this.systems.push(new SpawnSystem());
        this.systems.push(new MoveSystem());
    }

    registerEntity(entity: interfaces.Entity): boolean {
        if (this.entityMap.has(entity.name)) {
            return false;
        }
        this.entityMap.set(entity.name, entity);
    }

    deregisterEntity(entity: interfaces.Entity): boolean {
        return this.entityMap.delete(entity.name);
    }

    onStep(): void {

        globals.globalDeltaLogger.enqueue(
            globals.globalDeltaFactory.createStepDelta(this.stepNumber));
        for (var idx in this.systems) {
            var system = this.systems[idx];
            system.process(this.entityMap);
        }

        this.stepNumber++;
    }

}

export = GameEngine;