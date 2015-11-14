import DeltaLogger = require('./delta/DeltaLogger');
import DeltaFactory = require('./delta/DeltaFactory');
import PositionComponent = require('./component/Position');

export var globalIDCounter = 0;
export var globalDeltaLogger = new DeltaLogger();
export var globalDeltaFactory = new DeltaFactory();

export class Direction {
    static EAST = 'EAST';
    static WEST = 'WEST';
    static SOUTH = 'SOUTH';
    static NORTH = 'NORTH';
}

export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

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
    onStep(): void;
}

export abstract class Action {
    name: string;
    preCost: ICost;
    postCost: ICost;
    executed: boolean;

    constructor(name: string, preCost: ICost, postCost: ICost) {
        this.name = name + '_action';
        this.preCost = preCost;
        this.postCost = postCost;
        this.executed = false;
    }

    execute(): boolean {
        this.onStep();

        if (!this.preCostCheck() || this.executed) {
            return false;
        }

        this.doExecute();
        this.executed = true;
        return true;
    }

    isRemovable(): boolean {
        return this.preCostCheck() && this.postCostCheck();
    }

    protected abstract doExecute(): boolean;

    private preCostCheck(): boolean {
        if (this.preCost == null) {
            return true;
        }
        return this.preCost.isCostMet();
    }

    private postCostCheck(): boolean {
        if (this.postCost == null) {
            return true;
        }
        return this.postCost.isCostMet();
    }



    // �ϴ� StepCost�� ���⼭ ó�������� ���߿� �ٸ� �ڽ�Ʈ�� ���´ٸ� ���� �ý����� �������� ������?
    private onStep() {
        if (this.executed == false) {
            if (this.preCost != null) this.preCost.onStep();
        }
        else {
            if (this.postCost != null) this.postCost.onStep();
        }
    }
}

export class AIObjectiveParameter {
    patrolIndex: number;
    patrolPositions: Position[];

    constructor() {
        this.patrolIndex = -1;
        this.patrolPositions = [];
    }
}
