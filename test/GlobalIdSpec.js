/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/**
 * Module dependencies.
 */
var chai = require('chai');
var interfaces = require('../lib/ttl/interfaces');
var Entity = interfaces.Entity;
var HealthComponent = require('../lib/ttl/component/Health');
var PositionComponent = require('../lib/ttl/component/Position');
var MoveSystem = require('../lib/ttl/system/Move');
/**
 * Globals
 */
var expect = chai.expect;
/**
 * Unit tests
 */
describe('Basic Unit Test - Global ID', function () {
    describe('Global ID should be increasing from 1', function () {
        it('Global ID of any type should be increasing from 1', function (done) {
            interfaces.globalIDCounter = 1;
            var entity = new Entity('test');
            expect(entity.globalId).to.equals(1);
            var health = new HealthComponent(0);
            expect(health.globalId).to.equals(2);
            var position = new PositionComponent(0, 0);
            expect(position.globalId).to.equals(3);
            var move = new MoveSystem();
            expect(move.globalId).to.equals(4);
            done();
        });
    });
});
//# sourceMappingURL=GlobalIdSpec.js.map