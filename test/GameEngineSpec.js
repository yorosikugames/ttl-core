/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/core', '../lib/ttl/engine/GameEngine', '../lib/ttl/action/Spawn', '../lib/ttl/cost/Step', '../lib/ttl/component/PatrolAI'], function (require, exports, chai, core, GameEngine, SpawnAction, StepCost, PatrolAIComponent) {
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
                var entity = new core.Entity('John');
                var entityPos = new core.Position(10, 10);
                var startPos = new core.Position(10, 10);
                var endPos = new core.Position(20, 20);
                var patrolAIComponent = new PatrolAIComponent([startPos, endPos]);
                entity.addComponent(patrolAIComponent);
                var spawnAction = new SpawnAction(new StepCost(2), null, entity, entityPos, core.Direction.NORTH);
                entity.actionQueue.push(spawnAction);
                var engine = new GameEngine();
                engine.registerEntity(entity);
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