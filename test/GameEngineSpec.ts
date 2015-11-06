/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import core = require('../lib/ttl/core');
import GameEngine = require('../lib/ttl/engine/GameEngine');
import SpawnAction = require('../lib/ttl/action/Spawn');
import StepCost = require('../lib/ttl/cost/Step');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Engine Test', () => {
    describe('Test', () => {
        it('Test', (done) => {

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

