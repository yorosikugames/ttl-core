/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
define(["require", "exports", 'chai', '../lib/ttl/interfaces', '../lib/ttl/system/Move'], function (require, exports, chai, interfaces, MoveSystem) {
    var Entity = interfaces.Entity;
    /**
     * Globals
     */
    var expect = chai.expect;
    /**
     * Unit tests
     */
    describe('System Unit Test - Move', function () {
        describe('Move System Creation and Process', function () {
            it('Create Move System without Exception', function (done) {
                var moveSystem = new MoveSystem();
                done();
            });
            it('Process with Entity Map', function (done) {
                var moveSystem = new MoveSystem();
                var entity = new Entity('npc');
                var entityMap = new Map();
                moveSystem.process(entityMap);
                done();
            });
        });
    });
});
//# sourceMappingURL=MoveSystemSpec.js.map