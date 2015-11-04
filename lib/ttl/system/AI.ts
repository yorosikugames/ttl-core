import core = require('../core');


class AISystem extends core.System {

    constructor() {
        super('ai');
    }

    process(entityMap: Map<string, core.Entity>): void {

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