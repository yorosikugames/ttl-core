/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/core', '../lib/ttl/engine/GameEngine', '../lib/ttl/action/Spawn', '../lib/ttl/cost/Step'], function (require, exports, chai, core, GameEngine, SpawnAction, StepCost) {
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
                var spawnAction = new SpawnAction(new StepCost(10), null, entity, 10, 10);
                entity.actionQueue.push(spawnAction);
                var engine = new GameEngine();
                engine.registerEntity(entity);
                for (var idx = 1; idx <= 20; idx++) {
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