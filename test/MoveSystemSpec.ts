/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import PositionComponent = require('../lib/ttl/component/Position');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Move System Unit Test:', () => {
    describe('2 + 5', () => {
        it('should be 6', (done) => {

            var position = new PositionComponent(10, 5);
            console.log(position);

            expect(2 + 5).to.equals(6);
            done();
        });

        it('should not be 7', (done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });
});

