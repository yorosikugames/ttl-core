/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import core = require('../lib/ttl/core');
import GameEngine = require('../lib/ttl/engine/GameEngine');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Test', () => {
    describe('Test', () => {
        it('Test', (done) => {
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

