import interfaces = require('../interfaces');


class MoveSystem extends interfaces.System {

    constructor() {
        super('move');
    }

    process(entityMap: Map<number, interfaces.Entity>): void {

        for (var entityId in entityMap.keys()) {
            var entity = entityMap.get(entityId);
            for (var componentId in entity.components.keys()) {
                var component = entity.components.get(componentId);
                if (component.name != "component_position") continue;
            }
        }

    }
}

export = MoveSystem;