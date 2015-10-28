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

    components: Map<number, Component>;

    constructor(name: string) {
        super('entity_' + name);
        this.components = new Map<number, Component>();
    }

    addComponent(component: Component): boolean {
        if (this.components.has(component.globalId)) {
            return false;
        }
        this.components.set(component.globalId, component);
        return true;
    }

    removeComponent(component: Component): boolean {
        return this.components.delete(component.globalId);
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

    abstract process(entityMap: Map<number, Entity>): void;
}
