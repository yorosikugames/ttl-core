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
describe('Component Unit Test - Health', () => {
    describe('Create Health Component with hp 100', () => {
        it('hp sould be 100', (done) => {
            var health = new HealthComponent(100);
            expect(health.hp).to.equals(100);
            done();
        });

        it('hp should not be 101', (done) => {
            var health = new HealthComponent(100);
            expect(health.hp).to.not.equals(101);
            done();
        });
    });
});

