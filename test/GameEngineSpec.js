/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/core', '../lib/ttl/engine/GameEngine', '../lib/ttl/cost/Step', '../lib/ttl/action/Spawn', '../lib/ttl/component/Health', '../lib/ttl/component/AIObjective'], function (require, exports, chai, core, GameEngine, StepCost, SpawnAction, HealthComponent, AIObjectiveComponent) {
    var AIObjectiveParameter = core.AIObjectiveParameter;
    //import PatrolAIComponent = require('../lib/ttl/component/PatrolAI');
    /**
     * Globals
     */
    var expect = chai.expect;
    /**
     * Unit tests
     */
    describe('Engine Test', function () {
        describe('Test', function () {
            it('Test', function (done) {
                var engine = new GameEngine();
                {
                    var entity = new core.Entity('John');
                    var aiObjectiveParameter = new AIObjectiveParameter();
                    var startPos = new core.Position(2, 2);
                    var endPos = new core.Position(5, 5);
                    aiObjectiveParameter.patrolIndex = 0;
                    aiObjectiveParameter.patrolPositions = [startPos, endPos];
                    var aiObjectiveComponent = new AIObjectiveComponent('patrol', aiObjectiveParameter);
                    entity.addComponent(aiObjectiveComponent);
                    //var patrolAIComponent = new PatrolAIComponent([startPos, endPos]);
                    //entity.addComponent(patrolAIComponent);
                    var healthComponent = new HealthComponent(100);
                    entity.addComponent(healthComponent);
                    var entityPos = new core.Position(startPos.x, startPos.y);
                    var spawnAction = new SpawnAction(new StepCost(2), null, entity, entityPos, core.Direction.NORTH);
                    entity.actionQueue.push(spawnAction);
                    engine.registerEntity(entity);
                }
                {
                    var entity = new core.Entity('Lacti');
                    var aiObjectiveParameter = new AIObjectiveParameter();
                    var startPos = new core.Position(3, 3);
                    var endPos = new core.Position(6, 6);
                    aiObjectiveParameter.patrolIndex = 0;
                    aiObjectiveParameter.patrolPositions = [startPos, endPos];
                    var aiObjectiveComponent = new AIObjectiveComponent('patrol', aiObjectiveParameter);
                    entity.addComponent(aiObjectiveComponent);
                    //var patrolAIComponent = new PatrolAIComponent([startPos, endPos]);
                    //entity.addComponent(patrolAIComponent);
                    var healthComponent = new HealthComponent(100);
                    entity.addComponent(healthComponent);
                    var entityPos = new core.Position(startPos.x, startPos.y);
                    var spawnAction = new SpawnAction(new StepCost(2), null, entity, entityPos, core.Direction.NORTH);
                    entity.actionQueue.push(spawnAction);
                    engine.registerEntity(entity);
                }
                for (var idx = 1; idx <= 200; idx++) {
                    engine.onStep();
                }
                console.log(core.globalDeltaLogger);
                console.log(core.globalDeltaLogger.toJSON());
                done();
            });
        });
    });
});
//# sourceMappingURL=GameEngineSpec.js.map