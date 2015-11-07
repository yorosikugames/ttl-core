/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import PositionComponent = require('../lib/ttl/component/Position');
import core = require('../lib/ttl/core');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Component Unit Test - Position', () => {
    describe('Create Position Component (x, y) to be (100, 100)', () => {
        it('x and y sould be 100', (done) => {
            var position = new PositionComponent(new core.Position(100, 100), core.Direction.NORTH);
            expect(position.pos.x).to.equals(100);
            expect(position.pos.y).to.equals(100);
            done();
        });

        it('x and y should not be 101', (done) => {
            var position = new PositionComponent(new core.Position(100, 100), core.Direction.NORTH);
            expect(position.pos.x).to.not.equals(101);
            expect(position.pos.y).to.not.equals(101);
            done();
        });
    });
});

