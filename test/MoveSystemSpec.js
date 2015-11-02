/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/**
 * Module dependencies.
 */
var chai = require('chai');
var interfaces = require('../lib/ttl/interfaces');
var Entity = interfaces.Entity;
var MoveSystem = require('../lib/ttl/system/Move');
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
//# sourceMappingURL=MoveSystemSpec.js.map