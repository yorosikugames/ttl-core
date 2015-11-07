/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import core = require('../lib/ttl/core');
var Entity = core.Entity;
import HealthComponent = require('../lib/ttl/component/Health');
import PositionComponent = require('../lib/ttl/component/Position');
import MoveSystem = require('../lib/ttl/system/Move');
import GameEngine = require('../lib/ttl/engine/GameEngine');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Basic Unit Test - Global ID', () => {
    describe('Global ID should be increasing from 1', () => {
        it('Global ID of any type should be increasing from 1', (done) => {

            core.globalIDCounter = 1;

            var entity = new Entity('test');
            expect(entity.globalId).to.equals(1);

            var health = new HealthComponent(0);
            expect(health.globalId).to.equals(2);

            var position = new PositionComponent(new core.Position(0, 0), core.Direction.NORTH);
            expect(position.globalId).to.equals(3);

            var move = new MoveSystem();
            expect(move.globalId).to.equals(4);

            done();
        });

    });
});

