import DeltaLogger = require('./delta/DeltaLogger');
import DeltaFactory = require('./delta/DeltaFactory');
import PositionComponent = require('./component/Position');

export var globalIDCounter = 0;
export var globalDeltaLogger = new DeltaLogger();
export var globalDeltaFactory = new DeltaFactory();


export class Base {
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
    actionQueue: Action[];

    constructor(name: string) {
        super(name + '_entity');
        this.components = new Map<string, Component>();
        this.actionQueue = [];
    }

    addComponent<T extends Component>(component: Component): boolean {
        if (this.components.has(component.name)) {
            return false;
        }
        this.components.set(component.name, component);
        return true;
    }

    getComponent<T extends Component>(componentName: string): T {
        if (this.components.has(componentName)) {
            return <T>this.components.get(componentName);
        }
        return null;
    }

    removeComponent(component: Component): boolean {
        return this.components.delete(component.name);
    }
}

export abstract class Component extends Base {

    constructor(name: string) {
        super(name + '_component');
    }

}

export abstract class System extends Base {

    constructor(name: string) {
        super(name + '_system');
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
        this.name = name + '_cost';
        this.preCost = preCost;
        this.postCost = postCost;
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
        if (!this.preCost.isCostMet() || this.executed) {
            return false;
        }

        this.doExecute();
        this.executed = true;
        return true;
    }

}
