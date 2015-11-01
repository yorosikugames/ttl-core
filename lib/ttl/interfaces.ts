export var globalIDCounter = 0;


class Base {
    name: string;
    globalId: number;

    constructor(name: string) {
        this.name = name;
        this.globalId = globalIDCounter++;
    }

    print(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export class Entity extends Base {

    components: Map<string, Component>;

    constructor(name: string) {
        super('entity_' + name);
        this.components = new Map<string, Component>();
    }

    addComponent(component: Component): boolean {
        if (this.components.has(component.name)) {
            return false;
        }
        this.components.set(component.name, component);
        return true;
    }

    removeComponent(component: Component): boolean {
        return this.components.delete(component.name);
    }

}

export abstract class Component extends Base {

    constructor(name: string) {
        super('component_' + name);
    }

}

export abstract class System extends Base {

    constructor(name: string) {
        super('system_' + name);
    }

    abstract process(entityMap: Map<string, Entity>): void;
}

export interface ICost {
    isCostMet(): boolean;
    onStep(stepCount: number): void;
}

export abstract class Action {
    name: string;
    preCost: ICost;
    postCost: ICost;
    executed: boolean;
   
    constructor(name: string, preCost: ICost, postCost: ICost) {
        this.name = 'cost_' + name;
        this.preCost = preCost;
        this.postCost = postCost;
        this.executed = false;
    }
     
    protected abstract doExecute(): boolean;

    preCostCheck(): boolean {
        if (this.preCost == null) {
            return true;
        }
        return this.preCost.isCostMet();
    }

    postCostCheck(): boolean {
        if (this.postCost == null) {
            return true;
        }
        return this.postCost.isCostMet();
    }

    execute(): boolean {
        if (!this.preCost.isCostMet()) {
            return false;
        }

        if (this.doExecute()) {
            this.executed = true;
        }
        return this.executed;
    }

    isExecuted(): boolean {
        return this.executed;
    }

}
