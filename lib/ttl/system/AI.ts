import interfaces = require('../interfaces');


class AISystem extends interfaces.System {

    constructor() {
        super('ai');
    }

    process(entityMap: Map<string, interfaces.Entity>): void {

        for (var entityName in entityMap.keys()) {
            var entity = entityMap.get(entityName);
            for (var componentName in entity.components.keys()) {
                var component = entity.components.get(componentName);
                if (component.name != "ai_component") continue;
                // do something in here
            }
        }

    }
}

export = AISystem;