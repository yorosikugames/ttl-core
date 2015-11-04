/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/core', '../lib/ttl/engine/GameEngine'], function (require, exports, chai, core, GameEngine) {
    /**
     * Globals
     */
    var expect = chai.expect;
    /**
     * Unit tests
     */
    describe('Test', function () {
        describe('Test', function () {
            it('Test', function (done) {
                var engine = new GameEngine();
                for (var idx = 1; idx <= 100; idx++) {
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