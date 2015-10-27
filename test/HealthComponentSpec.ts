/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import HealthComponent = require('../lib/ttl/component/Health');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Health Component Unit Test:', () => {
    describe('2 + 5', () => {
        it('should be 6', (done) => {

            var health = new HealthComponent(100);
            console.log(health);

            expect(2 + 5).to.equals(7);
            done();
        });

        it('should not be 7', (done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });
});

