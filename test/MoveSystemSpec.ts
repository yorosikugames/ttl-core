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

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('System Unit Test - Move', () => {
    describe('Move System Creation and Process', () => {
        it('Create Move System without Exception', (done) => {
            var moveSystem = new MoveSystem();
            done();
        });

        it('Process with Entity Map', (done) => {

            var moveSystem = new MoveSystem();
            var entity = new Entity('npc');
            var entityMap = new Map<string, core.Entity>();
            moveSystem.process(entityMap);
            done();
        });
    });

});

